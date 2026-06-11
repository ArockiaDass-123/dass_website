/**
 * postbuild.js
 * Copies the Next.js static export from ./out into ./public
 * so that Render's default staticPublishPath ("public") serves the built site.
 * 
 * Static assets that already exist in public/ (images, videos, favicons) are
 * preserved — the copy is additive and only Next.js output files are added.
 */
const fs   = require('fs');
const path = require('path');

const OUT_DIR    = path.join(__dirname, '..', 'out');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

if (!fs.existsSync(OUT_DIR)) {
  console.error('[postbuild] ERROR: out/ directory not found. Run next build first.');
  process.exit(1);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath  = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('[postbuild] Copying out/ → public/ ...');
copyDir(OUT_DIR, PUBLIC_DIR);
console.log('[postbuild] Done. Render will serve from ./public');
