const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'Prototipo_Web', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace href="#" with href="javascript:void(0)" to prevent the 
// 'Unsafe attempt to load URL' security error when clicking links locally.
html = html.replace(/href="#"/g, 'href="javascript:void(0)"');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✓ Fixed href="#" issues in index.html');
