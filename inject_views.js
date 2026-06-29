const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Prototipo_Web', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// ───────────── 1. Add nav links for Historial and Pagos in sidebar ─────────────
html = html.replace(
    '<a href="#" class="nav-link" onclick="app.navigate(\'marbete\')">\n                    <i class="ph ph-certificate"></i> <span>Marbete Digital</span>\n                </a>',
    `<a href="#" class="nav-link" onclick="app.navigate('marbete')">
                    <i class="ph ph-certificate"></i> <span>Marbete Digital</span>
                </a>
                <a href="#" class="nav-link" onclick="app.navigate('pagos')">
                    <i class="ph ph-money"></i> <span>Pagos</span>
                </a>
                <a href="#" class="nav-link" onclick="app.navigate('historial')">
                    <i class="ph ph-clock-counter-clockwise"></i> <span>Historial</span>
                </a>`
);

// ───────────── 2. Add "Crear Cuenta" link on login screen ─────────────
html = html.replace(
    '<a href="#" onclick="app.navigate(\'forgot-password\')" class="text-muted" style="font-size: 0.9rem; text-decoration: none;">¿Olvidaste tu contraseña?</a>',
    `<a href="#" onclick="app.navigate('forgot-password')" class="text-muted" style="font-size: 0.9rem; text-decoration: none;">¿Olvidaste tu contraseña?</a>
                    <a href="#" onclick="app.navigate('registro')" class="text-muted" style="font-size: 0.9rem; text-decoration: none; display: block; margin-top: 8px;"><i class="ph ph-user-plus"></i> Crear cuenta nueva</a>`
);

