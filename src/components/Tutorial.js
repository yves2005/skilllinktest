import { AppState } from '../state.js';

let currentStep = 0;
let tutorialActive = false;

const tutorialSteps = [
    {
        id: 'step-messages',
        targetId: 'nav-btn-messages',
        title: 'Messagerie Interne',
        content: 'Accédez ici à tous vos échanges en temps réel. Vous pouvez envoyer des messages vocaux, des fichiers et archiver vos conversations terminées.',
        placement: 'bottom'
    },
    {
        id: 'step-profile',
        targetId: 'nav-user-menu',
        title: 'Profil & Services',
        content: 'Cliquez ici pour dérouler le menu complet : modifiez votre profil public, suivez vos commandes actives, ou publiez une nouvelle offre de service.',
        placement: 'bottom'
    }
];

export const startTutorialIfNeeded = () => {
    if (tutorialActive || !AppState.user) return;
    const key = `tutorial_done_${AppState.user.uid}`;
    if (localStorage.getItem(key)) return;
    
    // Mark as active so we don't trigger multiple timeouts
    tutorialActive = true;

    // delay to ensure DOM is fully ready
    setTimeout(() => {
        // Start sequence
        currentStep = 0;
        renderCurrentStep();
    }, 2000);
};

const renderCurrentStep = () => {
    cleanupTutorial();
    if (!tutorialActive || currentStep >= tutorialSteps.length) {
        finishTutorial();
        return;
    }

    const step = tutorialSteps[currentStep];
    const targetEl = document.getElementById(step.targetId);
    
    if (!targetEl) {
        console.warn('Tutorial target missing:', step.targetId);
        nextStep();
        return;
    }

    // Prepare target highlighting
    targetEl.classList.add('relative', 'z-[400]', 'bg-white', 'dark:bg-slate-800', 'rounded-full', 'shadow-[0_0_0_4px_rgba(255,255,255,1)]', 'dark:shadow-[0_0_0_4px_rgba(15,23,42,1)]');
    
    const overlay = document.createElement('div');
    overlay.id = 'tutorial-backdrop';
    overlay.className = 'fixed inset-0 bg-slate-900/70 z-[350] backdrop-blur-[2px] transition-opacity duration-300';
    document.body.appendChild(overlay);

    const rect = targetEl.getBoundingClientRect();
    
    const tooltip = document.createElement('div');
    tooltip.id = 'tutorial-tooltip';
    tooltip.className = 'fixed z-[400] w-[280px] sm:w-[320px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-5 border border-indigo-100 dark:border-indigo-900/50 animate-in fade-in slide-in-from-bottom-4 duration-300';
    
    // Positioning
    const top = rect.bottom + 16;
    let left = rect.left + (rect.width / 2) - 160;
    if (left < 10) left = 10;
    if (left + 320 > window.innerWidth - 10) left = window.innerWidth - 330;

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    
    // Determine pointer offset
    let pointerLeftMatch = (rect.left + rect.width / 2) - left - 8;
    // ensure pointer doesn't overflow radius
    if(pointerLeftMatch < 20) pointerLeftMatch = 20;
    if(pointerLeftMatch > 300) pointerLeftMatch = 300;

    tooltip.innerHTML = `
        <div class="absolute -top-2 w-4 h-4 bg-white dark:bg-slate-900 rotate-45 border-l border-t border-indigo-100 dark:border-indigo-900/50 z-0" style="left: ${pointerLeftMatch}px;"></div>
        <div class="relative z-10 text-left">
            <h4 class="font-bold text-slate-900 dark:text-white mb-2 flex items-center text-sm md:text-base">
                <i data-lucide="sparkles" class="w-4 h-4 mr-2 text-indigo-500"></i> ${step.title}
            </h4>
            <p class="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">${step.content}</p>
            <div class="flex justify-between items-center mt-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">${currentStep + 1} SUR ${tutorialSteps.length}</span>
                <div class="flex gap-2">
                    <button id="tut-skip" class="text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white px-3 py-2 cursor-pointer transition">Passer</button>
                    <button id="tut-next" class="text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition shadow-md shadow-indigo-600/20 cursor-pointer">
                        ${currentStep === tutorialSteps.length - 1 ? "C'est parti !" : 'Suivant'}
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(tooltip);
    if (window.lucide) window.lucide.createIcons({ root: tooltip });

    document.getElementById('tut-next').addEventListener('click', () => {
        // remove classes manually for transition smoothness before next
        targetEl.classList.remove('z-[400]', 'relative', 'bg-white', 'dark:bg-slate-800', 'rounded-full', 'shadow-[0_0_0_4px_rgba(255,255,255,1)]', 'dark:shadow-[0_0_0_4px_rgba(15,23,42,1)]');
        nextStep();
    });
    
    document.getElementById('tut-skip').addEventListener('click', finishTutorial);
};

const nextStep = () => {
    currentStep++;
    renderCurrentStep();
};

export const finishTutorial = () => {
    cleanupTutorial();
    tutorialActive = false;
    if (AppState.user) {
        localStorage.setItem(`tutorial_done_${AppState.user.uid}`, 'true');
    }
};

const cleanupTutorial = () => {
    const overlay = document.getElementById('tutorial-backdrop');
    if (overlay) overlay.remove();
    const tooltip = document.getElementById('tutorial-tooltip');
    if (tooltip) tooltip.remove();
    
    tutorialSteps.forEach(s => {
        const el = document.getElementById(s.targetId);
        if (el) {
            el.classList.remove('z-[400]', 'relative', 'bg-white', 'dark:bg-slate-800', 'rounded-full', 'shadow-[0_0_0_4px_rgba(255,255,255,1)]', 'dark:shadow-[0_0_0_4px_rgba(15,23,42,1)]');
        }
    });
};
