import { AppState, DUMMY_PROJECTS } from '../state.js';

let currentFilter = 'all';

export const TrackingView = {
    render: () => {
        const renderStatusBadge = (status) => {
            switch(status) {
                case 'in-progress':
                    return '<span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-indigo-200 shadow-sm">En cours</span>';
                case 'validation':
                    return '<span class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-amber-200 shadow-sm">En attente</span>';
                case 'completed':
                    return '<span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-emerald-200 shadow-sm">Terminé</span>';
                default:
                    return '';
            }
        };

        const renderTimeline = (status, lastUpdate, date) => {
            const isValidation = status === 'validation' || status === 'completed';
            const isCompleted = status === 'completed';

            return `
                <div class="relative pt-4 pb-2">
                    <div class="absolute left-4 top-6 bottom-4 w-px bg-slate-200"></div>
                    
                    <div class="flex space-x-4 mb-6 relative">
                        <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm relative z-10"><i data-lucide="check" class="w-4 h-4"></i></div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-900">Commande passée</h4>
                            <p class="text-xs text-slate-500 mt-0.5">Créée le ${new Date(date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div class="flex space-x-4 mb-6 relative ${status === 'completed' ? '' : 'opacity-100'}">
                        <div class="w-8 h-8 rounded-full ${status === 'in-progress' ? 'bg-indigo-600 text-white shadow-sm ring-8 ring-indigo-50' : 'bg-emerald-500 text-white shadow-sm'} flex items-center justify-center flex-shrink-0 relative z-10">
                            ${status === 'in-progress' ? '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>' : '<i data-lucide="check" class="w-4 h-4"></i>'}
                        </div>
                        <div class="w-full">
                            <h4 class="font-bold text-sm text-slate-900">Développement en cours</h4>
                            <p class="text-xs text-slate-500 mt-0.5">Travail sur votre projet</p>
                            
                            ${status !== 'completed' ? `
                            <div class="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm flex justify-between items-center group hover:border-indigo-200 transition cursor-pointer">
                                <span class="font-medium text-slate-700 flex items-center"><i data-lucide="file-text" class="w-4 h-4 mr-2 text-indigo-500"></i> ${lastUpdate}</span>
                                <button class="text-indigo-600 font-bold hover:underline text-xs flex items-center opacity-80 group-hover:opacity-100 transition">Aperçu <i data-lucide="external-link" class="w-3 h-3 ml-1"></i></button>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="flex space-x-4 relative ${!isValidation ? 'opacity-50 grayscale' : ''}">
                        <div class="w-8 h-8 rounded-full ${isCompleted ? 'bg-emerald-500 text-white border-transparent shadow-sm' : (isValidation ? 'bg-amber-500 text-white shadow-sm ring-8 ring-amber-50 border-transparent' : 'bg-white border-2 border-slate-300 text-slate-400')} flex items-center justify-center flex-shrink-0 relative z-10">
                            ${isCompleted ? '<i data-lucide="check" class="w-4 h-4"></i>' : (isValidation ? '<i data-lucide="clock" class="w-4 h-4"></i>' : '<i data-lucide="check-circle-2" class="w-4 h-4"></i>')}
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-slate-900">Livraison & Validation</h4>
                            <p class="text-xs text-slate-500 mt-0.5">${isCompleted ? 'Validé et payé' : (isValidation ? 'Attente de votre confirmation' : 'À venir')}</p>
                        </div>
                    </div>
                </div>
            `;
        };

        let filteredProjects = DUMMY_PROJECTS;
        if (currentFilter === 'in-progress') {
            filteredProjects = DUMMY_PROJECTS.filter(p => p.status === 'in-progress' || p.status === 'validation');
        } else if (currentFilter === 'completed') {
            filteredProjects = DUMMY_PROJECTS.filter(p => p.status === 'completed');
        }

        const projectsHtml = filteredProjects.length > 0 ? filteredProjects.map(project => `
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-6 transition-all hover:shadow-md">
                <div class="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4 border-b border-slate-100 pb-4">
                    <div>
                        <h3 class="font-bold text-xl text-slate-900 mb-2">${project.title}</h3>
                        <div class="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                            <span class="flex items-center bg-slate-100 px-2 py-1 rounded-md font-medium"><i data-lucide="hash" class="w-3 h-3 mr-1"></i> ${project.id}</span>
                            <span class="flex items-center"><i data-lucide="user" class="w-3 h-3 mr-1"></i> Prestataire: <span class="font-bold text-slate-700 ml-1">${project.freelance}</span></span>
                            <span class="flex items-center"><i data-lucide="credit-card" class="w-3 h-3 mx-1"></i> <span class="font-bold text-slate-700 ml-1">${project.price}</span></span>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        ${renderStatusBadge(project.status)}
                    </div>
                </div>

                ${renderTimeline(project.status, project.lastUpdate, project.date)}
                
                ${project.status === 'validation' ? `
                <div class="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
                    <button data-action="report-problem" data-id="${project.id}" class="px-5 py-2 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold transition flex items-center">
                        <i data-lucide="alert-circle" class="w-4 h-4 mr-2"></i> Problème
                    </button>
                    <button data-action="validate-delivery" data-id="${project.id}" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition shadow-sm flex items-center">
                        <i data-lucide="check-circle-2" class="w-4 h-4 mr-2"></i> Valider la livraison
                    </button>
                </div>
                ` : project.status === 'in-progress' ? `
                <div class="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
                    <button data-action="contact-freelance" data-id="${project.id}" class="px-5 py-2 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold transition flex items-center shadow-sm">
                        <i data-lucide="message-square" class="w-4 h-4 mr-2"></i> Contacter
                    </button>
                </div>
                ` : `
                <div class="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
                    <button data-action="download-invoice" data-id="${project.id}" class="px-5 py-2 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold transition flex items-center shadow-sm">
                        <i data-lucide="download" class="w-4 h-4 mr-2"></i> Facture
                    </button>
                    <button data-action="leave-review" data-id="${project.id}" class="px-5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-bold transition flex items-center">
                        <i data-lucide="star" class="w-4 h-4 mr-2"></i> Avis
                    </button>
                </div>
                `}
            </div>
        `).join('') : '<div class="bg-white py-12 text-center rounded-3xl border border-slate-200 shadow-sm text-slate-500 font-medium">Aucun projet trouvé pour ce filtre.</div>';

        const stats = {
            active: DUMMY_PROJECTS.filter(p => ['in-progress', 'validation'].includes(p.status)).length,
            waiting: DUMMY_PROJECTS.filter(p => p.status === 'validation').length,
            completed: DUMMY_PROJECTS.filter(p => p.status === 'completed').length,
        };

        return `
            <div class="max-w-5xl mx-auto mt-4 space-y-8 pb-12 view-enter">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 class="text-3xl font-extrabold text-slate-900 flex items-center tracking-tight">
                        <i data-lucide="kanban-square" class="w-8 h-8 mr-3 text-indigo-600"></i> Mes Projets
                    </h2>
                    
                    <div class="flex bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm" id="tracking-filters">
                        <button data-filter="all" class="px-4 py-1.5 ${currentFilter === 'all' ? 'bg-slate-100 shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'} text-sm font-bold rounded-lg transition">Tous</button>
                        <button data-filter="in-progress" class="px-4 py-1.5 ${currentFilter === 'in-progress' ? 'bg-slate-100 shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'} text-sm font-bold rounded-lg transition">En cours</button>
                        <button data-filter="completed" class="px-4 py-1.5 ${currentFilter === 'completed' ? 'bg-slate-100 shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'} text-sm font-bold rounded-lg transition">Terminés</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center">
                        <div class="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mr-5">
                            <i data-lucide="folder-check" class="w-7 h-7"></i>
                        </div>
                        <div>
                            <div class="text-3xl font-extrabold text-slate-900">${stats.active}</div>
                            <div class="text-sm font-bold text-slate-500">Projets actifs</div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center">
                        <div class="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mr-5">
                            <i data-lucide="clock" class="w-7 h-7"></i>
                        </div>
                        <div>
                            <div class="text-3xl font-extrabold text-slate-900">${stats.waiting}</div>
                            <div class="text-sm font-bold text-slate-500">En attente d'action</div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center">
                        <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mr-5">
                            <i data-lucide="check-circle-2" class="w-7 h-7"></i>
                        </div>
                        <div>
                            <div class="text-3xl font-extrabold text-slate-900">${stats.completed}</div>
                            <div class="text-sm font-bold text-slate-500">Projets terminés</div>
                        </div>
                    </div>
                </div>

                <div class="space-y-6">
                    ${projectsHtml}
                </div>
            </div>
        `;
    },
    
    attachEvents: () => {
        if (window.lucide) window.lucide.createIcons();

        document.querySelectorAll('#tracking-filters button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                currentFilter = e.currentTarget.getAttribute('data-filter');
                AppState.notify();
            });
        });

        const showToast = (message, icon = 'info', color = 'indigo') => {
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium view-enter z-50 flex items-center';
            toast.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5 mr-3 text-${color}-400"></i> ${message}`;
            document.body.appendChild(toast);
            if (window.lucide) window.lucide.createIcons({ root: toast });
            setTimeout(() => {
                toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        };
        
        document.querySelectorAll('[data-action="validate-delivery"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const proj = DUMMY_PROJECTS.find(p => p.id === id);
                if (proj) {
                    proj.status = 'completed';
                    proj.lastUpdate = "Projet validé et clôturé";
                    showToast('Livraison validée avec succès.', 'check-circle', 'green');
                    AppState.notify();
                }
            });
        });

        document.querySelectorAll('[data-action="report-problem"]').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast('Procédure de signalement initiée.', 'alert-circle', 'amber');
            });
        });

        document.querySelectorAll('[data-action="contact-freelance"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = e.currentTarget.getAttribute('data-id');
                const project = DUMMY_PROJECTS.find(p => p.id === projectId);
                if (project && AppState.user) {
                    const targetUid = AppState.user.uid === project.clientId ? project.freelanceId : project.clientId;
                    AppState.activeConversationPartnerId = targetUid;
                    AppState.prefilledChatMessage = `Bonjour,\n\nJe vous recontacte au sujet de notre projet en cours "${project.title}". J'aimerais faire un point avec vous sur son avancement.\n\nBien cordialement,`;
                }
                window.location.hash = '#messaging';
            });
        });

        document.querySelectorAll('[data-action="download-invoice"]').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast('Téléchargement de la facture en cours...', 'download', 'indigo');
            });
        });

        document.querySelectorAll('[data-action="leave-review"]').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast('Évaluation du prestataire : Fonctionnalité à venir.', 'star', 'amber');
            });
        });
    }
};
