const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Prototipo_Web', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Replace the SVG QR codes with real img QR codes
const svgRegex = /<svg viewBox="0 0 100 100" width="100" height="100" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/g;
const realQR = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ecorevisionrd.com" alt="QR Code" style="width: 100px; height: 100px;">`;
html = html.replace(svgRegex, realQR);

// 2. Dashboard Vehicles: Replace .v-icon with an image container and update layout
const civicHTML = `
                                <div class="v-info" style="align-items: center; gap: 16px;">
                                    <div class="v-image" style="width: 80px; height: 50px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                        <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=150" alt="Honda Civic 2022" style="width: 100%; height: 100%; object-fit: cover;">
                                    </div>
                                    <div class="v-details">
                                        <h4>Honda Civic 2022</h4>
                                        <p>A345678 • Renovado</p>
                                    </div>
                                </div>`;

const hiluxHTML = `
                                <div class="v-info" style="align-items: center; gap: 16px;">
                                    <div class="v-image" style="width: 80px; height: 50px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                        <img src="https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=150" alt="Toyota Hilux 2019" style="width: 100%; height: 100%; object-fit: cover;">
                                    </div>
                                    <div class="v-details">
                                        <h4>Toyota Hilux 2019</h4>
                                        <p>L987654 • Requiere Inspección</p>
                                    </div>
                                </div>`;

// Replace Civic block
html = html.replace(/<div class="v-info">\s*<div class="v-icon"><i class="ph ph-car-profile"><\/i><\/div>\s*<div class="v-details">\s*<h4>Honda Civic 2022<\/h4>\s*<p>A345678 • Renovado<\/p>\s*<\/div>\s*<\/div>/, civicHTML);

// Replace Hilux block
html = html.replace(/<div class="v-info">\s*<div class="v-icon"><i class="ph ph-truck"><\/i><\/div>\s*<div class="v-details">\s*<h4>Toyota Hilux 2019<\/h4>\s*<p>L987654 • Requiere Inspección<\/p>\s*<\/div>\s*<\/div>/, hiluxHTML);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Update Complete');
