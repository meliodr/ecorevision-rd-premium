const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'Prototipo_Web', 'index.html');
const cssPath = path.join(__dirname, 'Prototipo_Web', 'styles.css');
const jsPath = path.join(__dirname, 'Prototipo_Web', 'script.js');

// --- 1. HTML ---
let html = fs.readFileSync(htmlPath, 'utf8');
const modalHtml = `
    <!-- Add Vehicle Modal -->
    <div id="add-vehicle-modal" class="modal-overlay">
        <div class="modal-content surface">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 16px; margin-bottom: 16px;">
                <h3 style="margin: 0; display: flex; align-items: center; gap: 8px;"><i class="ph ph-car"></i> Añadir Vehículo</h3>
                <button class="btn-icon" onclick="app.closeVehicleModal()" style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: var(--color-bg-body); border-radius: 50%;"><i class="ph ph-x"></i></button>
            </div>
            
            <div class="form-group">
                <label>Marca</label>
                <input type="text" id="modal-veh-marca" class="input-modern" placeholder="Ej. Toyota">
            </div>
            <div class="form-group">
                <label>Modelo</label>
                <input type="text" id="modal-veh-modelo" class="input-modern" placeholder="Ej. Corolla 2021">
            </div>
            <div class="form-group">
                <label>Placa</label>
                <input type="text" id="modal-veh-placa" class="input-modern" placeholder="Ej. A123456" style="text-transform: uppercase;">
            </div>
            
            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; border-top: 1px solid var(--color-border); padding-top: 16px;">
                <button class="btn-secondary" onclick="app.closeVehicleModal()">Cancelar</button>
                <button class="btn-primary" onclick="app.submitVehicleForm(this, 'Añadiendo...')">Guardar Vehículo</button>
            </div>
        </div>
    </div>
</body>`;
html = html.replace('</body>', modalHtml);
fs.writeFileSync(htmlPath, html, 'utf8');

// --- 2. CSS ---
let css = fs.readFileSync(cssPath, 'utf8');
const modalCss = `
/* ================================================
   MODAL COMPONENT
   ================================================ */
.modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}
.modal-overlay.active {
    opacity: 1;
    pointer-events: auto;
}
.modal-content {
    width: 90%;
    max-width: 400px;
    background: var(--color-bg-surface);
    border-radius: var(--radius-lg);
    padding: 24px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.3);
    transform: translateY(20px) scale(0.95);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1px solid var(--color-border);
}
.modal-overlay.active .modal-content {
    transform: translateY(0) scale(1);
}
`;
fs.writeFileSync(cssPath, css + '\\n' + modalCss, 'utf8');

// --- 3. JS ---
let js = fs.readFileSync(jsPath, 'utf8');
const jsReplacement = `
    addVehicle: function() {
        const modal = document.getElementById('add-vehicle-modal');
        if (modal) {
            document.getElementById('modal-veh-marca').value = '';
            document.getElementById('modal-veh-modelo').value = '';
            document.getElementById('modal-veh-placa').value = '';
            modal.classList.add('active');
        }
    },

    closeVehicleModal: function() {
        const modal = document.getElementById('add-vehicle-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    },

    submitVehicleForm: function(btn, processText) {
        const marca = document.getElementById('modal-veh-marca').value.trim();
        const modelo = document.getElementById('modal-veh-modelo').value.trim();
        const placa = document.getElementById('modal-veh-placa').value.trim().toUpperCase();
        
        if (!marca || !modelo || !placa) {
            app.showToast('Por favor, completa todos los campos', 'error');
            return;
        }

        const originalHtml = btn.innerHTML;
        const currentWidth = btn.offsetWidth;
        btn.style.width = currentWidth + 'px';
        btn.innerHTML = \`<i class="ph ph-spinner" style="animation: spin 1s linear infinite;"></i> \${processText}\`;
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.width = '';
            btn.disabled = false;
            
            // Append to list
            const list = document.querySelector('.vehicle-list');
            if (list) {
                const newVehicleHtml = \`
                    <div class="vehicle-item" style="animation: fade-in 0.5s ease-out forwards; opacity: 0; transform: translateY(10px);">
                        <div class="v-info" style="align-items: center; gap: 16px;">
                            <div class="v-image" style="width: 80px; height: 50px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background: var(--color-bg-elevated); display: flex; align-items: center; justify-content: center;">
                                <i class="ph ph-car-profile" style="font-size: 24px; color: var(--color-text-muted);"></i>
                            </div>
                            <div class="v-details">
                                <h4>\${marca} \${modelo}</h4>
                                <p>\${placa} • Recién Añadido</p>
                            </div>
                        </div>
                        <span class="status-badge" style="background: rgba(255,255,255,0.1);">En Proceso</span>
                    </div>
                \`;
                list.insertAdjacentHTML('beforeend', newVehicleHtml);
            }
            
            app.closeVehicleModal();
            app.showToast('Vehículo añadido correctamente', 'success');
        }, 800);
    },
`;

js = js.replace(/addVehicle:\s*function\(\)\s*\{[\s\S]*?list\.insertAdjacentHTML[\s\S]*?\},/g, jsReplacement);
// Wait, the regex might be tricky. Let's just use a string replacement for the exact block.
// Or replace from "addVehicle:" up to the next comma/function.
const oldAddVehicleStart = js.indexOf('addVehicle: function() {');
const endMarker = '    setStep: function(type, step) {';
const oldAddVehicleEnd = js.indexOf(endMarker);

if (oldAddVehicleStart !== -1 && oldAddVehicleEnd !== -1) {
    js = js.substring(0, oldAddVehicleStart) + jsReplacement + '\\n' + js.substring(oldAddVehicleEnd);
    fs.writeFileSync(jsPath, js, 'utf8');
    console.log('✓ Modified script.js');
} else {
    console.log('Could not find addVehicle function in script.js to replace.');
}

console.log('✓ Modal implemented successfully.');
