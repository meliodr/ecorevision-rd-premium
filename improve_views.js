const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'Prototipo_Web', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// ── IMPROVE RESERVAS: add taller card, date picker row, map placeholder ──
const oldReservasBento = `                <div class="bento-grid">
                    <div class="bento-item surface span-4">
                        <h3>Filtros de Búsqueda</h3>
                        <div style="margin-top: 16px;">
                            <div class="form-group">
                                <label>Provincia</label>
                                <select class="input-modern">
                                    <option>Distrito Nacional</option>
                                    <option>Santo Domingo</option>
                                    <option>Santiago</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Vehículo a Inspeccionar</label>
                                <select class="input-modern">
                                    <option>Toyota Hilux 2019 (L987654)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bento-item surface span-8">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
                            <div>
                                <h3>AutoCentro Nacional - Naco</h3>
                                <p class="text-muted" style="font-size: 0.9rem;">Av. Tiradentes #45, D.N.</p>
                            </div>
                            <span class="status-badge warning" style="font-size: 0.9rem;"><i class="ph ph-star"></i> 4.8 Excelente</span>
                        </div>
                        
                        <p class="text-muted" style="margin-bottom: 8px; font-size: 0.9rem;">Horarios Disponibles (Hoy):</p>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px;">
                            <button class="btn-secondary" style="padding: 8px 16px;">09:00 AM</button>
                            <button class="btn-secondary" style="padding: 8px 16px; border-color: var(--color-accent); color: var(--color-accent);">10:30 AM</button>
                            <button class="btn-secondary" style="padding: 8px 16px; opacity: 0.5; cursor: not-allowed;">02:00 PM</button>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 24px;">
                            <div>
                                <span class="text-muted" style="font-size: 0.85rem;">Tarifa Base</span>
                                <h3 style="color: var(--color-success);">RD$ 1,500.00</h3>
                            </div>
                            <div style="display: flex; gap: 16px;">
                                <button class="btn-secondary" onclick="app.navigate('dashboard')">Cancelar</button>
                                <button class="btn-primary" onclick="app.showToast('Cita Confirmada Exitosamente', 'success'); app.navigate('dashboard');">Confirmar Cita</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;

const newReservasBento = `                <div class="bento-grid">
                    <!-- Filtros -->
                    <div class="bento-item surface span-4">
                        <h3 style="margin-bottom: 16px; display: flex; align-items: center; gap: 8px;"><i class="ph ph-funnel" style="color: var(--color-accent);"></i> Filtros</h3>
                        <div class="form-group">
                            <label>Provincia</label>
                            <select class="input-modern">
                                <option>Distrito Nacional</option>
                                <option>Santo Domingo</option>
                                <option>Santiago</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Vehículo</label>
                            <select class="input-modern">
                                <option>Toyota Hilux 2019 (L987654)</option>
                                <option>Honda Civic 2022 (A345678)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Fecha Preferida</label>
                            <input type="date" class="input-modern" value="2024-07-15">
                        </div>
                        <!-- Taller disponible cards -->
                        <p class="text-muted" style="font-size: 0.8rem; margin-bottom: 10px; margin-top: 8px;">Talleres Disponibles</p>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="padding: 10px 12px; border: 2px solid var(--color-accent); border-radius: var(--radius-sm); cursor: pointer; background: rgba(232,99,10,0.06);">
                                <div style="font-weight: 600; font-size: 0.9rem;">AutoCentro Nacional</div>
                                <div class="text-muted" style="font-size: 0.75rem;">Naco, D.N. · 2.1 km</div>
                            </div>
                            <div style="padding: 10px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer;">
                                <div style="font-weight: 600; font-size: 0.9rem;">ITV Centro Sur</div>
                                <div class="text-muted" style="font-size: 0.75rem;">Herrera · 5.4 km</div>
                            </div>
                        </div>
                    </div>

                    <!-- Detalles del taller -->
                    <div class="bento-item surface span-8">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                            <div>
                                <h3>AutoCentro Nacional — Naco</h3>
                                <p class="text-muted" style="font-size: 0.9rem; margin-top: 4px;"><i class="ph ph-map-pin"></i> Av. Tiradentes #45, Naco, Distrito Nacional</p>
                            </div>
                            <span class="status-badge success" style="font-size: 0.85rem; padding: 8px 14px;"><i class="ph ph-star"></i> 4.8 Excelente</span>
                        </div>

                        <!-- Quick info row -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 24px;">
                            <div style="text-align: center; padding: 12px; background: var(--color-bg-body); border-radius: var(--radius-sm);">
                                <i class="ph ph-clock" style="color: var(--color-accent); font-size: 1.3rem;"></i>
                                <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px;">Horario</div>
                                <div style="font-size: 0.85rem; font-weight: 600;">8AM – 5PM</div>
                            </div>
                            <div style="text-align: center; padding: 12px; background: var(--color-bg-body); border-radius: var(--radius-sm);">
                                <i class="ph ph-phone" style="color: var(--color-accent); font-size: 1.3rem;"></i>
                                <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px;">Teléfono</div>
                                <div style="font-size: 0.85rem; font-weight: 600;">809-333-4444</div>
                            </div>
                            <div style="text-align: center; padding: 12px; background: var(--color-bg-body); border-radius: var(--radius-sm);">
                                <i class="ph ph-check-circle" style="color: var(--color-success); font-size: 1.3rem;"></i>
                                <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px;">Estado</div>
                                <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-success);">Autorizado</div>
                            </div>
                        </div>

                        <p class="text-muted" style="margin-bottom: 10px; font-size: 0.9rem; font-weight: 500;">Horarios Disponibles — Lunes 15 Jul 2024</p>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px;">
                            <button class="time-slot-btn">08:00 AM</button>
                            <button class="time-slot-btn">09:00 AM</button>
                            <button class="time-slot-btn active-slot">10:30 AM ✓</button>
                            <button class="time-slot-btn">11:00 AM</button>
                            <button class="time-slot-btn" disabled>02:00 PM</button>
                            <button class="time-slot-btn">03:30 PM</button>
                            <button class="time-slot-btn" disabled>04:00 PM</button>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 20px; flex-wrap: wrap; gap: 16px;">
                            <div>
                                <span class="text-muted" style="font-size: 0.85rem;">Tarifa Inspección ITV</span>
                                <h3 style="color: var(--color-success);">RD$1,500.00</h3>
                                <span class="text-muted" style="font-size: 0.75rem;">+ ITBIS (RD$270)</span>
                            </div>
                            <div style="display: flex; gap: 12px;">
                                <button class="btn-secondary" onclick="app.navigate('dashboard')">Cancelar</button>
                                <button class="btn-primary" onclick="app.showToast('¡Cita confirmada! Recibirás un recordatorio.', 'success'); app.navigate('dashboard');">
                                    <i class="ph ph-calendar-check"></i> Confirmar Cita
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;

