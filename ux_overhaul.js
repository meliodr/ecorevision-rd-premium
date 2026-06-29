const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'Prototipo_Web', 'index.html');
const cssPath = path.join(__dirname, 'Prototipo_Web', 'styles.css');
const jsPath = path.join(__dirname, 'Prototipo_Web', 'script.js');

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Move Theme Toggle to be a FAB (Floating Action Button) so it's always visible
// Remove it from the sidebar
html = html.replace(
    `<button id="themeToggle" class="btn-icon-theme" title="Cambiar Tema">
                    <i class="ph ph-moon" id="themeIcon"></i>
                </button>`,
    ''
);

// Add it just before the closing </body> tag
html = html.replace(
    '    <script src="script.js"></script>',
    `    <!-- Theme Toggle FAB -->
    <button id="themeToggle" class="fab-theme" title="Cambiar Tema">
        <i class="ph ph-moon" id="themeIcon"></i>
    </button>
    <script src="script.js"></script>`
);

// CSS for FAB
css += `
/* Floating Theme Toggle */
.fab-theme {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    color: var(--color-text-primary);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 9999;
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.fab-theme:hover {
    transform: scale(1.1);
    color: var(--color-accent);
    border-color: var(--color-accent);
}
@media (max-width: 768px) {
    .fab-theme {
        bottom: 90px; /* Above the mobile nav bar */
        right: 16px;
        width: 48px;
        height: 48px;
        font-size: 1.2rem;
    }
}
`;


// 2. Improve Icon in Pagos Button
// Replace the inline SVG with the proper Phosphor icon
html = html.replace(
    `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" style="margin-bottom:10px;fill:#fff;display:block;margin-left:auto;margin-right:auto;"><path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,144H32V64H224V192ZM48,136a8,8,0,0,1,8-8H72a8,8,0,0,1,0,16H56A8,8,0,0,1,48,136Zm80,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H136A8,8,0,0,1,128,136Z"/></svg>`,
    `<i class="ph ph-credit-card" style="font-size: 28px; margin-bottom: 8px;"></i>`
);


// 3. Multi-step logic for Reservas
const oldReservasBento = html.match(/<!-- Filtros -->[\s\S]*?Confirmar Cita[\s\S]*?<\/button>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/)[0];

