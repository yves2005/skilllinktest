export const initToastContainer = () => {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        // Positioned above bottom nav bar (bottom-24 on mobile, bottom-6 on desktop)
        container.className = 'fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[100] flex flex-col gap-3 pointer-events-none';
        document.body.appendChild(container);
    }
};

export const showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    
    let icon = 'check-circle';
    let bgClass = 'bg-slate-900';
    let textClass = 'text-white';
    let iconColor = 'text-green-400';
    
    if (type === 'error') {
        icon = 'alert-circle';
        iconColor = 'text-red-400';
    } else if (type === 'info') {
        icon = 'info';
        iconColor = 'text-blue-400';
    }

    toast.className = `flex items-center px-4 py-3 ${bgClass} ${textClass} rounded-xl shadow-xl border border-slate-700/50 transform transition-all duration-300 translate-y-4 opacity-0 pointer-events-auto`;
    toast.innerHTML = `
        <i data-lucide="${icon}" class="w-5 h-5 mr-3 ${iconColor}"></i>
        <span class="text-sm font-medium">${message}</span>
    `;
    
    container.appendChild(toast);
    
    if (window.lucide) {
        window.lucide.createIcons({ root: toast });
    }

    // Trigger reflow to ensure animation runs
    void toast.offsetWidth;

    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
};
