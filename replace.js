const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Prototipo_Web', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace FontAwesome with Phosphor CDN
html = html.replace('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">', 
    '<script src="https://unpkg.com/@phosphor-icons/web"></script>\n    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">');

// Map Icons
const iconMap = {
    'fas fa-home': 'ph ph-house',
    'fas fa-calendar-alt': 'ph ph-calendar-blank',
    'fas fa-clipboard-check': 'ph ph-clipboard-text',
    'fas fa-certificate': 'ph ph-certificate',
    'fas fa-moon': 'ph ph-moon',
    'fas fa-user text-muted': 'ph ph-user text-muted',
    'fas fa-arrow-right': 'ph ph-arrow-right',
    'fas fa-key': 'ph ph-key',
    'fas fa-paper-plane': 'ph ph-paper-plane-right',
    'fas fa-arrow-left': 'ph ph-arrow-left',
    'fas fa-check-circle': 'ph ph-check-circle',
    'fas fa-car': 'ph ph-car-profile',
    'fas fa-clipboard-list': 'ph ph-list-checks',
    'fas fa-file-invoice-dollar': 'ph ph-receipt',
    'fas fa-plus': 'ph ph-plus',
    'fas fa-car-side': 'ph ph-car-profile',
    'fas fa-truck': 'ph ph-truck',
    'fas fa-calendar-plus': 'ph ph-calendar-plus',
    'fas fa-search': 'ph ph-magnifying-glass',
    'fas fa-qrcode': 'ph ph-qr-code',
    'fas fa-receipt': 'ph ph-receipt',
    'fas fa-star': 'ph ph-star',
    'fas fa-download': 'ph ph-download-simple',
    'fas fa-user-astronaut': 'ph ph-user-focus',
    'fas fa-camera': 'ph ph-camera',
    'fas fa-sign-out-alt': 'ph ph-sign-out'
};

for (const [fa, ph] of Object.entries(iconMap)) {
    html = html.split(`"${fa}"`).join(`"${ph}"`);
}

// Add sparklines
html = html.replace(
    /<h3>12,450<\/h3>/, 
    `<h3>12,450</h3>
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" style="margin-top:8px;">
        <path d="M0 20 Q 20 0 40 15 T 80 5" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round"/>
    </svg>`
);
html = html.replace(
    /<h3>845<\/h3>/, 
    `<h3>845</h3>
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" style="margin-top:8px;">
        <path d="M0 10 Q 20 20 40 5 T 80 15" stroke="var(--color-warning)" stroke-width="2" stroke-linecap="round"/>
    </svg>`
);
html = html.replace(
    /<h3>RD\$ 4.2M<\/h3>/, 
    `<h3>RD$ 4.2M</h3>
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" style="margin-top:8px;">
        <path d="M0 24 L 20 15 L 40 20 L 60 5 L 80 0" stroke="var(--color-success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
);

// Replace Marbete QR Code with a nice SVG
const fakeQR = `<svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <!-- QR Position markers -->
    <rect x="5" y="5" width="25" height="25" fill="none" stroke="#000" stroke-width="4" rx="4"/>
    <rect x="10" y="10" width="15" height="15" fill="#000" rx="2"/>
    <rect x="70" y="5" width="25" height="25" fill="none" stroke="#000" stroke-width="4" rx="4"/>
    <rect x="75" y="10" width="15" height="15" fill="#000" rx="2"/>
    <rect x="5" y="70" width="25" height="25" fill="none" stroke="#000" stroke-width="4" rx="4"/>
    <rect x="10" y="75" width="15" height="15" fill="#000" rx="2"/>
    <!-- Random dots -->
    <rect x="40" y="5" width="10" height="10" fill="#000" rx="2"/>
    <rect x="55" y="15" width="10" height="10" fill="#000" rx="2"/>
    <rect x="40" y="30" width="15" height="10" fill="#000" rx="2"/>
    <rect x="5" y="40" width="25" height="10" fill="#000" rx="2"/>
    <rect x="70" y="40" width="25" height="10" fill="#000" rx="2"/>
    <rect x="40" y="50" width="10" height="10" fill="#000" rx="2"/>
    <rect x="55" y="50" width="10" height="10" fill="#000" rx="2"/>
    <rect x="80" y="70" width="15" height="10" fill="#000" rx="2"/>
    <rect x="70" y="85" width="10" height="10" fill="#000" rx="2"/>
    <rect x="40" y="70" width="25" height="25" fill="#000" rx="2"/>
    <!-- Center Logo placeholder -->
    <circle cx="50" cy="50" r="12" fill="#fff"/>
    <circle cx="50" cy="50" r="10" fill="var(--color-accent)"/>
</svg>`;

html = html.replace(/<i class="ph ph-qr-code"><\/i>/g, fakeQR); // I replaced it above with ph ph-qr-code
// Actually in the marbete page it's exactly <i class="ph ph-qr-code"></i>

fs.writeFileSync(filePath, html, 'utf8');
console.log("Done");
