// EcoRevisión RD - Premium UX Logic corregido

const app = {
    state: {
        loginRole: 'usuario',
        previewMode: 'desktop'
    },

    // Mantiene menús, modales, tema y notificaciones dentro del marco móvil del prototipo.
    // Se llama cada vez que se abre algo flotante, para evitar que aparezca fuera del teléfono.
    prepareMobileBoundaries: function() {
        const appRoot = document.getElementById('app');
        if (!appRoot) return;

        ['themeToggle', 'mobile-menu', 'add-vehicle-modal', 'toast-container'].forEach(id => {
            const element = document.getElementById(id);
            if (element && element.parentElement !== appRoot) {
                appRoot.appendChild(element);
            }
        });
    },

    openMobileMenu: function() {
        app.prepareMobileBoundaries();
        const menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.add('active');
    },

    closeMobileMenu: function() {
        const menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.remove('active');
    },

    toggleMobileMenu: function() {
        app.prepareMobileBoundaries();
        const menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.toggle('active');
    },

    // Theme logic
    initTheme: function() {
        const toggleBtn = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const mobileThemeIcon = document.getElementById('mobileThemeIcon');
        if (!toggleBtn) return;

        const applyTheme = (isLight) => {
            if (themeIcon) themeIcon.className = isLight ? 'ph ph-sun' : 'ph ph-moon';
            if (mobileThemeIcon) mobileThemeIcon.className = isLight ? 'ph ph-sun' : 'ph ph-moon';
        };

        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            applyTheme(true);
        }

        toggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            applyTheme(isLight);
        });
    },

    setPreviewMode: function(mode) {
        const cleanMode = mode === 'mobile' ? 'mobile' : 'desktop';
        app.state.previewMode = cleanMode;
        document.body.classList.toggle('preview-mobile', cleanMode === 'mobile');
        document.body.classList.toggle('preview-desktop', cleanMode === 'desktop');
        localStorage.setItem('previewMode', cleanMode);
        app.prepareMobileBoundaries();

        const desktopBtn = document.getElementById('preview-desktop-btn');
        const mobileBtn = document.getElementById('preview-mobile-btn');
        if (desktopBtn && mobileBtn) {
            desktopBtn.classList.toggle('active', cleanMode === 'desktop');
            mobileBtn.classList.toggle('active', cleanMode === 'mobile');
        }
    },

    selectLoginRole: function(role) {
        const cleanRole = role === 'admin' ? 'admin' : 'usuario';
        app.state.loginRole = cleanRole;

        const userBtn = document.getElementById('role-user-btn');
        const adminBtn = document.getElementById('role-admin-btn');
        const submitBtn = document.getElementById('login-submit-btn');

        if (userBtn && adminBtn) {
            userBtn.classList.toggle('active', cleanRole === 'usuario');
            adminBtn.classList.toggle('active', cleanRole === 'admin');
        }

        if (submitBtn) {
            submitBtn.innerHTML = cleanRole === 'admin'
                ? 'Iniciar Sesión como Admin <i class="ph ph-shield-check"></i>'
                : 'Iniciar Sesión como Usuario <i class="ph ph-arrow-right"></i>';
        }

        if (document.readyState !== 'loading') app.updateNavigationForRole();
    },

    updateNavigationForRole: function() {
        const isAdmin = app.state.loginRole === 'admin';

        document.querySelectorAll('.nav-admin-only').forEach(el => {
            el.style.display = isAdmin ? 'flex' : 'none';
        });
        document.querySelectorAll('.nav-user-only').forEach(el => {
            el.style.display = isAdmin ? 'none' : '';
        });
        document.querySelectorAll('.mobile-admin-only').forEach(el => {
            el.style.display = isAdmin ? 'flex' : 'none';
        });
        document.querySelectorAll('.mobile-user-only').forEach(el => {
            el.style.display = isAdmin ? 'none' : 'flex';
        });
    },

    escapeHTML: function(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    // Trigger Anime.js for a specific view
    animateView: function(viewElement) {
        if (!viewElement) return;

        if (document.body.classList.contains('preview-mobile')) {
            viewElement.querySelectorAll('.bento-item, .form-group, .btn-primary, .avatar, .stat-card-accent').forEach(el => {
                el.style.opacity = '';
                el.style.transform = '';
            });
            return;
        }

        if (typeof anime === 'undefined') return;

        const bentoItems = viewElement.querySelectorAll('.bento-item, .form-group, .btn-primary, .avatar, .stat-card-accent');
        if (bentoItems.length === 0) return;

        anime.set(bentoItems, { translateY: 12, opacity: 0 });

        anime({
            targets: bentoItems,
            translateY: 0,
            opacity: 1,
            delay: anime.stagger(35),
            duration: 420,
            easing: 'easeOutCubic'
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

        if (!targetView) {
            app.showToast('Vista no disponible en este prototipo', 'error');
            return;
        }

        app.closeVehicleModal();
        app.updateNavigationForRole();

        // Show/Hide Sidebar based on login state
        const authViews = ['login', 'forgot-password', 'registro'];
        if (sidebar) {
            if (authViews.includes(targetViewId)) sidebar.classList.add('hidden');
            else sidebar.classList.remove('hidden');
        }

        // Update Navigation Active State
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const onclick = link.getAttribute('onclick') || '';
            if (onclick.includes(targetViewId)) link.classList.add('active');
        });

        // Si ya estamos en esa vista, no hacer nada más
        if (currentView && currentView.id === targetViewId) return;

        const showTarget = () => {
            document.querySelectorAll('.view').forEach(view => {
                if (view !== targetView) {
                    view.classList.remove('active');
                    view.style.display = 'none';
                }
            });
            targetView.style.display = 'block';
            requestAnimationFrame(() => {
                targetView.classList.add('active');
                app.animateView(targetView);
            });
        };

        if (currentView) {
            currentView.classList.remove('active');
            setTimeout(showTarget, 220);
        } else {
            showTarget();
        }
    },

    login: function() {
        const btn = document.querySelector('#login button[type="submit"]');
        const target = app.state.loginRole === 'admin' ? 'admin-dashboard' : 'dashboard';
        if (!btn) { app.navigate(target); return; }

        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="ph ph-spinner" style="animation: spin 1s linear infinite;"></i> Autenticando...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.disabled = false;
            app.updateNavigationForRole();
            app.navigate(target);
            app.showToast(app.state.loginRole === 'admin' ? 'Bienvenido al panel administrativo' : 'Bienvenido a EcoRevisión RD', 'success');
        }, 650);
    },

    processAction: function(btn, message, targetView, btnText = 'Procesando...') {
        if (!btn) return;
        const originalHtml = btn.innerHTML;
        const currentWidth = btn.offsetWidth;
        btn.style.width = currentWidth + 'px';
        btn.innerHTML = `<i class="ph ph-spinner" style="animation: spin 1s linear infinite;"></i> ${btnText}`;
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.width = '';
            btn.disabled = false;
            app.showToast(message, 'success');
            if (targetView) app.navigate(targetView);
        }, 900);
    },

    processAdminAction: function(btn, message) {
        if (!btn) return;
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="ph ph-spinner" style="animation: spin 1s linear infinite;"></i>';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.disabled = false;
            app.showToast(message, 'success');
        }, 700);
    },

    showToast: function(message, type = 'success') {
        app.prepareMobileBoundaries();
        const toastHost = document.body.classList.contains('preview-mobile')
            ? (document.getElementById('app') || document.body)
            : document.body;

        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
        }
        if (container.parentElement !== toastHost) {
            toastHost.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const iconMap = {
            success: 'ph-check-circle',
            error: 'ph-warning-circle',
            info: 'ph-info'
        };
        const icon = iconMap[type] || iconMap.info;
        toast.innerHTML = `<i class="ph ${icon}" style="font-size: 1.5rem;"></i> <span>${app.escapeHTML(message)}</span>`;

        container.appendChild(toast);

        setTimeout(() => toast.classList.add('toast-show'), 10);

        setTimeout(() => {
            toast.classList.remove('toast-show');
            setTimeout(() => {
                if (toast.parentElement) toast.remove();
            }, 300);
        }, 3000);
    },

    addVehicle: function() {
        app.prepareMobileBoundaries();
        const modal = document.getElementById('add-vehicle-modal');
        if (modal) {
            const marca = document.getElementById('modal-veh-marca');
            const modelo = document.getElementById('modal-veh-modelo');
            const placa = document.getElementById('modal-veh-placa');
            if (marca) marca.value = '';
            if (modelo) modelo.value = '';
            if (placa) placa.value = '';
            modal.classList.add('active');
            setTimeout(() => marca && marca.focus(), 60);
        }
    },

    closeVehicleModal: function() {
        const modal = document.getElementById('add-vehicle-modal');
        if (modal) modal.classList.remove('active');
    },

    submitVehicleForm: function(btn, processText = 'Añadiendo...') {
        const marcaRaw = document.getElementById('modal-veh-marca')?.value.trim() || '';
        const modeloRaw = document.getElementById('modal-veh-modelo')?.value.trim() || '';
        const placaRaw = document.getElementById('modal-veh-placa')?.value.trim().toUpperCase() || '';

        if (!marcaRaw || !modeloRaw || !placaRaw) {
            app.showToast('Por favor, completa todos los campos', 'error');
            return;
        }

        const marca = app.escapeHTML(marcaRaw);
        const modelo = app.escapeHTML(modeloRaw);
        const placa = app.escapeHTML(placaRaw);

        const originalHtml = btn.innerHTML;
        const currentWidth = btn.offsetWidth;
        btn.style.width = currentWidth + 'px';
        btn.innerHTML = `<i class="ph ph-spinner" style="animation: spin 1s linear infinite;"></i> ${app.escapeHTML(processText)}`;
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
                                    <i class="ph ph-car-profile" style="font-size: 24px; color: var(--color-text-secondary);"></i>
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
                                <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" onclick="event.stopPropagation(); app.showToast('Solicitud cancelada visualmente', 'info')">Cancelar Solicitud</button>
                            </div>
                        </div>
                    </div>
                `;
                list.insertAdjacentHTML('beforeend', newVehicleHtml);
            }

            app.closeVehicleModal();
            app.showToast('Vehículo añadido correctamente', 'success');
        }, 650);
    },

    logout: function() {
        app.selectLoginRole('usuario');
        app.navigate('login');
    }
};

// Expose app to inline HTML handlers
window.app = app;

// Multi-step logic
app.setStep = function(type, stepNum) {
    if (type === 'reserva') {
        ['1', '2', '3'].forEach(num => {
            const step = document.getElementById('reserva-step-' + num);
            const pill = document.getElementById('reserva-pill-' + num);
            if (step) step.style.display = 'none';
            if (pill) pill.classList.remove('active-step');
        });

        const targetStep = document.getElementById('reserva-step-' + stepNum);
        const targetPill = document.getElementById('reserva-pill-' + stepNum);
        if (targetStep) targetStep.style.display = 'grid';
        if (targetPill) targetPill.classList.add('active-step');
    }

    if (type === 'insp') {
        ['1', '2', '3'].forEach(num => {
            const step = document.getElementById('insp-step-' + num);
            if (step) step.style.display = 'none';
        });

        const targetStep = document.getElementById('insp-step-' + stepNum);
        if (targetStep) targetStep.style.display = 'grid';

        const cAccent = 'var(--color-accent)';
        const cBorder = 'var(--color-border)';
        ['1', '2', '3'].forEach(num => {
            const prog = document.getElementById('insp-prog-' + num);
            if (prog) prog.style.background = stepNum >= Number(num) ? cAccent : cBorder;
        });

        const progText = document.getElementById('insp-prog-text');
        if (progText) progText.innerText = stepNum + ' / 3 completado';
    }
};

// Also reset steps when navigating to those views
const originalNavigate = app.navigate.bind(app);
app.navigate = function(viewId) {
    if (viewId === 'reservas') app.setStep('reserva', 1);
    if (viewId === 'inspeccion') app.setStep('insp', 1);
    originalNavigate(viewId);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    app.prepareMobileBoundaries();
    app.initTheme();
    app.setPreviewMode(localStorage.getItem('previewMode') || 'desktop');
    app.selectLoginRole('usuario');
    app.updateNavigationForRole();

    document.querySelectorAll('.view:not(.active)').forEach(view => {
        view.style.display = 'none';
    });

    const modal = document.getElementById('add-vehicle-modal');
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) app.closeVehicleModal();
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') app.closeVehicleModal();
    });

    app.navigate('login');
});


/* MOBILE CLEAN JS PATCH START */
(function () {
    if (!window.app || window.app.__mobileCleanPatch) return;
    window.app.__mobileCleanPatch = true;

    const patchedNavigate = app.navigate.bind(app);

    app.navigate = function (targetViewId) {
        patchedNavigate(targetViewId);

        requestAnimationFrame(() => {
            const main = document.getElementById('main-content');
            if (main) main.scrollTop = 0;

            document.body.classList.toggle('inspection-screen', targetViewId === 'inspeccion');

            if (document.body.classList.contains('preview-mobile')) {
                const activeView = document.querySelector('.view.active');
                if (activeView) {
                    activeView.querySelectorAll('.bento-item, .form-group, .btn-primary, .avatar, .stat-card-accent').forEach(el => {
                        el.style.opacity = '';
                        el.style.transform = '';
                    });
                }
            }
        });
    };
})();
/* MOBILE CLEAN JS PATCH END */
