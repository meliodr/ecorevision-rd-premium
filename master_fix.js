const fs = require('fs');
const path = require('path');

// ─── FIX 1: script.js - hide sidebar on 'registro' ───
const jsPath = path.join(__dirname, 'Prototipo_Web', 'script.js');
let js = fs.readFileSync(jsPath, 'utf8');
js = js.replace(
    "if (targetViewId === 'login' || targetViewId === 'forgot-password') {",
    "if (targetViewId === 'login' || targetViewId === 'forgot-password' || targetViewId === 'registro') {"
);
fs.writeFileSync(jsPath, js, 'utf8');
console.log('✓ sidebar fix done');

// ─── FIX 2: index.html - redesign dashboard stat cards, mobile nav, reservas, inspeccion ───
const htmlPath = path.join(__dirname, 'Prototipo_Web', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 2a. Redesign the 3 stat cards to use gradient accent border-left and side-by-side layout on mobile
const oldStats = `                    <!-- Stats -->
                    <div class="bento-item surface span-4">
                        <div class="stat-mini">
                            <div style="flex: 1;">
                                <div class="stat-label">Vehículos Activos</div>
                                <div class="stat-value">3</div>
                                <div style="margin-top: 10px; height: 4px; background: var(--color-border); border-radius: 99px; overflow: hidden;">
                                    <div style="width: 100%; height: 100%; background: var(--color-accent); border-radius: 99px;"></div>
                                </div>
                            </div>
                            <div class="stat-mini-icon"><i class="ph ph-car-profile"></i></div>
                        </div>
                    </div>
                    <div class="bento-item surface span-4">
                        <div class="stat-mini">
                            <div style="flex: 1;">
                                <div class="stat-label">Inspecciones Pendientes</div>
                                <div class="stat-value" style="color: var(--color-warning);">1</div>
                                <div style="margin-top: 10px; height: 4px; background: var(--color-border); border-radius: 99px; overflow: hidden;">
                                    <div style="width: 33%; height: 100%; background: var(--color-warning); border-radius: 99px;"></div>
                                </div>
                            </div>
                            <div class="stat-mini-icon" style="color: var(--color-warning); background: rgba(251,191,36,0.1);"><i class="ph ph-list-checks"></i></div>
                        </div>
                    </div>
                    <div class="bento-item surface span-4">
                        <div class="stat-mini">
                            <div style="flex: 1;">
                                <div class="stat-label">Multas Pendientes</div>
                                <div class="stat-value" style="color: var(--color-success);">0</div>
                                <div style="margin-top: 10px; height: 4px; background: var(--color-border); border-radius: 99px; overflow: hidden;">
                                    <div style="width: 0%; height: 100%; background: var(--color-success); border-radius: 99px;"></div>
                                </div>
                            </div>
                            <div class="stat-mini-icon" style="color: var(--color-success); background: rgba(52,211,153,0.1);"><i class="ph ph-receipt"></i></div>
                        </div>
                    </div>`;

const newStats = `                    <!-- Stats - Redesigned with gradient accent cards -->
                    <div class="stat-card-accent span-4" style="border-left-color: var(--color-accent);">
                        <div class="stat-mini">
                            <div style="flex: 1;">
                                <div class="stat-label">Vehículos Activos</div>
                                <div class="stat-value">3</div>
                                <div class="stat-bar"><div style="width: 100%; height: 100%; background: var(--color-accent); border-radius: 99px;"></div></div>
                            </div>
                            <div class="stat-mini-icon" style="background: rgba(232,99,10,0.15); color: var(--color-accent); width: 56px; height: 56px; font-size: 1.5rem;"><i class="ph ph-car-profile"></i></div>
                        </div>
                    </div>
                    <div class="stat-card-accent span-4" style="border-left-color: var(--color-warning);">
                        <div class="stat-mini">
                            <div style="flex: 1;">
                                <div class="stat-label">Inspecciones Pendientes</div>
                                <div class="stat-value" style="color: var(--color-warning);">1</div>
                                <div class="stat-bar"><div style="width: 33%; height: 100%; background: var(--color-warning); border-radius: 99px;"></div></div>
                            </div>
                            <div class="stat-mini-icon" style="color: var(--color-warning); background: rgba(251,191,36,0.15); width: 56px; height: 56px; font-size: 1.5rem;"><i class="ph ph-clipboard-text"></i></div>
                        </div>
                    </div>
                    <div class="stat-card-accent span-4" style="border-left-color: var(--color-success);">
                        <div class="stat-mini">
                            <div style="flex: 1;">
                                <div class="stat-label">Multas Pendientes</div>
                                <div class="stat-value" style="color: var(--color-success);">0</div>
                                <div class="stat-bar"><div style="width: 0%; height: 100%; background: var(--color-success); border-radius: 99px;"></div></div>
                            </div>
                            <div class="stat-mini-icon" style="color: var(--color-success); background: rgba(52,211,153,0.15); width: 56px; height: 56px; font-size: 1.5rem;"><i class="ph ph-shield-check"></i></div>
                        </div>
                    </div>`;

html = html.replace(oldStats, newStats);

// 2b. Improve reservas (Agendar Cita) - find the section and add a visual timeline
const oldReservasHeader = `            <!-- Reservas View -->
            <section id="reservas" class="view">
                <header class="view-header">
                    <div class="breadcrumbs">Inicio <span>/</span> Agendar Cita</div>
                    <h2 class="page-title text-gradient">Agendar Inspección</h2>
                    <p class="text-muted">Selecciona un taller certificado y coordina tu visita.</p>
                </header>`;

const newReservasHeader = `            <!-- Reservas View -->
            <section id="reservas" class="view">
                <header class="view-header">
                    <div class="breadcrumbs">Inicio <span>/</span> Agendar Cita</div>
                    <h2 class="page-title text-gradient">Agendar Inspección</h2>
                    <p class="text-muted">Selecciona un taller certificado y coordina tu visita.</p>
                    <div style="display: flex; gap: 8px; margin-top: 20px; flex-wrap: wrap;">
                        <div class="step-pill active-step"><span>1</span> Taller</div>
                        <div class="step-pill"><span>2</span> Fecha</div>
                        <div class="step-pill"><span>3</span> Confirmar</div>
                    </div>
                </header>`;

html = html.replace(oldReservasHeader, newReservasHeader);

// 2c. Add nav items class for mobile limiting
// Add data-mobile="hide" to Historial nav link so CSS can hide it on mobile
html = html.replace(
    '<a href="#" class="nav-link" onclick="app.navigate(\'historial\')">',
    '<a href="#" class="nav-link nav-hide-mobile" onclick="app.navigate(\'historial\')">'
);
html = html.replace(
    '<a href="#" class="nav-link" onclick="app.navigate(\'perfil\')">',
    '<a href="#" class="nav-link nav-hide-mobile" onclick="app.navigate(\'perfil\')">'
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✓ HTML fixes done');

// ─── FIX 3: CSS additions ───
const cssPath = path.join(__dirname, 'Prototipo_Web', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const newCss = `

/* ================================================
   STAT CARD ACCENT (Dashboard v2)
   ================================================ */
.stat-card-accent {
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    border-left: 4px solid var(--color-accent);
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-3);
    display: flex;
    flex-direction: column;
    transition: transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
}
body:not(.light-theme) .stat-card-accent { backdrop-filter: blur(20px); }
.stat-card-accent:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.25); }

.stat-bar {
    margin-top: 10px;
    height: 4px;
    background: var(--color-border);
    border-radius: 99px;
    overflow: hidden;
}

/* ================================================
   STEP PILLS (Agendar Cita Timeline)
   ================================================ */
.step-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    color: var(--color-text-secondary);
}
.step-pill span {
    width: 20px; height: 20px;
    background: var(--color-border);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
}
.step-pill.active-step {
    background: rgba(232,99,10,0.1);
    border-color: var(--color-accent);
    color: var(--color-accent);
}
.step-pill.active-step span {
    background: var(--color-accent);
    color: #fff;
}

/* ================================================
   MOBILE NAV: limit to 5 core items
   ================================================ */
@media (max-width: 768px) {
    .nav-hide-mobile {
        display: none !important;
    }
    /* Make nav links label visible and small on mobile */
    .nav-link span {
        display: block !important;
        font-size: 0.6rem;
        line-height: 1;
        margin-top: 2px;
        color: inherit;
    }
}

/* ================================================
   MOBILE STAT CARDS: side by side
   ================================================ */
@media (max-width: 768px) {
    .stat-card-accent.span-4 {
        grid-column: span 6;
    }
    .stat-card-accent.span-4:first-of-type {
        grid-column: span 12;
    }
}

/* Dashboard welcome banner */
.dashboard-welcome {
    background: linear-gradient(135deg, rgba(232,99,10,0.12) 0%, rgba(232,99,10,0.04) 100%);
    border: 1px solid rgba(232,99,10,0.2);
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4);
    margin-bottom: var(--space-3);
    display: flex;
    align-items: center;
    gap: 16px;
}
.dashboard-welcome .welcome-icon {
    font-size: 2rem;
    color: var(--color-accent);
}
`;

css += newCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('✓ CSS additions done');

console.log('\n✅ All fixes applied successfully!');
