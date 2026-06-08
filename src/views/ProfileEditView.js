import { AppState } from '../state.js';

export const ProfileEditView = {
    render: () => {
        const pd = AppState.profileData;
        return `
        <div class="max-w-2xl mx-auto bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-slate-200 mt-0 sm:mt-4">
            <!-- Navigation Rapide -->
            <div class="hidden sm:flex justify-center gap-4 mb-6 pb-4 border-b border-slate-100">
                <button data-route="marketplace" class="flex items-center text-slate-500 hover:text-indigo-600 transition font-medium text-sm">
                    <i data-lucide="search" class="w-4 h-4 mr-1.5"></i> Explorer
                </button>
                <div class="w-px h-5 bg-slate-200"></div>
                <button data-route="ai" class="flex items-center text-slate-500 hover:text-indigo-600 transition font-medium text-sm">
                    <i data-lucide="sparkles" class="w-4 h-4 mr-1.5"></i> Assistant IA
                </button>
            </div>

            <div class="flex items-center mb-4">
                <button data-action="back" class="text-slate-400 hover:text-slate-600 transition flex items-center justify-center p-2 rounded-full hover:bg-slate-100 mr-2">
                    <i data-lucide="arrow-left" class="w-5 h-5"></i>
                </button>
                <h2 class="text-xl font-bold text-slate-900 flex items-center">
                    <i data-lucide="edit-3" class="mr-2 text-slate-500"></i> Modifier le profil
                </h2>
            </div>
            <form id="profile-edit-form" class="space-y-3">
                
                <div class="mb-4">
                    <label class="block text-sm font-bold text-slate-700 mb-2">Photo de profil</label>
                    <div class="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div id="edit-profile-view-avatar" class="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-lg border border-indigo-50 shrink-0 shadow-sm relative ${pd.avatarImage ? 'bg-cover bg-center' : ''}" style="${pd.avatarImage ? `background-image: url(${pd.avatarImage});` : ''}">
                            ${!pd.avatarImage ? pd.displayName.charAt(0).toUpperCase() : ''}
                        </div>
                        <div class="flex-grow">
                            <div class="text-[9px] text-slate-500 mb-1">Image carrée (JPEG, PNG).</div>
                            <div class="flex items-center gap-2">
                                <label for="edit-profile-view-avatar-input" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] px-2 py-1.5 rounded-lg cursor-pointer border border-indigo-150 transition flex items-center gap-1 shadow-sm">
                                    <i data-lucide="upload-cloud" class="w-3 h-3"></i> Téléverser
                                </label>
                                <input type="file" id="edit-profile-view-avatar-input" accept="image/*" class="hidden">
                                <button type="button" id="edit-profile-view-clear-avatar" class="${pd.avatarImage ? 'inline-flex' : 'hidden'} items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[10px] px-2 py-1.5 rounded-lg border border-red-150 transition cursor-pointer shadow-sm">
                                    <i data-lucide="trash-2" class="w-3 h-3"></i> Suppr.
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="block text-xs font-medium text-slate-700 mb-1">Nom d'affichage</label>
                    <input type="text" id="edit-display-name" value="${pd.displayName}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition text-sm">
                </div>

                <div class="mb-3 p-3 border border-indigo-100 bg-indigo-50/50 rounded-xl flex items-center justify-between">
                    <div>
                        <h4 class="text-xs font-bold text-slate-900">Mode Freelance</h4>
                        <p class="text-[10px] text-slate-500 mt-0.5">Actif pour publier des services.</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="edit-role-freelance" class="sr-only peer" ${AppState.user?.role === 'freelance' ? 'checked' : ''}>
                        <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>
                
                <div>
                    <label class="block text-xs font-medium text-slate-700 mb-1">Titre professionnel</label>
                    <input type="text" id="edit-title" value="${pd.title}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition text-sm">
                </div>

                <div class="pt-3 border-t border-slate-100">
                    <label class="block text-xs font-medium text-slate-700 mb-1">Compétences clés</label>
                    <input type="text" id="user-skills-edit" value="${pd.skills.join(', ')}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition text-sm">
                    <div class="text-[10px] text-slate-500 mt-1">Séparez avec des virgules.</div>
                </div>

                <div>
                    <div class="flex justify-between items-end mb-1">
                        <label class="block text-xs font-medium text-slate-700">Biographie</label>
                        <button type="button" id="btn-generate-bio-edit" class="text-[10px] font-bold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-lg border border-indigo-100 transition shadow-sm flex items-center group">
                            <i data-lucide="sparkles" class="w-3 h-3 mr-1 text-indigo-500 group-hover:text-indigo-600 animate-pulse"></i> IA
                        </button>
                    </div>
                    <textarea id="user-bio-edit" rows="3" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition resize-none text-sm" placeholder="Présentez-vous...">${pd.bio}</textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                    <div>
                        <label class="block text-xs font-medium text-slate-700 mb-1">Localisation</label>
                        <input type="text" id="edit-location" value="${pd.location}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition text-sm">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-700 mb-1">TJM (€)</label>
                        <input type="number" id="edit-tjm" value="${pd.tjm}" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition text-sm pl-8">
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex justify-end gap-2">
                    <button type="button" data-route="profile" class="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-4 py-2 text-xs font-bold transition flex items-center">
                        Annuler
                    </button>
                    <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2 text-xs font-bold transition shadow-sm flex items-center">
                        <i data-lucide="save" class="w-3 h-3 mr-1.5"></i> Mettre à jour
                    </button>
                </div>
            </form>
        </div>
    `;
    },
    
    attachEvents: () => {
        const form = document.getElementById('profile-edit-form');
        const btnGenBio = document.getElementById('btn-generate-bio-edit');
        const bioInput = document.getElementById('user-bio-edit');
        const skillsInput = document.getElementById('user-skills-edit');

        const avatarInput = document.getElementById('edit-profile-view-avatar-input');
        const avatarPreview = document.getElementById('edit-profile-view-avatar');
        const btnClearAvatar = document.getElementById('edit-profile-view-clear-avatar');
        let newAvatarUrl = AppState.profileData.avatarImage;

        if (avatarInput && avatarPreview && btnClearAvatar) {
            avatarInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    try {
                        avatarPreview.innerHTML = '<i data-lucide="loader" class="w-6 h-6 animate-spin text-indigo-600"></i>';
                        if (window.lucide) window.lucide.createIcons({ root: avatarPreview });
                        
                        const formData = new FormData();
                        formData.append('file', file);
                        
                        const response = await fetch('/api/upload', {
                            method: 'POST',
                            body: formData
                        });
                        
                        if (!response.ok) throw new Error('Téléversement échoué');
                        const data = await response.json();
                        
                        newAvatarUrl = data.url;
                        avatarPreview.style.backgroundImage = `url(${newAvatarUrl})`;
                        avatarPreview.classList.add('bg-cover', 'bg-center');
                        avatarPreview.innerHTML = '';
                        btnClearAvatar.classList.remove('hidden');
                        btnClearAvatar.classList.add('inline-flex');
                        if (window.lucide) window.lucide.createIcons();
                    } catch (err) {
                        console.error('Error uploading profile pic:', err);
                        alert('Erreur lors du téléversement de la photo de profil : ' + err.message);
                        avatarPreview.innerHTML = !newAvatarUrl ? AppState.profileData.displayName.charAt(0).toUpperCase() : '';
                    }
                }
            });

            btnClearAvatar.addEventListener('click', () => {
                newAvatarUrl = '';
                avatarInput.value = '';
                avatarPreview.style.backgroundImage = '';
                avatarPreview.classList.remove('bg-cover', 'bg-center');
                avatarPreview.innerHTML = AppState.profileData.displayName.charAt(0).toUpperCase();
                btnClearAvatar.classList.add('hidden');
                btnClearAvatar.classList.remove('inline-flex');
            });
        }

        btnGenBio?.addEventListener('click', async () => {
            const originalHTML = btnGenBio.innerHTML;
            btnGenBio.innerHTML = '<i data-lucide="loader-2" class="w-3.5 h-3.5 mr-1.5 animate-spin"></i> Génération...';
            btnGenBio.disabled = true;
            if (window.lucide) window.lucide.createIcons();

            const skills = skillsInput.value || "technologiques";

            try {
                const response = await fetch('/api/generate-bio', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ skills })
                });

                if (!response.ok) throw new Error('Generation failed');
                const data = await response.json();
                
                bioInput.value = data.bio;
                
                btnGenBio.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 mr-1.5 text-emerald-600"></i> Généré';
                btnGenBio.classList.replace('text-indigo-700', 'text-emerald-700');
                btnGenBio.classList.replace('bg-indigo-50', 'bg-emerald-50');
                btnGenBio.classList.replace('border-indigo-100', 'border-emerald-100');
                if (window.lucide) window.lucide.createIcons();
                
                setTimeout(() => {
                    btnGenBio.innerHTML = originalHTML;
                    btnGenBio.classList.replace('text-emerald-700', 'text-indigo-700');
                    btnGenBio.classList.replace('bg-emerald-50', 'bg-indigo-50');
                    btnGenBio.classList.replace('border-emerald-100', 'border-indigo-100');
                    btnGenBio.disabled = false;
                    if (window.lucide) window.lucide.createIcons();
                }, 2000);

            } catch (err) {
                console.error(err);
                btnGenBio.innerHTML = '<i data-lucide="alert-circle" class="w-3.5 h-3.5 mr-1.5 text-red-600"></i> Erreur';
                btnGenBio.classList.replace('text-indigo-700', 'text-red-700');
                btnGenBio.classList.replace('bg-indigo-50', 'bg-red-50');
                btnGenBio.classList.replace('border-indigo-100', 'border-red-100');
                if (window.lucide) window.lucide.createIcons();
                
                setTimeout(() => {
                    btnGenBio.innerHTML = originalHTML;
                    btnGenBio.classList.replace('text-red-700', 'text-indigo-700');
                    btnGenBio.classList.replace('bg-red-50', 'bg-indigo-50');
                    btnGenBio.classList.replace('border-red-100', 'border-indigo-100');
                    btnGenBio.disabled = false;
                    if (window.lucide) window.lucide.createIcons();
                }, 2000);
            }
        });

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            
            const newName = document.getElementById('edit-display-name').value.trim();
            const newTitle = document.getElementById('edit-title').value.trim();
            const newBio = bioInput.value.trim();
            const newLocation = document.getElementById('edit-location').value.trim();
            const newTjm = parseInt(document.getElementById('edit-tjm').value, 10);
            const isFreelance = document.getElementById('edit-role-freelance').checked;
            
            const rawSkills = skillsInput.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
            
            const profileUpdates = {
                displayName: newName || AppState.profileData.displayName,
                avatarImage: newAvatarUrl !== undefined ? newAvatarUrl : AppState.profileData.avatarImage,
                title: newTitle || AppState.profileData.title,
                bio: newBio || AppState.profileData.bio,
                location: newLocation || AppState.profileData.location,
                tjm: isNaN(newTjm) ? AppState.profileData.tjm : newTjm,
                role: isFreelance ? 'freelance' : 'client',
                skills: rawSkills
            };

            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 mr-2 animate-spin"></i> Enregistrement...';
            if (window.lucide) window.lucide.createIcons();

            AppState.updateProfile(profileUpdates).then(() => {
                btn.innerHTML = '<i data-lucide="check" class="w-4 h-4 mr-2"></i> Profil mis à jour';
                btn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
                btn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
                if (window.lucide) window.lucide.createIcons();
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
                    btn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
                    if (window.lucide) window.lucide.createIcons();
                    // Navigate back to profile
                    AppState.navigate('profile');
                }, 200);
            }).catch((err) => {
                alert("Erreur lors de la mise à jour : " + err.message);
                btn.innerHTML = originalHTML;
            });
        });
    }
};
