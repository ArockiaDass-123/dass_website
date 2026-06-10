const https = require('https');

const API_KEY = process.env.RENDER_API_KEY || 'rnd_M9a4O4AphomNpmrP7uvopYFGIkrT';
const REPO_URL = 'https://github.com/ArockiaDass-123/dass_website';
const SERVICE_NAME = 'cinematic-portfolio';

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.render.com',
      port: 443,
      path: '/v1' + path,
      method: method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(data ? JSON.parse(data) : {});
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function main() {
  try {
    console.log('Retrieving owner details...');
    const owners = await request('GET', '/owners?limit=20');
    if (!owners || owners.length === 0) {
      throw new Error('No owners found in Render account. Check your API key.');
    }
    const ownerId = owners[0].owner.id;
    console.log(`Using Owner ID: ${ownerId} (${owners[0].owner.name})`);

    console.log(`Checking if service "${SERVICE_NAME}" already exists...`);
    const services = await request('GET', `/services?limit=100`);
    let service = services.find(s => s.service.name === SERVICE_NAME);
    let serviceId;
    let isNew = false;

    if (service) {
      serviceId = service.service.id;
      console.log(`Found existing service: ${SERVICE_NAME} (ID: ${serviceId})`);
    } else {
      console.log(`Service "${SERVICE_NAME}" not found. Creating a new Web Service...`);
      const payload = {
        type: 'web_service',
        name: SERVICE_NAME,
        ownerId: ownerId,
        repo: REPO_URL,
        autoDeploy: 'yes',
        branch: 'main',
        serviceDetails: {
          runtime: 'node',
          buildCommand: 'npm install && npm run build',
          startCommand: 'npm run start -- -p $PORT'
        }
      };
      const response = await request('POST', '/services', payload);
      serviceId = response.service.id;
      isNew = true;
      console.log(`Created new Web Service: ${SERVICE_NAME} (ID: ${serviceId})`);
    }

    console.log(`Triggering deployment for service ID: ${serviceId}...`);
    try {
      const deployResult = await request('POST', `/services/${serviceId}/deploys`, { clearCache: 'do_not_clear' });
      console.log('Trigger deploy response:', JSON.stringify(deployResult));
    } catch (e) {
      console.log('Deploy trigger request finished (could be empty response).');
    }

    console.log('Waiting for deploy list registration...');
    await new Promise(r => setTimeout(r, 5000));

    const deploys = await request('GET', `/services/${serviceId}/deploys?limit=5`);
    if (!deploys || deploys.length === 0) {
      throw new Error('No deploys found for this service.');
    }
    const deployId = deploys[0].id || (deploys[0].deploy && deploys[0].deploy.id);
    if (!deployId) {
      throw new Error('Could not find deploy ID in the deploys list.');
    }
    console.log(`Deployment triggered (ID: ${deployId}). Monitoring status...`);

    // Poll deployment status
    let status = 'created';
    const startTime = Date.now();
    const timeout = 15 * 60 * 1000; // 15 minutes timeout

    while (status !== 'live' && !status.includes('failed') && status !== 'deactivated' && status !== 'canceled') {
      if (Date.now() - startTime > timeout) {
        throw new Error('Deployment timed out.');
      }
      
      // Wait 15 seconds
      await new Promise(r => setTimeout(r, 15000));
      
      const deployStatus = await request('GET', `/services/${serviceId}/deploys/${deployId}`);
      status = deployStatus.status || (deployStatus.deploy && deployStatus.deploy.status);
      console.log(`[${new Date().toISOString()}] Status: ${status}`);
    }

    if (status === 'live') {
      console.log('Deployment successful!');
      const serviceDetail = await request('GET', `/services/${serviceId}`);
      console.log(`Live URL: ${serviceDetail.service.url}`);
      console.log(`Dashboard URL: https://dashboard.render.com/web/${serviceId}`);
    } else {
      console.log(`Deployment failed with status: ${status}. Fetching build logs...`);
      try {
        const logs = await request('GET', `/logs?ownerId=${ownerId}&resource=${serviceId}&type=build&limit=50`);
        console.log('Build Logs from Render:');
        if (Array.isArray(logs)) {
          // Render returns logs sorted in some order, let's reverse them if they are in descending order to print chronologically
          // Actually, let's just print them
          logs.reverse().forEach(l => {
            console.log(l.text || l.message || JSON.stringify(l));
          });
        } else if (logs && logs.message) {
          console.log(logs.message);
        } else {
          console.log(JSON.stringify(logs));
        }
      } catch (logErr) {
        console.error('Failed to retrieve logs:', logErr.message);
      }
      throw new Error(`Deployment ended with status: ${status}`);
    }

  } catch (error) {
    console.error('Error during deployment:', error.message);
    process.exit(1);
  }
}

main();