const newReservasBento = `
                    <!-- STEP 1: Seleccionar Taller -->
                    <div id="reserva-step-1" class="span-12 bento-grid" style="display: grid;">
                        <div class="bento-item surface span-4">
                            <h3 style="margin-bottom: 16px; display: flex; align-items: center; gap: 8px;"><i class="ph ph-funnel" style="color: var(--color-accent);"></i> Filtros</h3>
                            <div class="form-group">
                                <label>Provincia</label>
                                <select class="input-modern">
                                    <option>Distrito Nacional</option>
                                    <option>Santo Domingo</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Vehículo</label>
                                <select class="input-modern">
                                    <option>Toyota Hilux 2019 (L987654)</option>
                                </select>
                            </div>
                        </div>
                        <div class="bento-item surface span-8">
                            <h3 style="margin-bottom: 16px;">Talleres Disponibles</h3>
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                <div style="padding: 16px; border: 2px solid var(--color-accent); border-radius: var(--radius-md); cursor: pointer; background: rgba(232,99,10,0.06); display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 1.1rem;">AutoCentro Nacional — Naco</div>
                                        <div class="text-muted" style="font-size: 0.85rem; margin-top: 4px;"><i class="ph ph-map-pin"></i> Av. Tiradentes #45, Naco · 2.1 km</div>
                                    </div>
                                    <span class="status-badge success"><i class="ph ph-star"></i> 4.8</span>
                                </div>
                                <div style="padding: 16px; border: 1px solid var(--color-border); border-radius: var(--radius-md); cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 1.1rem;">ITV Centro Sur</div>
                                        <div class="text-muted" style="font-size: 0.85rem; margin-top: 4px;"><i class="ph ph-map-pin"></i> Zona Industrial de Herrera · 5.4 km</div>
                                    </div>
                                    <span class="status-badge success"><i class="ph ph-star"></i> 4.5</span>
                                </div>
                            </div>
                            <div style="margin-top: 24px; text-align: right;">
                                <button class="btn-primary" onclick="app.setStep('reserva', 2)">Continuar <i class="ph ph-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- STEP 2: Seleccionar Fecha -->
                    <div id="reserva-step-2" class="span-12 bento-grid" style="display: none;">
                        <div class="bento-item surface span-12">
                            <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--color-border); padding-bottom: 16px;">
                                <button class="btn-icon" onclick="app.setStep('reserva', 1)"><i class="ph ph-arrow-left"></i></button>
                                <h3>Seleccionar Fecha y Hora</h3>
                            </div>
                            
                            <div class="form-group" style="max-width: 300px; margin-bottom: 24px;">
                                <label>Fecha Preferida</label>
                                <input type="date" class="input-modern" value="2024-07-15">
                            </div>

                            <p class="text-muted" style="margin-bottom: 12px; font-weight: 500;">Horarios Disponibles — Lunes 15 Jul 2024</p>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;">
                                <button class="time-slot-btn">08:00 AM</button>
                                <button class="time-slot-btn">09:00 AM</button>
                                <button class="time-slot-btn active-slot">10:30 AM ✓</button>
                                <button class="time-slot-btn">11:00 AM</button>
                                <button class="time-slot-btn" disabled>02:00 PM</button>
                                <button class="time-slot-btn">03:30 PM</button>
                            </div>

                            <div style="text-align: right;">
                                <button class="btn-primary" onclick="app.setStep('reserva', 3)">Continuar <i class="ph ph-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- STEP 3: Confirmación -->
                    <div id="reserva-step-3" class="span-12 bento-grid" style="display: none;">
                        <div class="bento-item surface span-12">
                            <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--color-border); padding-bottom: 16px;">
                                <button class="btn-icon" onclick="app.setStep('reserva', 2)"><i class="ph ph-arrow-left"></i></button>
                                <h3>Confirmación de Cita</h3>
                            </div>

                            <div style="background: var(--color-bg-body); border-radius: var(--radius-md); padding: 24px; margin-bottom: 24px; border: 1px solid var(--color-border);">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                                    <div>
                                        <p class="text-muted" style="font-size: 0.85rem;">Taller Seleccionado</p>
                                        <p style="font-weight: 600; font-size: 1.1rem;">AutoCentro Nacional — Naco</p>
                                    </div>
                                    <div>
                                        <p class="text-muted" style="font-size: 0.85rem;">Fecha y Hora</p>
                                        <p style="font-weight: 600; font-size: 1.1rem;">Lunes 15 Jul 2024, 10:30 AM</p>
                                    </div>
                                    <div>
                                        <p class="text-muted" style="font-size: 0.85rem;">Vehículo</p>
                                        <p style="font-weight: 600; font-size: 1.1rem;">Toyota Hilux 2019 (L987654)</p>
                                    </div>
                                    <div>
                                        <p class="text-muted" style="font-size: 0.85rem;">Tarifa Total a Pagar en Taller</p>
                                        <p style="font-weight: 700; font-size: 1.2rem; color: var(--color-success);">RD$1,770.00</p>
                                    </div>
                                </div>
                            </div>

                            <div style="display: flex; justify-content: flex-end; gap: 12px;">
                                <button class="btn-secondary" onclick="app.navigate('dashboard')">Cancelar</button>
                                <button class="btn-primary" onclick="app.showToast('¡Cita confirmada! Recibirás un recordatorio.', 'success'); app.navigate('dashboard');">
                                    <i class="ph ph-calendar-check"></i> Confirmar Cita
                                </button>
                            </div>
                        </div>
                    </div>
`;
html = html.replace(oldReservasBento, newReservasBento);

// Update step indicators logic visually
const oldSteps = `<div style="display: flex; gap: 8px; margin-top: 20px; flex-wrap: wrap;">
                        <div class="step-pill active-step"><span>1</span> Taller</div>
                        <div class="step-pill"><span>2</span> Fecha</div>
                        <div class="step-pill"><span>3</span> Confirmar</div>
                    </div>`;
