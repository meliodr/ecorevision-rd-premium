const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Prototipo_Web', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Fix sidebar theme toggle – replace "Modo Claro" floating button with an icon-only button in sidebar
// The themeToggle currently shows as a popup. On mobile it should be hidden; on desktop it shows inline.
// The issue: it's styled as a `btn-secondary` that appears as a floating pop-up because the sidebar is hidden.
// Fix: Remove theme toggle from sidebar footer area and attach it directly to the sidebar nav as an icon button.

// 2. Fix ID Inspección badge (white on white in light mode)
html = html.replace(
    '<div class="status-badge warning" style="font-size: 0.9rem; padding: 8px 16px;">\n                                ID Inspección: #INSP-84729\n                            </div>',
    '<div style="background: var(--color-warning); color: #000; font-size: 0.8rem; font-weight: 700; padding: 8px 16px; border-radius: 999px; white-space: nowrap;">ID #INSP-84729</div>'
);

// 3. Fix Pagos icon – use a text-based fallback SVG icon
html = html.replace(
    '<div class="qa-card" style="background: var(--color-accent); color: #fff; border: none;">\n                                <i class="ph ph-receipt"></i>\n                                <div style="font-size: 0.8rem; font-weight: 500;">Pagos</div>\n                            </div>',
    '<div class="qa-card" style="background: var(--color-accent); color: #fff; border: none;" onclick="app.navigate(\'pagos\')">\n                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" style="margin-bottom:10px;fill:#fff;display:block;margin-left:auto;margin-right:auto;"><path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,144H32V64H224V192ZM48,136a8,8,0,0,1,8-8H72a8,8,0,0,1,0,16H56A8,8,0,0,1,48,136Zm80,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H136A8,8,0,0,1,128,136Z"/></svg>\n                                <div style="font-size: 0.8rem; font-weight: 500;">Pagos</div>\n                            </div>'
);

// 4. Remove the "Modo Claro" floating theme toggle from sidebar (replace with nothing on mobile via CSS)
// The text says "Modo Claro" on button. Let's update it to be icon-only and always say "Tema"
html = html.replace(
    '<button id="themeToggle" class="btn-secondary" style="width: 100%; margin-bottom: var(--space-3); display: flex; justify-content: center; gap: 8px;">\n                    <i class="ph ph-moon"></i> <span>Cambiar Tema</span>\n                </button>',
    '<button id="themeToggle" class="btn-icon-theme" title="Cambiar Tema">\n                    <i class="ph ph-moon" id="themeIcon"></i>\n                </button>'
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Quick fixes applied');
