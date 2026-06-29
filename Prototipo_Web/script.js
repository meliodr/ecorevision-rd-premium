// EcoRevisión RD - Premium UX Logic

const app = {
    // Theme logic
    initTheme: function() {
        const toggleBtn = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const mobileThemeIcon = document.getElementById('mobileThemeIcon');
        if (!toggleBtn) return;
        
        const applyTheme = (isLight) => {
            if (themeIcon) {
                themeIcon.className = isLight ? 'ph ph-sun' : 'ph ph-moon';
            }
            if (mobileThemeIcon) {
                mobileThemeIcon.className = isLight ? 'ph ph-sun' : 'ph ph-moon';
            }
        };

        // Load preference
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            applyTheme(true);
        }
        
        // Toggle event
        toggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            applyTheme(isLight);
        });
    },

    // Trigger Anime.js for a specific view
    animateView: function(viewElement) {
        if (typeof anime === 'undefined') return;
        
        const bentoItems = viewElement.querySelectorAll('.bento-item, .form-group, .btn-primary, .avatar');
        if (bentoItems.length === 0) return;
        
        // Reset transform to avoid layout jump
        anime.set(bentoItems, { translateY: 20, opacity: 0 });
        
        anime({
            targets: bentoItems,
            translateY: 0,
            opacity: 1,
            delay: anime.stagger(50),
            duration: 800,
            easing: 'easeOutCubic' // Serious, non-bouncy smooth transition
        });
    },

    // 3D Apple Wallet Tilt Effect (Disabled per request)
    initTiltEffect: function() {
        // Animation removed
    },

    // Navigate between views with smooth transitions
    navigate: function(targetViewId) {
        const currentView = document.querySelector('.view.active');
        const targetView = document.getElementById(targetViewId);
        const sidebar = document.getElementById('sidebar');
        
        if (!targetView) return;

        // Show/Hide Sidebar based on login state
        if (targetViewId === 'login' || targetViewId === 'forgot-password' || targetViewId === 'registro') {
            sidebar.classList.add('hidden');
        } else {
            sidebar.classList.remove('hidden');
        }

        // Update Navigation Active State
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('onclick') && link.getAttribute('onclick').includes(targetViewId)) {
                link.classList.add('active');
            }
        });

        // Si ya estamos en esa vista, no hacer nada más
        if (currentView && currentView.id === targetViewId) return;

        // Fade out current
        if (currentView) {
            currentView.classList.remove('active');
            setTimeout(() => {
                currentView.style.display = 'none';
                
                targetView.style.display = 'block';
                requestAnimationFrame(() => {
                    targetView.classList.add('active');
                    app.animateView(targetView);
                });
            }, 400); 
        } else {
            targetView.style.display = 'block';
            requestAnimationFrame(() => {
                targetView.classList.add('active');
                app.animateView(targetView);
            });
        }
    },

    login: function() {
        const btn = document.querySelector('#login button[type="submit"]');
        if (!btn) { app.navigate('dashboard'); return; }
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="ph ph-spinner" style="animation: spin 1s linear infinite;"></i> Autenticando...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.disabled = false;
            app.navigate('dashboard');
        }, 800);
    },

    processAction: function(btn, message, targetView, btnText = 'Procesando...') {
        if (!btn) return;
        const originalHtml = btn.innerHTML;
        const currentWidth = btn.offsetWidth;
        btn.style.width = currentWidth + 'px'; // Maintain width
        btn.innerHTML = `<i class="ph ph-spinner" style="animation: spin 1s linear infinite;"></i> ${btnText}`;
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.width = '';
            btn.disabled = false;
            app.showToast(message, 'success');
            if (targetView) app.navigate(targetView);
        }, 1200);
    },

    showToast: function(message, type = 'success') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'ph-check-circle' : 'ph-info';
        toast.innerHTML = `<i class="ph ${icon}" style="font-size: 1.5rem;"></i> <span>${message}</span>`;
        
        container.appendChild(toast);
        
        // Trigger reflow for animation
        setTimeout(() => {
            toast.classList.add('toast-show');
        }, 10);

        // Remove after 3s
        setTimeout(() => {
            toast.classList.remove('toast-show');
            setTimeout(() => {
                if(toast.parentElement) toast.remove();
            }, 300);
        }, 3000);
    },

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
        btn.innerHTML = `<i class="ph ph-spinner" style="animation: spin 1s linear infinite;"></i> ${processText}`;
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.width = '';
            btn.disabled = false;
            
            const list = document.querySelector('.vehicle-list');
            if (list) {
                const newVehicleHtml = `
                    <div class="vehicle-item" onclick="this.classList.toggle('expanded')" style="animation: fade-in 0.5s ease-out forwards; opacity: 0; transform: translateY(10px);">
                        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                            <div class="v-info" style="align-items: center; gap: 16px;">
                                <div class="v-image" style="width: 80px; height: 50px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background: var(--color-bg-elevated); display: flex; align-items: center; justify-content: center;">
                                    <i class="ph ph-car-profile" style="font-size: 24px; color: var(--color-text-muted);"></i>
                                </div>
                                <div class="v-details">
                                    <h4>${marca} ${modelo}</h4>
                                    <p>${placa} • Recién Añadido</p>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span class="status-badge warning">En Proceso</span>
                                <i class="ph ph-caret-down text-muted"></i>
                            </div>
                        </div>
                        <div class="v-extra-details">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.85rem; color: var(--color-text-secondary);">
                                <div><strong>Validación:</strong> En curso</div>
                                <div><strong>Seguro:</strong> Pendiente</div>
                                <div><strong>Año:</strong> -</div>
                                <div><strong>Color:</strong> -</div>
                            </div>
                            <div style="margin-top: 12px; display: flex; gap: 8px;">
                                <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" onclick="event.stopPropagation();">Cancelar Solicitud</button>
                            </div>
                        </div>
                    </div>
                `;
                list.insertAdjacentHTML('beforeend', newVehicleHtml);
                
                if(!document.getElementById('vehicle-anim')) {
                    const style = document.createElement('style');
                    style.id = 'vehicle-anim';
                    style.innerHTML = '@keyframes fade-in { to { opacity: 1; transform: translateY(0); } }';
                    document.head.appendChild(style);
                }
            }
            
            app.closeVehicleModal();
            app.showToast('Vehículo añadido correctamente', 'success');
        }, 800);
    },

    logout: function() {
        app.navigate('login');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    app.initTheme();

    // Solo forzamos 'none' a los que NO tienen .active para que CSS gane inicialmente
    document.querySelectorAll('.view:not(.active)').forEach(view => {
        view.style.display = 'none';
    });
    
    // Iniciar app en login, forzando la navegación inicial si no está cargada
    app.navigate('login');
});

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