const newSteps = `<div style="display: flex; gap: 8px; margin-top: 20px; flex-wrap: wrap;" id="reserva-steps-header">
                        <div class="step-pill active-step" id="reserva-pill-1"><span>1</span> Taller</div>
                        <div class="step-pill" id="reserva-pill-2"><span>2</span> Fecha</div>
                        <div class="step-pill" id="reserva-pill-3"><span>3</span> Confirmar</div>
                    </div>`;
html = html.replace(oldSteps, newSteps);


// 4. Multi-step logic for Inspeccion
const oldInspGrid = html.match(/<div class="bento-grid">[\s\S]*?<!-- Marbete View -->/)[0];
// We need to carefully replace the inside of the bento grid
const newInspGrid = `<div class="bento-grid">
                    <!-- Cabecera del Vehiculo (Span 12) -->
                    <div class="bento-item surface span-12" style="display: flex; gap: 24px; align-items: center;">
                        <div class="v-image" style="width: 120px; height: 80px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); flex-shrink: 0; background: var(--color-bg-body);">
                            <img src="https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=200" alt="Toyota Hilux 2019" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="flex: 1;">
                            <h3>Toyota Hilux 2019</h3>
                            <p class="text-muted">Chasis: JTEKT8284849202 • Placa: L987654</p>
                        </div>
                        <div style="background: var(--color-warning); color: #000; font-size: 0.8rem; font-weight: 700; padding: 8px 16px; border-radius: 999px; white-space: nowrap;">ID #INSP-84729</div>
                    </div>

                    <!-- STEP 1: Emisiones -->
                    <div id="insp-step-1" class="span-12 bento-grid" style="display: grid;">
                        <div class="bento-item surface span-12">
                            <h4 style="margin-bottom: 20px; color: var(--color-accent); display: flex; align-items: center; gap: 8px;"><i class="ph ph-wind"></i> 1. Emisiones de Gases</h4>
                            <div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
                                <label class="custom-toggle">
                                    <span class="toggle-text">CO dentro de parámetros normales (Menor a 0.5%)</span>
                                    <input type="checkbox" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                                <label class="custom-toggle">
                                    <span class="toggle-text">HC dentro de parámetros normales (Menor a 100 ppm)</span>
                                    <input type="checkbox" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                                <label class="custom-toggle">
                                    <span class="toggle-text">Fuga en sistema de escape detectada</span>
                                    <input type="checkbox">
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            <div style="margin-top: 24px; text-align: right; border-top: 1px solid var(--color-border); padding-top: 16px;">
                                <button class="btn-primary" onclick="app.setStep('insp', 2)">Siguiente: Frenos <i class="ph ph-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- STEP 2: Frenos -->
                    <div id="insp-step-2" class="span-12 bento-grid" style="display: none;">
                        <div class="bento-item surface span-12">
                            <h4 style="margin-bottom: 20px; color: var(--color-accent); display: flex; align-items: center; gap: 8px;"><i class="ph ph-car"></i> 2. Sistema de Frenos</h4>
                            <div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
                                <label class="custom-toggle">
                                    <span class="toggle-text">Eficacia de frenado superior al 50%</span>
                                    <input type="checkbox" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                                <label class="custom-toggle">
                                    <span class="toggle-text">Desequilibrio entre ejes menor al 30%</span>
                                    <input type="checkbox" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                                <label class="custom-toggle">
                                    <span class="toggle-text">Freno de estacionamiento defectuoso</span>
                                    <input type="checkbox">
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            <div style="margin-top: 24px; display: flex; justify-content: space-between; border-top: 1px solid var(--color-border); padding-top: 16px;">
                                <button class="btn-secondary" onclick="app.setStep('insp', 1)"><i class="ph ph-arrow-left"></i> Atrás</button>
                                <button class="btn-primary" onclick="app.setStep('insp', 3)">Siguiente: Decisión <i class="ph ph-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- STEP 3: Decisión y Firma -->
                    <div id="insp-step-3" class="span-12 bento-grid" style="display: none;">
                        <div class="bento-item surface span-12">
                            <h4 style="margin-bottom: 20px; color: var(--color-accent); display: flex; align-items: center; gap: 8px;"><i class="ph ph-check-circle"></i> 3. Decisión Final</h4>
                            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                                
                                <div class="segmented-control" style="width: 100%; max-width: 400px; margin-bottom: 24px;">
                                    <input type="radio" name="res" id="res-aprobado" checked>
                                    <label for="res-aprobado" class="seg-aprobado"><i class="ph ph-check-circle"></i> Aprobado</label>
                                    
                                    <input type="radio" name="res" id="res-condicionado">
                                    <label for="res-condicionado" class="seg-condicionado"><i class="ph ph-warning-circle"></i> Condicionado</label>
                                    
                                    <input type="radio" name="res" id="res-rechazado">
                                    <label for="res-rechazado" class="seg-rechazado"><i class="ph ph-x-circle"></i> Rechazado</label>
                                </div>
                            </div>

                            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 24px; margin-top: 16px;">
                                <button class="btn-secondary" onclick="app.setStep('insp', 2)"><i class="ph ph-arrow-left"></i> Atrás</button>
                                <div style="display: flex; gap: 16px;">
                                    <button class="btn-secondary" onclick="app.navigate('dashboard')">Cancelar</button>
                                    <button class="btn-primary" onclick="app.showToast('Inspección firmada digitalmente', 'success'); app.navigate('dashboard')">Firmar y Emitir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Marbete View -->`;