html = html.replace(oldReservasBento, newReservasBento);

// ── IMPROVE INSPECCION: add progress indicator ──
const oldInspeccionHeader = `            <!-- Inspección View -->
            <section id="inspeccion" class="view">
                <header class="view-header">
                    <div class="breadcrumbs">Inicio <span>/</span> Módulo Inspector</div>
                    <h2 class="page-title text-gradient">Captura de Inspección</h2>
                    <p class="text-muted">Vista técnica para el inspector certificado.</p>
                </header>`;

const newInspeccionHeader = `            <!-- Inspección View -->
            <section id="inspeccion" class="view">
                <header class="view-header">
                    <div class="breadcrumbs">Inicio <span>/</span> Módulo Inspector</div>
                    <h2 class="page-title text-gradient">Captura de Inspección</h2>
                    <p class="text-muted">Vista técnica para el inspector certificado.</p>
                    <div style="display: flex; gap: 8px; margin-top: 16px; align-items: center;">
                        <div style="flex: 1; height: 6px; background: var(--color-accent); border-radius: 99px;"></div>
                        <div style="flex: 1; height: 6px; background: var(--color-accent); border-radius: 99px;"></div>
                        <div style="flex: 1; height: 6px; background: var(--color-border); border-radius: 99px;"></div>
                        <span class="text-muted" style="font-size: 0.75rem; white-space: nowrap; margin-left: 8px;">2 / 3 completado</span>
                    </div>
                </header>`;

html = html.replace(oldInspeccionHeader, newInspeccionHeader);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✓ Reservas and Inspeccion redesigned');
