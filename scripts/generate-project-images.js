const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '..', 'public', 'assets', 'projects');
fs.mkdirSync(outDir, { recursive: true });

const WIDTH = 960;
const HEIGHT = 540;

const themes = [
  {
    name: 'message-scheduler.png',
    title: 'MESSAGE SCHEDULER',
    subtitle: 'Automated Dispatch & Queue Engine',
    tag: 'REAL-TIME QUEUE',
    accent: '#f7931e',
    glow: '#ffaa40',
    bg1: '#0d0d12',
    bg2: '#18120c',
    iconSvg: `
      <!-- Clock & Calendar with flying messages -->
      <circle cx="480" cy="220" r="70" fill="none" stroke="#f7931e" stroke-width="4" stroke-dasharray="6 4" opacity="0.6"/>
      <circle cx="480" cy="220" r="54" fill="rgba(247,147,30,0.1)" stroke="#f7931e" stroke-width="3"/>
      <line x1="480" y1="220" x2="480" y2="185" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      <line x1="480" y1="220" x2="510" y2="230" stroke="#f7931e" stroke-width="4" stroke-linecap="round"/>
      <!-- Message bubbles -->
      <rect x="330" y="160" width="80" height="42" rx="10" fill="rgba(255,255,255,0.08)" stroke="#f7931e" stroke-width="1.5"/>
      <path d="M350 202 L345 212 L360 202 Z" fill="#f7931e"/>
      <rect x="550" y="240" width="85" height="42" rx="10" fill="rgba(255,255,255,0.08)" stroke="#f7931e" stroke-width="1.5"/>
      <path d="M610 240 L620 230 L600 240 Z" fill="#f7931e"/>
      <!-- Fiber signals -->
      <path d="M220 220 Q 350 120 480 220 T 740 220" fill="none" stroke="rgba(247,147,30,0.3)" stroke-width="2"/>
    `
  },
  {
    name: 'ai-companion.png',
    title: 'LEARNING COMPANION AI',
    subtitle: 'Adaptive Neural Knowledge Assistant',
    tag: 'GENERATIVE AI',
    accent: '#38bdf8',
    glow: '#0284c7',
    bg1: '#070b14',
    bg2: '#0b162a',
    iconSvg: `
      <!-- Neural Network Nodes -->
      <circle cx="480" cy="220" r="65" fill="rgba(56,189,248,0.06)" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="480" cy="220" r="32" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="3"/>
      <!-- Outer satellite nodes -->
      <circle cx="380" cy="170" r="14" fill="#070b14" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="580" cy="170" r="14" fill="#070b14" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="360" cy="260" r="16" fill="#070b14" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="600" cy="260" r="16" fill="#070b14" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="480" cy="115" r="12" fill="#070b14" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="480" cy="325" r="12" fill="#070b14" stroke="#38bdf8" stroke-width="2"/>
      <!-- Synaptic lines -->
      <line x1="480" y1="220" x2="380" y2="170" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
      <line x1="480" y1="220" x2="580" y2="170" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
      <line x1="480" y1="220" x2="360" y2="260" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
      <line x1="480" y1="220" x2="600" y2="260" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
      <line x1="480" y1="220" x2="480" y2="115" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
      <line x1="480" y1="220" x2="480" y2="325" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
    `
  },
  {
    name: 'rag-knowledge.png',
    title: 'TUTERMIND RAG',
    subtitle: 'Vector Retrieval & Knowledge Graph',
    tag: 'VECTOR SEARCH',
    accent: '#a855f7',
    glow: '#7c3aed',
    bg1: '#0e0817',
    bg2: '#160c26',
    iconSvg: `
      <!-- Documents and vector embedding grid -->
      <rect x="420" y="140" width="120" height="150" rx="12" fill="rgba(168,85,247,0.12)" stroke="#a855f7" stroke-width="3"/>
      <line x1="445" y1="175" x2="515" y2="175" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <line x1="445" y1="195" x2="515" y2="195" stroke="rgba(255,255,255,0.6)" stroke-width="3" stroke-linecap="round"/>
      <line x1="445" y1="215" x2="495" y2="215" stroke="rgba(255,255,255,0.6)" stroke-width="3" stroke-linecap="round"/>
      <line x1="445" y1="235" x2="505" y2="235" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <!-- Vector arrows -->
      <circle cx="340" cy="210" r="28" fill="rgba(168,85,247,0.15)" stroke="#a855f7" stroke-width="2"/>
      <line x1="340" y1="210" x2="420" y2="210" stroke="#a855f7" stroke-width="2" stroke-dasharray="4 3"/>
      <circle cx="620" cy="210" r="28" fill="rgba(168,85,247,0.15)" stroke="#a855f7" stroke-width="2"/>
      <line x1="540" y1="210" x2="620" y2="210" stroke="#a855f7" stroke-width="2" stroke-dasharray="4 3"/>
    `
  },
  {
    name: 'mini-crm.png',
    title: 'MINI CRM PLATFORM',
    subtitle: 'Customer Pipeline & Deal Management',
    tag: 'SaaS PIPELINE',
    accent: '#10b981',
    glow: '#059669',
    bg1: '#06130e',
    bg2: '#0b2018',
    iconSvg: `
      <!-- Pipeline Columns -->
      <rect x="300" y="140" width="85" height="150" rx="8" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" stroke-width="2"/>
      <rect x="438" y="140" width="85" height="150" rx="8" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="2.5"/>
      <rect x="575" y="140" width="85" height="150" rx="8" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" stroke-width="2"/>
      <!-- Cards inside columns -->
      <rect x="312" y="160" width="60" height="30" rx="5" fill="rgba(255,255,255,0.1)"/>
      <rect x="312" y="200" width="60" height="30" rx="5" fill="rgba(255,255,255,0.1)"/>
      <rect x="450" y="160" width="60" height="35" rx="5" fill="#10b981"/>
      <rect x="450" y="205" width="60" height="30" rx="5" fill="rgba(255,255,255,0.1)"/>
      <rect x="587" y="160" width="60" height="30" rx="5" fill="rgba(255,255,255,0.1)"/>
    `
  },
  {
    name: 'ipl-cricket.png',
    title: 'IPL CRICKET DASHBOARD',
    subtitle: 'Live Team Standings & Match Analytics',
    tag: 'SPORTS ANALYTICS',
    accent: '#f59e0b',
    glow: '#d97706',
    bg1: '#140f06',
    bg2: '#20180a',
    iconSvg: `
      <!-- Cricket Ball with seam motion -->
      <circle cx="480" cy="210" r="55" fill="#e11d48" stroke="#ffffff" stroke-width="3"/>
      <path d="M455 170 Q480 210 455 250" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-dasharray="4 2"/>
      <path d="M505 170 Q480 210 505 250" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-dasharray="4 2"/>
      <!-- Stadium Floodlights Glow -->
      <polygon points="260,110 320,150 280,210" fill="rgba(245,158,11,0.2)"/>
      <polygon points="700,110 640,150 680,210" fill="rgba(245,158,11,0.2)"/>
      <line x1="260" y1="110" x2="480" y2="210" stroke="rgba(245,158,11,0.4)" stroke-width="2" stroke-dasharray="6 4"/>
      <line x1="700" y1="110" x2="480" y2="210" stroke="rgba(245,158,11,0.4)" stroke-width="2" stroke-dasharray="6 4"/>
    `
  },
  {
    name: 'event-stage.png',
    title: 'EVENTFLOW PLATFORM',
    subtitle: 'Conferences & Registration Discovery',
    tag: 'MERN FULL-STACK',
    accent: '#ec4899',
    glow: '#db2777',
    bg1: '#160812',
    bg2: '#250d1f',
    iconSvg: `
      <!-- Stage Spotlights & Ticket -->
      <path d="M380 150 L580 150 L580 270 L380 270 Z" fill="rgba(236,72,153,0.12)" stroke="#ec4899" stroke-width="3" rx="10"/>
      <circle cx="380" cy="210" r="14" fill="#160812"/>
      <circle cx="580" cy="210" r="14" fill="#160812"/>
      <line x1="480" y1="165" x2="480" y2="255" stroke="rgba(236,72,153,0.5)" stroke-width="2" stroke-dasharray="4 3"/>
      <!-- Spotlights -->
      <polygon points="200,80 380,270 300,270" fill="rgba(236,72,153,0.15)"/>
      <polygon points="760,80 580,270 660,270" fill="rgba(236,72,153,0.15)"/>
    `
  },
  {
    name: 'ecommerce-nxttrendz.png',
    title: 'NXT TRENDZ COMMERCE',
    subtitle: 'Digital Storefront & Secure Auth',
    tag: 'E-COMMERCE',
    accent: '#f97316',
    glow: '#ea580c',
    bg1: '#120b06',
    bg2: '#1f130b',
    iconSvg: `
      <!-- Shopping Bag & Cart Symbol -->
      <rect x="420" y="160" width="120" height="120" rx="16" fill="rgba(249,115,22,0.12)" stroke="#f97316" stroke-width="3"/>
      <path d="M455 160 Q480 100 505 160" fill="none" stroke="#f97316" stroke-width="4"/>
      <circle cx="480" cy="215" r="14" fill="#f97316"/>
      <!-- Sparkle stars -->
      <polygon points="360,180 365,195 380,200 365,205 360,220 355,205 340,200 355,195" fill="#f97316"/>
      <polygon points="600,180 605,195 620,200 605,205 600,220 595,205 580,200 595,195" fill="#f97316"/>
    `
  },
  {
    name: 'job-search.png',
    title: 'JOBBY APP PLATFORM',
    subtitle: 'Career Discovery & Role Matcher',
    tag: 'PORTAL SEARCH',
    accent: '#6366f1',
    glow: '#4f46e5',
    bg1: '#0b0c1b',
    bg2: '#13152e',
    iconSvg: `
      <!-- Briefcase & Magnifying Glass -->
      <rect x="410" y="160" width="140" height="100" rx="12" fill="rgba(99,102,241,0.12)" stroke="#6366f1" stroke-width="3"/>
      <rect x="455" y="135" width="50" height="25" rx="6" fill="none" stroke="#6366f1" stroke-width="3"/>
      <line x1="410" y1="205" x2="550" y2="205" stroke="#6366f1" stroke-width="2"/>
      <!-- Search Lens -->
      <circle cx="560" cy="250" r="30" fill="#0b0c1b" stroke="#6366f1" stroke-width="4"/>
      <line x1="582" y1="272" x2="615" y2="305" stroke="#6366f1" stroke-width="5" stroke-linecap="round"/>
    `
  },
  {
    name: 'video-streaming.png',
    title: 'NXT WATCH STREAMING',
    subtitle: 'Cinematic Player & Category Channels',
    tag: 'MEDIA PLATFORM',
    accent: '#ef4444',
    glow: '#dc2626',
    bg1: '#160808',
    bg2: '#240d0d',
    iconSvg: `
      <!-- Video Screen with Play Triangle -->
      <rect x="380" y="140" width="200" height="140" rx="16" fill="rgba(239,68,68,0.1)" stroke="#ef4444" stroke-width="3.5"/>
      <polygon points="465,185 515,210 465,235" fill="#ef4444"/>
      <!-- Cinema film strips on sides -->
      <rect x="330" y="150" width="30" height="120" rx="4" fill="none" stroke="rgba(239,68,68,0.4)" stroke-width="2"/>
      <rect x="600" y="150" width="30" height="120" rx="4" fill="none" stroke="rgba(239,68,68,0.4)" stroke-width="2"/>
    `
  },
  {
    name: 'mood-tracker.png',
    title: 'DAILY MOOD TRACKER',
    subtitle: 'Wellness Trends & Sentiment Diary',
    tag: 'WELLNESS TECH',
    accent: '#14b8a6',
    glow: '#0d9488',
    bg1: '#071614',
    bg2: '#0d2522',
    iconSvg: `
      <!-- Sine wellness waves & Heart -->
      <circle cx="480" cy="205" r="60" fill="rgba(20,184,166,0.12)" stroke="#14b8a6" stroke-width="3"/>
      <path d="M480 230 C460 210 445 190 455 175 C465 160 480 175 480 180 C480 175 495 160 505 175 C515 190 500 210 480 230 Z" fill="#14b8a6"/>
      <!-- Wave -->
      <path d="M280 210 Q 380 150 480 210 T 680 210" fill="none" stroke="rgba(20,184,166,0.4)" stroke-width="3"/>
    `
  },
  {
    name: 'fraud-detection.png',
    title: 'CREDIT FRAUD DETECTION',
    subtitle: 'Machine Learning Security Classifier',
    tag: 'AI SECURITY',
    accent: '#06b6d4',
    glow: '#0891b2',
    bg1: '#061318',
    bg2: '#0a212a',
    iconSvg: `
      <!-- Credit Card with Shield Overlay -->
      <rect x="380" y="150" width="200" height="125" rx="14" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.5)" stroke-width="2.5"/>
      <rect x="405" y="180" width="35" height="28" rx="4" fill="#06b6d4"/>
      <!-- Security Shield in front -->
      <path d="M480 175 L525 195 L525 240 Q480 270 480 270 Q480 270 435 240 L435 195 Z" fill="#061318" stroke="#06b6d4" stroke-width="3"/>
      <!-- Checkmark -->
      <polyline points="460,225 475,240 500,210" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
    `
  },
  {
    name: 'facial-recognition.png',
    title: 'AGE & GENDER DETECTION',
    subtitle: 'Deep Learning Computer Vision',
    tag: 'COMPUTER VISION',
    accent: '#8b5cf6',
    glow: '#6d28d9',
    bg1: '#110b1f',
    bg2: '#1d1334',
    iconSvg: `
      <!-- Target Corner Brackets & Face Landmark Points -->
      <path d="M410 140 L380 140 L380 170" fill="none" stroke="#8b5cf6" stroke-width="4" stroke-linecap="round"/>
      <path d="M550 140 L580 140 L580 170" fill="none" stroke="#8b5cf6" stroke-width="4" stroke-linecap="round"/>
      <path d="M380 250 L380 280 L410 280" fill="none" stroke="#8b5cf6" stroke-width="4" stroke-linecap="round"/>
      <path d="M580 250 L580 280 L550 280" fill="none" stroke="#8b5cf6" stroke-width="4" stroke-linecap="round"/>
      <!-- Facial mesh dots -->
      <ellipse cx="480" cy="210" rx="60" ry="75" fill="none" stroke="rgba(139,92,246,0.25)" stroke-dasharray="4 3"/>
      <circle cx="455" cy="190" r="5" fill="#8b5cf6"/>
      <circle cx="505" cy="190" r="5" fill="#8b5cf6"/>
      <circle cx="480" cy="215" r="4" fill="#8b5cf6"/>
      <line x1="460" y1="245" x2="500" y2="245" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round"/>
    `
  },
  {
    name: 'cyber-attack.png',
    title: 'CYBER ATTACK LAB',
    subtitle: 'Vulnerability Defense & Phishing Sim',
    tag: 'PEN-TESTING',
    accent: '#f43f5e',
    glow: '#e11d48',
    bg1: '#17080b',
    bg2: '#270d13',
    iconSvg: `
      <!-- Warning Triangle & Terminal Lock -->
      <polygon points="480,130 560,260 400,260" fill="rgba(244,63,94,0.12)" stroke="#f43f5e" stroke-width="3"/>
      <line x1="480" y1="175" x2="480" y2="215" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      <circle cx="480" cy="235" r="3" fill="#ffffff"/>
      <!-- Matrix stream particles -->
      <text x="320" y="160" fill="rgba(244,63,94,0.3)" font-family="monospace" font-size="14">01011</text>
      <text x="610" y="190" fill="rgba(244,63,94,0.3)" font-family="monospace" font-size="14">SEC_ERR</text>
      <text x="310" y="240" fill="rgba(244,63,94,0.3)" font-family="monospace" font-size="14">AUTH_FAIL</text>
    `
  },
  {
    name: 'blockchain-security.png',
    title: 'BLOCKCHAIN PROVENANCE',
    subtitle: 'Decentralized Anti-Counterfeit Ledger',
    tag: 'WEB3 CRYPTO',
    accent: '#eab308',
    glow: '#ca8a04',
    bg1: '#151206',
    bg2: '#241f0a',
    iconSvg: `
      <!-- Interconnected Isometric Cubes -->
      <rect x="360" y="170" width="70" height="70" rx="8" fill="rgba(234,179,8,0.15)" stroke="#eab308" stroke-width="2.5"/>
      <rect x="445" y="140" width="70" height="70" rx="8" fill="rgba(234,179,8,0.25)" stroke="#eab308" stroke-width="3"/>
      <rect x="530" y="170" width="70" height="70" rx="8" fill="rgba(234,179,8,0.15)" stroke="#eab308" stroke-width="2.5"/>
      <line x1="430" y1="205" x2="445" y2="175" stroke="#ffffff" stroke-width="3"/>
      <line x1="515" y1="175" x2="530" y2="205" stroke="#ffffff" stroke-width="3"/>
    `
  },
  {
    name: 'voice-converter.png',
    title: 'AI VOICE SYNTHESIS',
    subtitle: 'Text-to-Speech Frequency Engine',
    tag: 'AUDIO AI',
    accent: '#f7931e',
    glow: '#d97706',
    bg1: '#110b06',
    bg2: '#1e140b',
    iconSvg: `
      <!-- Audio Equalizer Bars -->
      <rect x="360" y="200" width="12" height="30" rx="6" fill="#f7931e"/>
      <rect x="385" y="170" width="12" height="90" rx="6" fill="#f7931e"/>
      <rect x="410" y="140" width="12" height="150" rx="6" fill="#f7931e"/>
      <rect x="435" y="180" width="12" height="70" rx="6" fill="#f7931e"/>
      <rect x="460" y="130" width="12" height="170" rx="6" fill="#ffffff"/>
      <rect x="485" y="150" width="12" height="130" rx="6" fill="#ffffff"/>
      <rect x="510" y="170" width="12" height="90" rx="6" fill="#f7931e"/>
      <rect x="535" y="145" width="12" height="140" rx="6" fill="#f7931e"/>
      <rect x="560" y="190" width="12" height="50" rx="6" fill="#f7931e"/>
      <rect x="585" y="205" width="12" height="20" rx="6" fill="#f7931e"/>
    `
  },
  {
    name: 'data-analytics-sql.png',
    title: 'SQL & DATA ANALYTICS',
    subtitle: 'Relational Schemas & Python ETL',
    tag: 'DATABASE ETL',
    accent: '#0284c7',
    glow: '#0369a1',
    bg1: '#071219',
    bg2: '#0b1d28',
    iconSvg: `
      <!-- Database Cylinders -->
      <ellipse cx="480" cy="150" rx="60" ry="20" fill="rgba(2,132,199,0.2)" stroke="#0284c7" stroke-width="2.5"/>
      <path d="M420 150 L420 190 Q480 215 540 190 L540 150" fill="none" stroke="#0284c7" stroke-width="2.5"/>
      <path d="M420 190 L420 230 Q480 255 540 230 L540 190" fill="none" stroke="#0284c7" stroke-width="2.5"/>
      <path d="M420 230 L420 270 Q480 295 540 270 L540 230" fill="none" stroke="#0284c7" stroke-width="2.5"/>
      <!-- Connecting nodes -->
      <circle cx="350" cy="210" r="12" fill="#0284c7"/>
      <line x1="362" y1="210" x2="420" y2="210" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 2"/>
      <circle cx="610" cy="210" r="12" fill="#0284c7"/>
      <line x1="540" y1="210" x2="598" y2="210" stroke="#0284c7" stroke-width="2" stroke-dasharray="4 2"/>
    `
  },
  {
    name: 'cms-publishing.png',
    title: 'MODULAR CMS STUDIO',
    subtitle: 'Content Publishing & Markdown Workflows',
    tag: 'TYPESCRIPT CMS',
    accent: '#84cc16',
    glow: '#65a30d',
    bg1: '#0d1406',
    bg2: '#16220a',
    iconSvg: `
      <!-- Code Editor / Article Block Layout -->
      <rect x="360" y="140" width="240" height="150" rx="12" fill="rgba(132,204,22,0.08)" stroke="#84cc16" stroke-width="3"/>
      <rect x="360" y="140" width="240" height="30" rx="12" fill="rgba(132,204,22,0.15)"/>
      <circle cx="380" cy="155" r="4" fill="#84cc16"/>
      <circle cx="395" cy="155" r="4" fill="#84cc16"/>
      <circle cx="410" cy="155" r="4" fill="#84cc16"/>
      <!-- Lines of content -->
      <rect x="385" y="190" width="110" height="8" rx="4" fill="#ffffff"/>
      <rect x="385" y="210" width="190" height="6" rx="3" fill="rgba(255,255,255,0.4)"/>
      <rect x="385" y="225" width="160" height="6" rx="3" fill="rgba(255,255,255,0.4)"/>
      <rect x="385" y="240" width="130" height="6" rx="3" fill="rgba(255,255,255,0.4)"/>
    `
  }
];