html = html.replace(oldInspGrid, newInspGrid);

// Update progress bar dynamically based on ID
const oldProg = `<div style="display: flex; gap: 8px; margin-top: 16px; align-items: center;">
                        <div style="flex: 1; height: 6px; background: var(--color-accent); border-radius: 99px;"></div>
                        <div style="flex: 1; height: 6px; background: var(--color-accent); border-radius: 99px;"></div>
                        <div style="flex: 1; height: 6px; background: var(--color-border); border-radius: 99px;"></div>
                        <span class="text-muted" style="font-size: 0.75rem; white-space: nowrap; margin-left: 8px;">2 / 3 completado</span>
                    </div>`;
const newProg = `<div style="display: flex; gap: 8px; margin-top: 16px; align-items: center;" id="insp-progress-container">
                        <div id="insp-prog-1" style="flex: 1; height: 6px; background: var(--color-accent); border-radius: 99px;"></div>
                        <div id="insp-prog-2" style="flex: 1; height: 6px; background: var(--color-border); border-radius: 99px;"></div>
                        <div id="insp-prog-3" style="flex: 1; height: 6px; background: var(--color-border); border-radius: 99px;"></div>
                        <span id="insp-prog-text" class="text-muted" style="font-size: 0.75rem; white-space: nowrap; margin-left: 8px;">1 / 3 completado</span>
                    </div>`;
html = html.replace(oldProg, newProg);