// ───────────── 3. Insert three missing views before </main> ─────────────
const newViews = `
            <!-- REGISTRO (CU-01) -->
            <section id="registro" class="view">
                <header class="view-header">
                    <div class="breadcrumbs">Inicio <span>/</span> Crear Cuenta</div>
                    <h2 class="page-title text-gradient">Registro de Usuario</h2>
                    <p class="text-muted">Crea tu cuenta para acceder al sistema EcoRevisión RD.</p>
                </header>
                <div class="bento-grid">
                    <div class="bento-item surface span-12">
                        <h3 style="border-bottom: 1px solid var(--color-border); padding-bottom: 12px; margin-bottom: 24px;"><i class="ph ph-user-plus" style="color: var(--color-accent);"></i> Información Personal</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                            <div class="form-group"><label>Nombre Completo</label><input type="text" class="input-modern" placeholder="Ej. Carlos Perez"></div>
                            <div class="form-group"><label>Cédula / Pasaporte</label><input type="text" class="input-modern" placeholder="000-0000000-0"></div>
                            <div class="form-group"><label>Correo Electrónico</label><input type="email" class="input-modern" placeholder="correo@email.com"></div>
                            <div class="form-group"><label>Teléfono</label><input type="tel" class="input-modern" placeholder="809-555-0000"></div>
                            <div class="form-group"><label>Contraseña</label><input type="password" class="input-modern" placeholder="Mínimo 8 caracteres"></div>
                            <div class="form-group"><label>Confirmar Contraseña</label><input type="password" class="input-modern" placeholder="Repetir contraseña"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--color-border);">
                            <a href="#" onclick="app.navigate('login')" class="text-muted" style="font-size: 0.9rem; text-decoration: none;"><i class="ph ph-arrow-left"></i> Ya tengo cuenta</a>
                            <button class="btn-primary" onclick="app.showToast('Cuenta creada. Bienvenido a EcoRevisión!', 'success'); app.navigate('dashboard');"><i class="ph ph-check-circle"></i> Crear Cuenta</button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- PAGOS (CU-11 / CU-12) -->
            <section id="pagos" class="view">
                <header class="view-header">
                    <div class="breadcrumbs">Inicio <span>/</span> Pagos</div>
                    <h2 class="page-title text-gradient">Módulo de Pagos</h2>
                    <p class="text-muted">Gestiona pagos de inspección, marbetes y servicios adicionales.</p>
                </header>
                <div class="bento-grid">
                    <div class="bento-item surface span-4">
                        <div class="stat-mini"><div style="flex:1;"><div class="stat-label">Total Pagado (2024)</div><div class="stat-value" style="color:var(--color-success);">RD$4,500</div><div style="margin-top:10px;height:4px;background:var(--color-border);border-radius:99px;overflow:hidden;"><div style="width:75%;height:100%;background:var(--color-success);border-radius:99px;"></div></div></div><div class="stat-mini-icon" style="color:var(--color-success);background:rgba(52,211,153,0.1);"><i class="ph ph-money"></i></div></div>
                    </div>
                    <div class="bento-item surface span-4">
                        <div class="stat-mini"><div style="flex:1;"><div class="stat-label">Pagos Pendientes</div><div class="stat-value" style="color:var(--color-warning);">1</div><div style="margin-top:10px;height:4px;background:var(--color-border);border-radius:99px;overflow:hidden;"><div style="width:33%;height:100%;background:var(--color-warning);border-radius:99px;"></div></div></div><div class="stat-mini-icon" style="color:var(--color-warning);background:rgba(251,191,36,0.1);"><i class="ph ph-clock"></i></div></div>
                    </div>
                    <div class="bento-item surface span-4">
                        <div class="stat-mini"><div style="flex:1;"><div class="stat-label">Próximo Vencimiento</div><div class="stat-value" style="font-size:1.4rem;color:var(--color-danger);">15 Jul</div></div><div class="stat-mini-icon" style="color:var(--color-danger);background:rgba(248,113,113,0.1);"><i class="ph ph-calendar-x"></i></div></div>
                    </div>
                    <div class="bento-item surface span-6">
                        <h3 style="margin-bottom:20px;"><i class="ph ph-plus-circle" style="color:var(--color-accent);"></i> Nuevo Pago</h3>
                        <div class="form-group"><label>Servicio</label><select class="input-modern"><option>Inspección Técnica Vehicular — RD$1,500</option><option>Renovación de Marbete — RD$800</option><option>Multa por Vencimiento — RD$2,200</option></select></div>
                        <div class="form-group"><label>Vehículo</label><select class="input-modern"><option>Honda Civic 2022 — A345678</option><option>Toyota Hilux 2019 — L987654</option></select></div>
                        <div class="form-group"><label>Método de Pago</label><select class="input-modern"><option>Tarjeta de Crédito/Débito</option><option>Transferencia Bancaria</option><option>Efectivo en Taller</option></select></div>
                        <div style="background:var(--color-bg-body);border:1px solid var(--color-border);border-radius:var(--radius-sm);padding:16px;margin-bottom:20px;">
                            <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="text-muted">Subtotal</span><span>RD$1,500.00</span></div>
                            <div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span class="text-muted">ITBIS (18%)</span><span>RD$270.00</span></div>
                            <div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.1rem;border-top:1px solid var(--color-border);padding-top:8px;margin-top:8px;"><span>Total</span><span style="color:var(--color-accent);">RD$1,770.00</span></div>
                        </div>
                        <button class="btn-primary" style="width:100%;" onclick="app.showToast('Pago procesado. Recibo enviado al correo.', 'success');"><i class="ph ph-lock"></i> Procesar Pago Seguro</button>
                    </div>
                    <div class="bento-item surface span-6">
                        <h3 style="margin-bottom:20px;"><i class="ph ph-clock-counter-clockwise" style="color:var(--color-accent);"></i> Historial de Pagos</h3>
                        <div style="display:flex;flex-direction:column;gap:12px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--color-bg-body);border-radius:var(--radius-sm);border:1px solid var(--color-border);">
                                <div><div style="font-weight:600;">Inspección ITV — Civic</div><div class="text-muted" style="font-size:0.8rem;">15 Jun 2024</div></div>
                                <div style="text-align:right;"><div style="font-weight:700;color:var(--color-success);">RD$1,770</div><span class="status-badge success">Pagado</span></div>
                            </div>
                            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--color-bg-body);border-radius:var(--radius-sm);border:1px solid var(--color-border);">
                                <div><div style="font-weight:600;">Renovación Marbete — Civic</div><div class="text-muted" style="font-size:0.8rem;">10 Ene 2024</div></div>
                                <div style="text-align:right;"><div style="font-weight:700;color:var(--color-success);">RD$944</div><span class="status-badge success">Pagado</span></div>
                            </div>
                            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(251,191,36,0.05);border-radius:var(--radius-sm);border:1px solid rgba(251,191,36,0.2);">
                                <div><div style="font-weight:600;">Inspección ITV — Hilux</div><div class="text-muted" style="font-size:0.8rem;">Pendiente de pago</div></div>
                                <div style="text-align:right;"><div style="font-weight:700;color:var(--color-warning);">RD$1,770</div><span class="status-badge warning">Pendiente</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- HISTORIAL (CU-10) -->
            <section id="historial" class="view">
                <header class="view-header">
                    <div class="breadcrumbs">Inicio <span>/</span> Historial</div>
                    <h2 class="page-title text-gradient">Historial de Inspecciones</h2>
                    <p class="text-muted">Consulta el historial técnico completo de tus vehículos.</p>
                </header>
                <div class="bento-grid">
                    <div class="bento-item surface span-12">
                        <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-end;">
                            <div class="form-group" style="flex:1;min-width:180px;margin-bottom:0;"><label>Placa / VIN</label><input type="text" class="input-modern" placeholder="Ej. A345678"></div>
                            <div class="form-group" style="flex:1;min-width:160px;margin-bottom:0;"><label>Vehículo</label><select class="input-modern"><option>Todos</option><option>Honda Civic 2022</option><option>Toyota Hilux 2019</option></select></div>
                            <div class="form-group" style="flex:1;min-width:140px;margin-bottom:0;"><label>Desde</label><input type="date" class="input-modern" value="2023-01-01"></div>
                            <div class="form-group" style="flex:1;min-width:140px;margin-bottom:0;"><label>Hasta</label><input type="date" class="input-modern" value="2024-12-31"></div>
                            <button class="btn-primary" style="height:50px;margin-bottom:0;"><i class="ph ph-magnifying-glass"></i> Buscar</button>
                        </div>
                    </div>
                    <div class="bento-item surface span-12">
                        <h3 style="margin-bottom:20px;">Resultados</h3>
                        <div style="display:flex;flex-direction:column;gap:16px;">
                            <div style="border:1px solid var(--color-border);border-radius:var(--radius-md);overflow:hidden;">
                                <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:var(--color-bg-elevated);">
                                    <div style="display:flex;gap:16px;align-items:center;">
                                        <div style="width:64px;height:40px;border-radius:6px;overflow:hidden;background:var(--color-bg-body);"><img src="../Prototipo/Honda_Civic.png" style="width:100%;height:100%;object-fit:contain;"></div>
                                        <div><div style="font-weight:600;">Honda Civic 2022 — A345678</div><div class="text-muted" style="font-size:0.8rem;">15 Jun 2024 • AutoCentro Nacional</div></div>
                                    </div>
                                    <span class="status-badge success">APROBADO</span>
                                </div>
                                <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;border-top:1px solid var(--color-border);">
                                    <div style="padding:12px 20px;border-right:1px solid var(--color-border);"><div class="text-muted" style="font-size:0.75rem;">Inspector</div><div style="font-weight:500;">Ing. J. Rodríguez</div></div>
                                    <div style="padding:12px 20px;border-right:1px solid var(--color-border);"><div class="text-muted" style="font-size:0.75rem;">Emisiones CO</div><div style="font-weight:500;color:var(--color-success);">0.24% ✓</div></div>
                                    <div style="padding:12px 20px;border-right:1px solid var(--color-border);"><div class="text-muted" style="font-size:0.75rem;">Frenos</div><div style="font-weight:500;color:var(--color-success);">82% ✓</div></div>
                                    <div style="padding:12px 20px;"><div class="text-muted" style="font-size:0.75rem;">Próx. Insp.</div><div style="font-weight:500;">Jun 2025</div></div>
                                </div>
                            </div>
                            <div style="border:1px solid rgba(251,191,36,0.3);border-radius:var(--radius-md);overflow:hidden;">
                                <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:rgba(251,191,36,0.05);">
                                    <div style="display:flex;gap:16px;align-items:center;">
                                        <div style="width:64px;height:40px;border-radius:6px;overflow:hidden;"><img src="https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=150" style="width:100%;height:100%;object-fit:cover;"></div>
                                        <div><div style="font-weight:600;">Toyota Hilux 2019 — L987654</div><div class="text-muted" style="font-size:0.8rem;">Sin inspección registrada</div></div>
                                    </div>
                                    <span class="status-badge warning">PENDIENTE</span>
                                </div>
                                <div style="padding:12px 20px;border-top:1px solid var(--color-border);color:var(--color-text-secondary);font-size:0.85rem;"><i class="ph ph-warning" style="color:var(--color-warning);"></i> Sin inspecciones. <a href="#" onclick="app.navigate('reservas')" style="color:var(--color-accent);text-decoration:none;">Agendar ahora →</a></div>
                            </div>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;padding-top:16px;border-top:1px solid var(--color-border);">
                            <span class="text-muted" style="font-size:0.85rem;">2 registros encontrados</span>
                            <button class="btn-secondary" style="padding:8px 16px;font-size:0.85rem;"><i class="ph ph-download-simple"></i> Descargar Informe</button>
                        </div>
                    </div>
                </div>
            </section>
`;

// Insert before </main>
html = html.replace('        </main>', newViews + '\n        </main>');

fs.writeFileSync(filePath, html, 'utf8');
console.log('All views injected successfully');
