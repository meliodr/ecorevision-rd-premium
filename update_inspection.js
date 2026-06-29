const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Prototipo_Web', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const oldHtml = `                    <div class="bento-item surface span-12">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 16px; margin-bottom: 24px;">
                            <div>
                                <h3>Toyota Hilux 2019</h3>
                                <p class="text-muted">Chasis: JTEKT8284849202 • Placa: L987654</p>
                            </div>
                            <div class="status-pill" style="background: rgba(255,255,255,0.1); border-color: var(--color-border); color: #fff;">
                                ID Inspección: #INSP-84729
                            </div>
                        </div>

                        <div class="bento-grid">
                            <div class="span-6">
                                <h4 style="margin-bottom: 12px; color: var(--color-accent);">1. Emisiones de Gases</h4>
                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    <label style="display: flex; gap: 8px;"><input type="checkbox" checked> CO dentro de parámetros normales</label>
                                    <label style="display: flex; gap: 8px;"><input type="checkbox" checked> HC dentro de parámetros normales</label>
                                    <label style="display: flex; gap: 8px;"><input type="checkbox"> Fuga en sistema de escape detectada</label>
                                </div>
                            </div>
                            <div class="span-6">
                                <h4 style="margin-bottom: 12px; color: var(--color-accent);">2. Sistema de Frenos</h4>
                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    <label style="display: flex; gap: 8px;"><input type="checkbox" checked> Eficacia de frenado superior al 50%</label>
                                    <label style="display: flex; gap: 8px;"><input type="checkbox" checked> Desequilibrio menor al 30%</label>
                                    <label style="display: flex; gap: 8px;"><input type="checkbox"> Freno de estacionamiento defectuoso</label>
                                </div>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 24px; margin-top: 32px;">
                            <div style="display: flex; gap: 16px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="radio" name="res" checked> <span class="status-badge success">Aprobado</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="radio" name="res"> <span class="status-badge warning">Condicionado</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="radio" name="res"> <span class="status-badge" style="background: rgba(248,113,113,0.15); color: var(--color-danger);">Rechazado</span>
                                </label>
                            </div>
                            <div style="display: flex; gap: 16px;">
                                <button class="btn-secondary" onclick="app.navigate('dashboard')">Cancelar</button>
                                <button class="btn-primary" onclick="app.navigate('dashboard')">Firmar y Emitir</button>
                            </div>
                        </div>
                    </div>`;

const newHtml = `                    <!-- Cabecera del Vehiculo (Span 12) -->
                    <div class="bento-item surface span-12" style="display: flex; gap: 24px; align-items: center;">
                        <div class="v-image" style="width: 120px; height: 80px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); flex-shrink: 0;">
                            <img src="https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=200" alt="Toyota Hilux 2019" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="flex: 1;">
                            <h3>Toyota Hilux 2019</h3>
                            <p class="text-muted">Chasis: JTEKT8284849202 • Placa: L987654</p>
                        </div>
                        <div class="status-badge warning" style="font-size: 0.9rem; padding: 8px 16px;">
                            ID Inspección: #INSP-84729
                        </div>
                    </div>

                    <!-- Emisiones de Gases (Span 6) -->
                    <div class="bento-item surface span-6">
                        <h4 style="margin-bottom: 20px; color: var(--color-accent); display: flex; align-items: center; gap: 8px;"><i class="ph ph-wind"></i> 1. Emisiones de Gases</h4>
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <label class="custom-toggle">
                                <span class="toggle-text">CO dentro de parámetros normales</span>
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                            <label class="custom-toggle">
                                <span class="toggle-text">HC dentro de parámetros normales</span>
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                            <label class="custom-toggle">
                                <span class="toggle-text">Fuga en sistema de escape detectada</span>
                                <input type="checkbox">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    <!-- Sistema de Frenos (Span 6) -->
                    <div class="bento-item surface span-6">
                        <h4 style="margin-bottom: 20px; color: var(--color-accent); display: flex; align-items: center; gap: 8px;"><i class="ph ph-car"></i> 2. Sistema de Frenos</h4>
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <label class="custom-toggle">
                                <span class="toggle-text">Eficacia de frenado superior al 50%</span>
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                            <label class="custom-toggle">
                                <span class="toggle-text">Desequilibrio menor al 30%</span>
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                            <label class="custom-toggle">
                                <span class="toggle-text">Freno de estacionamiento defectuoso</span>
                                <input type="checkbox">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    <!-- Panel de Decisión y Firma (Span 12) -->
                    <div class="bento-item surface span-12" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                        
                        <div class="segmented-control">
                            <input type="radio" name="res" id="res-aprobado" checked>
                            <label for="res-aprobado" class="seg-aprobado"><i class="ph ph-check-circle"></i> Aprobado</label>
                            
                            <input type="radio" name="res" id="res-condicionado">
                            <label for="res-condicionado" class="seg-condicionado"><i class="ph ph-warning-circle"></i> Condicionado</label>
                            
                            <input type="radio" name="res" id="res-rechazado">
                            <label for="res-rechazado" class="seg-rechazado"><i class="ph ph-x-circle"></i> Rechazado</label>
                        </div>

                        <div style="display: flex; gap: 16px;">
                            <button class="btn-secondary" onclick="app.navigate('dashboard')">Cancelar</button>
                            <button class="btn-primary" onclick="app.showToast('Inspección firmada digitalmente', 'success'); app.navigate('dashboard')">Firmar y Emitir</button>
                        </div>
                    </div>`;

if (html.includes(oldHtml)) {
    html = html.replace(oldHtml, newHtml);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Update Complete');
} else {
    console.log('Old HTML not found. Trying regex or fallback...');
    // regex fallback or just log error
}
