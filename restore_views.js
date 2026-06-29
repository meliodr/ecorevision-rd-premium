const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'Prototipo_Web', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Hide Pagos on mobile navigation (max 5 buttons)
html = html.replace(
    `<a href="javascript:void(0)" class="nav-link" onclick="app.navigate('pagos')">
                    <i class="ph ph-money"></i> <span>Pagos</span>
                </a>`,
    `<a href="javascript:void(0)" class="nav-link nav-hide-mobile" onclick="app.navigate('pagos')">
                    <i class="ph ph-money"></i> <span>Pagos</span>
                </a>`
);

// 2. Add Theme Toggle to Mobile Menu
const mobileMenuLocation = `<button class="mobile-menu-item" onclick="app.navigate('historial'); document.getElementById('mobile-menu').classList.remove('active')"><i class="ph ph-clock-counter-clockwise"></i> Historial de Inspecciones</button>`;
const withThemeToggle = `
                <button class="mobile-menu-item" onclick="document.getElementById('themeToggle').click(); document.getElementById('mobile-menu').classList.remove('active')"><i class="ph ph-paint-brush"></i> Cambiar Tema</button>
                <button class="mobile-menu-item" onclick="app.navigate('pagos'); document.getElementById('mobile-menu').classList.remove('active')"><i class="ph ph-money"></i> Pagos</button>
                ` + mobileMenuLocation;
html = html.replace(mobileMenuLocation, withThemeToggle);

// 3. Restore Dashboard, Reservas, and Inspeccion properly
// We currently have a broken <section id="dashboard"> that contains the Inspeccion UI.
// Let's rip it out and replace it with the correct sequence.
const startMarker = '<section id="dashboard" class="view">';
const endMarker = '<!-- Marbete View -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const replacement = `
            <!-- Dashboard View -->
            <section id="dashboard" class="view">
                <header class="view-header">
                    <div class="breadcrumbs">Inicio <span>/</span> Resumen</div>
                    <h2 class="page-title text-gradient">Dashboard</h2>
                    <p class="text-muted">Control total sobre el estado de tus vehículos.</p>
                    <div class="status-pill">
                        <i class="ph ph-check-circle"></i> Sistemas Operativos Conectados
                    </div>
                </header>

                <div class="bento-grid">
                    <!-- Stats - Redesigned with gradient accent cards -->
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
                    </div>

                    <!-- Vehiculos Principales -->
                    <div class="bento-item surface span-8">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 12px;">
                            <h3>Mi Flota de Vehículos</h3>
                            <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="app.addVehicle()"><i class="ph ph-plus"></i> Añadir</button>
                        </div>
                        
                        <div class="vehicle-list">
                            <div class="vehicle-item">
                                <div class="v-info" style="align-items: center; gap: 16px;">
                                    <div class="v-image" style="width: 80px; height: 50px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                        <img src="../Prototipo/Honda_Civic.png" alt="Honda Civic 2022" style="width: 100%; height: 100%; object-fit: contain;">
                                    </div>
                                    <div class="v-details">
                                        <h4>Honda Civic 2022</h4>
                                        <p>A345678 • Renovado</p>
                                    </div>
                                </div>
                                <span class="status-badge success">Aprobado</span>
                            </div>
                            <div class="vehicle-item">
                                <div class="v-info" style="align-items: center; gap: 16px;">
                                    <div class="v-image" style="width: 80px; height: 50px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                        <img src="https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=150" alt="Toyota Hilux 2019" style="width: 100%; height: 100%; object-fit: cover;">
                                    </div>
                                    <div class="v-details">
                                        <h4>Toyota Hilux 2019</h4>
                                        <p>L987654 • Requiere Inspección</p>
                                    </div>
                                </div>
                                <span class="status-badge warning">Pendiente</span>
                            </div>
                        </div>
                    </div>

                    <!-- Acciones Rapidas -->
                    <div class="bento-item surface span-4">
                        <h3 style="border-bottom: 1px solid var(--color-border); padding-bottom: 12px;">Acciones Rápidas</h3>
                        <div class="quick-actions">
                            <div class="qa-card" onclick="app.navigate('reservas')">
                                <i class="ph ph-calendar-plus"></i>
                                <div style="font-size: 0.8rem; font-weight: 500;">Cita Previa</div>
                            </div>
                            <div class="qa-card" onclick="app.navigate('inspeccion')">
                                <i class="ph ph-magnifying-glass"></i>
                                <div style="font-size: 0.8rem; font-weight: 500;">Inspección</div>
                            </div>
                            <div class="qa-card" onclick="app.navigate('marbete')">
                                <i class="ph ph-certificate"></i>
                                <div style="font-size: 0.8rem; font-weight: 500;">Marbete</div>
                            </div>
                            <div class="qa-card" style="background: var(--color-accent); color: #fff; border: none;" onclick="app.navigate('pagos')">
                                <i class="ph ph-credit-card" style="font-size: 28px; margin-bottom: 8px;"></i>
                                <div style="font-size: 0.8rem; font-weight: 500;">Pagos</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Reservas View -->
            <section id="reservas" class="view">
                <header class="view-header">
                    <div class="breadcrumbs">Inicio <span>/</span> Agendar Cita</div>
                    <h2 class="page-title text-gradient">Agendar Inspección</h2>
                    <p class="text-muted">Selecciona un taller certificado y coordina tu visita.</p>
                    <div style="display: flex; gap: 8px; margin-top: 20px; flex-wrap: wrap;" id="reserva-steps-header">
                        <div class="step-pill active-step" id="reserva-pill-1"><span>1</span> Taller</div>
                        <div class="step-pill" id="reserva-pill-2"><span>2</span> Fecha</div>
                        <div class="step-pill" id="reserva-pill-3"><span>3</span> Confirmar</div>
                    </div>
                </header>

                <div class="bento-grid">
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
                </div>
            </section>

            <!-- Inspección View -->
            <section id="inspeccion" class="view">
                <header class="view-header">
                    <div class="breadcrumbs">Inicio <span>/</span> Módulo Inspector</div>
                    <h2 class="page-title text-gradient">Captura de Inspección</h2>
                    <p class="text-muted">Vista técnica para el inspector certificado.</p>
                    <div style="display: flex; gap: 8px; margin-top: 16px; align-items: center;" id="insp-progress-container">
                        <div id="insp-prog-1" style="flex: 1; height: 6px; background: var(--color-accent); border-radius: 99px;"></div>
                        <div id="insp-prog-2" style="flex: 1; height: 6px; background: var(--color-border); border-radius: 99px;"></div>
                        <div id="insp-prog-3" style="flex: 1; height: 6px; background: var(--color-border); border-radius: 99px;"></div>
                        <span id="insp-prog-text" class="text-muted" style="font-size: 0.75rem; white-space: nowrap; margin-left: 8px;">1 / 3 completado</span>
                    </div>
                </header>

                <div class="bento-grid">
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

            <!-- Marbete View -->
`;
    html = html.substring(0, startIndex) + replacement + html.substring(endIndex + endMarker.length);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✓ Restored missing dashboard and limited nav buttons');