// 5. Marbete improvements
const oldMarbete = `<div class="wallet-container">
                            <div class="wallet-card" id="marbeteCard">
                                <div class="glare" id="marbeteGlare"></div>
                                <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between;">
                                    
                                    <div style="display: flex; justify-content: center;">
                                        <div style="width: 60px; height: 60px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                            <img src="../Prototipo/Gemini_Generated_Image_pjlf84pjlf84pjlf-removebg-preview.png" style="height: 30px;">
                                        </div>
                                    </div>
                                    
                                    <div style="text-align: center;">
                                        <h3 style="font-size: 1.2rem; color: #8A8F98; letter-spacing: 2px;">2024 - 2025</h3>
                                        <div style="font-family: 'Outfit', sans-serif; font-size: 2.8rem; font-weight: 700; color: #fff; letter-spacing: 4px; margin-top: 10px; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
                                            A345678
                                        </div>
                                    </div>
                                    
                                    <div style="display: flex; justify-content: center;">
                                        <div style="background: white; padding: 12px; border-radius: 16px; width: 140px; height: 140px;">
                                            <img src="../Prototipo/QR_Marbete_1_Prueba.png" alt="QR" style="width: 100%; height: 100%;">
                                        </div>
                                    </div>
                                    
                                    <div class="wallet-validity">
                                        <div class="label">VÁLIDO HASTA</div>
                                        <div class="value">28/10/2025</div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

const newMarbete = `<div class="wallet-container">
                            <div class="wallet-card" id="marbeteCard" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); position: relative; border: 1px solid rgba(255,255,255,0.1);">
                                <div class="glare" id="marbeteGlare"></div>
                                
                                <!-- Holographic watermark -->
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; pointer-events: none;">
                                    <i class="ph ph-seal-check" style="font-size: 200px;"></i>
                                </div>

                                <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; position: relative; z-index: 2;">
                                    
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                        <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                            <img src="../Prototipo/Gemini_Generated_Image_pjlf84pjlf84pjlf-removebg-preview.png" style="height: 24px; filter: brightness(0) invert(1);">
                                        </div>
                                        <div style="background: rgba(52,211,153,0.2); color: #34d399; padding: 4px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; border: 1px solid rgba(52,211,153,0.3);">
                                            ACTIVO
                                        </div>
                                    </div>
                                    
                                    <div style="text-align: center;">
                                        <div style="color: var(--color-accent); font-weight: 600; font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px;">Inspección Técnica</div>
                                        <div style="font-family: 'Outfit', sans-serif; font-size: 3.2rem; font-weight: 700; color: #fff; letter-spacing: 4px; text-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                                            A345678
                                        </div>
                                        <div style="color: #94a3b8; font-size: 0.9rem;">Honda Civic 2022</div>
                                    </div>
                                    
                                    <div style="display: flex; justify-content: center;">
                                        <!-- Realistic QR container with scanning line effect -->
                                        <div style="background: white; padding: 12px; border-radius: 12px; width: 150px; height: 150px; position: relative; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.4);">
                                            <img src="../Prototipo/QR_Marbete_1_Prueba.png" alt="QR" style="width: 100%; height: 100%; position: relative; z-index: 1;">
                                        </div>
                                    </div>
                                    
                                    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                                        <div class="wallet-validity" style="border-top: none; padding: 0;">
                                            <div class="label" style="color: #94a3b8;">VÁLIDO HASTA</div>
                                            <div class="value" style="color: #fff; font-size: 1.2rem;">28 Oct 2025</div>
                                        </div>
                                        <i class="ph ph-car" style="font-size: 2rem; color: rgba(255,255,255,0.2);"></i>
                                    </div>
                                </div>
                            </div>
                        </div>`;
html = html.replace(oldMarbete, newMarbete);


// 6. Fix mobile nav menu to show "Menú" instead of Historial, which opens a modal or just changes view
html = html.replace(
    `<a href="#" class="nav-link nav-hide-mobile" onclick="app.navigate('historial')">
                    <i class="ph ph-clock-counter-clockwise"></i> <span>Historial</span>
                </a>`,
    `<a href="#" class="nav-link nav-hide-mobile" onclick="app.navigate('historial')">
                    <i class="ph ph-clock-counter-clockwise"></i> <span>Historial</span>
                </a>
                <!-- Mobile only Menu trigger -->
                <a href="#" class="nav-link nav-mobile-only" onclick="document.getElementById('mobile-menu').classList.toggle('active')">
                    <i class="ph ph-list"></i> <span>Menú</span>
                </a>`
);

// Add the mobile menu overlay to HTML end
const mobileMenuHTML = `
    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="mobile-menu-overlay">
        <div class="mobile-menu-content surface">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 16px; margin-bottom: 16px;">
                <h3 style="margin: 0;">Menú Principal</h3>
                <button class="btn-icon" onclick="document.getElementById('mobile-menu').classList.remove('active')"><i class="ph ph-x"></i></button>
            </div>
            
            <div class="user-profile" onclick="app.navigate('perfil'); document.getElementById('mobile-menu').classList.remove('active')" style="margin-bottom: 24px; background: var(--color-bg-body); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                <div class="avatar"><i class="ph ph-user text-muted"></i></div>
                <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 1rem; font-weight: 500;">Carlos Perez</span>
                    <span style="font-size: 0.8rem; color: var(--color-text-secondary);">carlos.perez@email.com</span>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="mobile-menu-item" onclick="app.navigate('historial'); document.getElementById('mobile-menu').classList.remove('active')"><i class="ph ph-clock-counter-clockwise"></i> Historial de Inspecciones</button>
                <button class="mobile-menu-item" onclick="app.navigate('perfil'); document.getElementById('mobile-menu').classList.remove('active')"><i class="ph ph-gear"></i> Configuración de Cuenta</button>
                <button class="mobile-menu-item" onclick="app.logout(); document.getElementById('mobile-menu').classList.remove('active')" style="color: var(--color-danger);"><i class="ph ph-sign-out"></i> Cerrar Sesión</button>
            </div>
        </div>
    </div>