async function generateAll() {
  for (const t of themes) {
    const cleanTitle = t.title.replace(/&/g, '&amp;');
    const cleanSub = t.subtitle.replace(/&/g, '&amp;');
    const cleanTag = t.tag.replace(/&/g, '&amp;');

    const svg = `
      <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="${t.bg2}" />
            <stop offset="100%" stop-color="${t.bg1}" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${t.accent}" stop-opacity="0" />
            <stop offset="50%" stop-color="${t.accent}" stop-opacity="0.8" />
            <stop offset="100%" stop-color="${t.accent}" stop-opacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Background -->
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGlow)" />

        <!-- Grid Pattern -->
        <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
          <line x1="0" y1="90" x2="${WIDTH}" y2="90" />
          <line x1="0" y1="180" x2="${WIDTH}" y2="180" />
          <line x1="0" y1="270" x2="${WIDTH}" y2="270" />
          <line x1="0" y1="360" x2="${WIDTH}" y2="360" />
          <line x1="0" y1="450" x2="${WIDTH}" y2="450" />
          <line x1="160" y1="0" x2="160" y2="${HEIGHT}" />
          <line x1="320" y1="0" x2="320" y2="${HEIGHT}" />
          <line x1="480" y1="0" x2="480" y2="${HEIGHT}" />
          <line x1="640" y1="0" x2="640" y2="${HEIGHT}" />
          <line x1="800" y1="0" x2="800" y2="${HEIGHT}" />
        </g>

        <!-- Ambient glow circle -->
        <circle cx="480" cy="220" r="140" fill="${t.accent}" opacity="0.12" filter="url(#glow)" />

        <!-- Graphic Symbol Elements -->
        <g filter="url(#glow)">
          ${t.iconSvg}
        </g>

        <!-- Divider Line -->
        <line x1="180" y1="380" x2="780" y2="380" stroke="url(#lineGrad)" stroke-width="2" />

        <!-- Text Elements -->
        <text x="480" y="420" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="1">${cleanTitle}</text>
        <text x="480" y="450" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500" fill="rgba(255,255,255,0.6)" letter-spacing="0.5">${cleanSub}</text>

        <!-- Top Badge -->
        <rect x="40" y="35" width="130" height="28" rx="14" fill="rgba(0,0,0,0.6)" stroke="${t.accent}" stroke-width="1.5"/>
        <text x="105" y="53" text-anchor="middle" font-family="monospace" font-size="11" font-weight="700" fill="${t.accent}" letter-spacing="1">${cleanTag}</text>
      </svg>
    `;

    const destPath = path.join(outDir, t.name);
    await sharp(Buffer.from(svg))
      .png({ quality: 95 })
      .toFile(destPath);
    console.log(`Generated: ${t.name}`);
  }
  console.log("All customized project images generated successfully!");
}

generateAll().catch(err => {
  console.error("Error generating images:", err);
  process.exit(1);
});
