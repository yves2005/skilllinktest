import { AppState } from '../state.js';

export const LoginView = {
    render: () => `
        <div class="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex overflow-hidden mt-6 min-h-[600px] mb-8">
            <!-- Left Side / Form -->
            <div class="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                <div class="mb-10 lg:mb-12">
                    <div class="flex items-center space-x-2 mb-6">
                        <button data-action="back" class="text-slate-400 hover:text-slate-600 transition flex items-center justify-center p-1.5 rounded-full hover:bg-slate-100">
                            <i data-lucide="arrow-left" class="w-5 h-5"></i>
                        </button>
                        <i data-lucide="layers" class="text-indigo-600 w-8 h-8 ml-2"></i>
                        <span class="font-bold text-xl tracking-tight text-slate-900">SkillLink</span>
                    </div>
                    <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Bienvenue</h2>
                    <p class="text-slate-500 mt-2">Connectez-vous pour continuer vers votre espace.</p>
                </div>

                <!-- Custom Inline Error Banner -->
                <div id="login-error" class="hidden flex items-start space-x-2.5 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-800 text-sm mb-6 transition-all duration-350">
                    <i data-lucide="alert-circle" class="w-5 h-5 shrink-0 text-rose-500 mt-0.5"></i>
                    <div class="flex-grow font-medium leading-relaxed" id="login-error-text"></div>
                </div>

                <form id="login-form" class="space-y-5">
                    <div>
                        <label class="block pl-1 text-sm font-semibold text-slate-700 mb-1.5">Adresse Email</label>
                        <div class="relative">
                            <i data-lucide="mail" class="w-5 h-5 text-slate-400 absolute left-3.5 top-4"></i>
                            <input type="email" id="email" required placeholder="contact@exemple.com" class="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition font-medium">
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between items-center pl-1 mb-1.5">
                            <label class="text-sm font-semibold text-slate-700">Mot de passe</label>
                            <a href="#" id="forgot-password" class="text-xs text-indigo-600 font-bold hover:underline transition">Mot de passe oublié ?</a>
                        </div>
                        <div class="relative">
                            <i data-lucide="lock" class="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5"></i>
                            <input type="password" id="password" required placeholder="••••••••" class="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition font-medium">
                            <button type="button" id="toggle-password" class="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition">
                                <i data-lucide="eye" class="w-5 h-5" id="toggle-password-icon"></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-4 font-bold transition mt-8 shadow-md shadow-indigo-200 flex items-center justify-center group overflow-hidden relative">
                        <span class="relative z-10 flex items-center">Se connecter <i data-lucide="arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"></i></span>
                        <div class="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    
                    <div class="mt-6">
                        <button type="button" id="btn-google-login" class="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl px-4 py-3.5 font-bold transition flex items-center justify-center shadow-sm">
                            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                            Continuer avec Google
                        </button>
                    </div>
                </form>
                
                <div id="reset-password-ui" class="hidden space-y-4 pt-4 border-t border-slate-100 mt-6">
                    <h4 class="font-bold text-slate-900">Réinitialisation</h4>
                    <div id="reset-step-1">
                        <button id="send-code-btn" class="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-3 rounded-xl transition border-none cursor-pointer">Envoyer code par mail</button>
                    </div>
                    <div id="reset-step-2" class="hidden space-y-3">
                        <input type="text" id="reset-code" placeholder="Code à 6 chiffres" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none">
                        <button id="verify-code-btn" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition border-none cursor-pointer">Vérifier code</button>
                    </div>
                </div>
                
                <p class="text-center text-sm text-slate-500 mt-10">
                    Vous n'avez pas de compte ? <a href="#" data-route="register" class="text-indigo-600 font-bold hover:underline">Inscrivez-vous</a>
                </p>
            </div>

            <!-- Right Side / Artwork -->
            <div class="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" alt="Collaboration" class="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay">
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-800/90 mix-blend-multiply"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                
                <div class="relative z-10 p-16 text-center">
                    <div class="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                        <i data-lucide="globe-2" class="w-10 h-10 text-white"></i>
                    </div>
                    <h3 class="text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">Collaborez avec les meilleurs talents.</h3>
                    <p class="text-indigo-100 text-lg max-w-md mx-auto leading-relaxed">Trouvez rapidement l'expertise qu'il vous manque. Une place de marché conçue pour la qualité et la confiance.</p>
                </div>
            </div>
        </div>
    `,

    attachEvents: () => {
        const loginForm = document.getElementById('login-form');
        const loginError = document.getElementById('login-error');
        const loginErrorText = document.getElementById('login-error-text');
        
        const forgotPasswordLink = document.getElementById('forgot-password');
        const resetPasswordUi = document.getElementById('reset-password-ui');
        const resetStep1 = document.getElementById('reset-step-1');
        const resetStep2 = document.getElementById('reset-step-2');
        const sendCodeBtn = document.getElementById('send-code-btn');
        const verifyCodeBtn = document.getElementById('verify-code-btn');
        const resetCodeInput = document.getElementById('reset-code');

        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                resetPasswordUi.classList.remove('hidden');
                loginForm.classList.add('hidden');
            });
        }

        if (sendCodeBtn) {
            sendCodeBtn.addEventListener('click', async () => {
                const email = document.getElementById('email').value.trim();
                if (!email) {
                    if (window.showToast) window.showToast("Renseignez d'abord l'email.", "error");
                    return;
                }
                try {
                    const response = await fetch('/api/password-reset/send-code', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email })
                    });
                    const data = await response.json();
                    resetStep1.classList.add('hidden');
                    resetStep2.classList.remove('hidden');
                    
                    if (data.warning) {
                        if (window.showToast) window.showToast(`Code envoyé (pour test : ${data.code})`, "success");
                    } else {
                        if (window.showToast) window.showToast("Code envoyé sur votre adresse e-mail.", "success");
                    }
                } catch (e) {
                    if (window.showToast) window.showToast("Erreur lors de l'envoi du code.", "error");
                }
            });
        }

        if (verifyCodeBtn) {
            verifyCodeBtn.addEventListener('click', async () => {
                const email = document.getElementById('email').value.trim();
                const code = resetCodeInput.value.trim();
                try {
                    const response = await fetch('/api/password-reset/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, code })
                    });
                    if (response.ok) {
                        if (window.showToast) window.showToast("Code vérifié ! (Vous pouvez maintenant changer votre mot de passe - fonctionnalité à implémenter)", "success");
                        // Logic to actually change password would go here.
                    } else {
                        if (window.showToast) window.showToast("Code invalide.", "error");
                    }
                } catch (e) {
                    if (window.showToast) window.showToast("Erreur lors de la vérification.", "error");
                }
            });
        }
        
        const togglePasswordBtn = document.getElementById('toggle-password');
        const passwordInput = document.getElementById('password');
        const togglePasswordIcon = document.getElementById('toggle-password-icon');

        if (togglePasswordBtn && passwordInput && togglePasswordIcon) {
            togglePasswordBtn.addEventListener('click', () => {
                const isPassword = passwordInput.getAttribute('type') === 'password';
                passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
                togglePasswordIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
                
                // Re-init the newly updated lucide icon if available
                if (window.lucide) {
                   window.lucide.createIcons({
                        nameAttr: 'data-lucide',
                        attrs: {
                            class: 'w-5 h-5'
                        }
                    });
                }
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value;

                if (loginError) loginError.classList.add('hidden');
                
                // Show loading state
                const btn = loginForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i>';
                btn.disabled = true;
                if (window.lucide) window.lucide.createIcons();

                AppState.login(email, password).catch((err) => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    if (window.lucide) window.lucide.createIcons();

                    if (loginError && loginErrorText) {
                        loginErrorText.innerHTML = AppState.escapeHtml(err.message);
                        loginError.classList.remove('hidden');
                        if (window.lucide) window.lucide.createIcons({ root: loginError });
                    }
                });
            });
        }

        const googleBtn = document.getElementById('btn-google-login');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                const originalContent = googleBtn.innerHTML;
                googleBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin mr-3"></i> Connexion Google...';
                googleBtn.disabled = true;
                if (window.lucide) window.lucide.createIcons({ root: googleBtn });

                if (loginError) loginError.classList.add('hidden');

                AppState.loginWithGoogle().catch((err) => {
                    googleBtn.innerHTML = originalContent;
                    googleBtn.disabled = false;
                    if (window.lucide) window.lucide.createIcons({ root: googleBtn });

                    if (loginError && loginErrorText) {
                        loginErrorText.innerHTML = AppState.escapeHtml(err.message);
                        loginError.classList.remove('hidden');
                        if (window.lucide) window.lucide.createIcons({ root: loginError });
                    }
                });
            });
        }
    }
};