`;
html = html.replace('</body>', mobileMenuHTML + '\n</body>');


// Update CSS for Mobile Menu
css += `
/* Mobile Menu */
.nav-mobile-only {
    display: none !important;
}
@media (max-width: 768px) {
    .nav-mobile-only {
        display: flex !important;
    }
}
.mobile-menu-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
    z-index: 10000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: flex-end;
}
.mobile-menu-overlay.active {
    opacity: 1;
    pointer-events: all;
}
.mobile-menu-content {
    width: 100%;
    padding: 24px;
    border-radius: 24px 24px 0 0;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-menu-overlay.active .mobile-menu-content {
    transform: translateY(0);
}
.mobile-menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 16px;
    background: transparent;
    border: none;
    color: var(--color-text-primary);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    border-radius: var(--radius-sm);
    transition: background 0.2s ease;
}
.mobile-menu-item:hover {
    background: var(--color-bg-elevated);
}
.mobile-menu-item i {
    font-size: 1.4rem;
}
`;


// 7. Add step logic to JS
js += `
// Multi-step logic
app.setStep = function(type, stepNum) {
    if(type === 'reserva') {
        document.getElementById('reserva-step-1').style.display = 'none';
        document.getElementById('reserva-step-2').style.display = 'none';
        document.getElementById('reserva-step-3').style.display = 'none';
        
        document.getElementById('reserva-pill-1').classList.remove('active-step');
        document.getElementById('reserva-pill-2').classList.remove('active-step');
        document.getElementById('reserva-pill-3').classList.remove('active-step');
        
        document.getElementById('reserva-step-' + stepNum).style.display = 'grid';
        document.getElementById('reserva-pill-' + stepNum).classList.add('active-step');
    }
    
    if(type === 'insp') {
        document.getElementById('insp-step-1').style.display = 'none';
        document.getElementById('insp-step-2').style.display = 'none';
        document.getElementById('insp-step-3').style.display = 'none';
        
        document.getElementById('insp-step-' + stepNum).style.display = 'grid';
        
        const cAccent = 'var(--color-accent)';
        const cBorder = 'var(--color-border)';
        
        document.getElementById('insp-prog-1').style.background = stepNum >= 1 ? cAccent : cBorder;
        document.getElementById('insp-prog-2').style.background = stepNum >= 2 ? cAccent : cBorder;
        document.getElementById('insp-prog-3').style.background = stepNum >= 3 ? cAccent : cBorder;
        
        document.getElementById('insp-prog-text').innerText = stepNum + ' / 3 completado';
    }
};

// Also reset steps when navigating to those views
const originalNavigate = app.navigate;
app.navigate = function(viewId) {
    if(viewId === 'reservas') app.setStep('reserva', 1);
    if(viewId === 'inspeccion') app.setStep('insp', 1);
    originalNavigate.call(app, viewId);
};
`;

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(cssPath, css, 'utf8');
fs.writeFileSync(jsPath, js, 'utf8');

console.log('✓ Master UX overhaul done');
