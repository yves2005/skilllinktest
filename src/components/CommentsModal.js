import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../services/firebase.js';
import { AppState } from '../state.js';
import { showToast } from './Toast.js';

let currentCommentsListener = null;

export const openCommentsModal = (pubId, pubTitle) => {
    const modal = document.getElementById('comments-modal');
    const content = document.getElementById('comments-modal-content');
    const titleEl = document.getElementById('comments-modal-title');
    const listEl = document.getElementById('comments-list');
    const pubIdInput = document.getElementById('comments-pub-id');

    if (!modal || !content) return;

    titleEl.textContent = `Commentaires pour ${pubTitle}`;
    pubIdInput.value = pubId;
    listEl.innerHTML = '<div class="p-6 text-center text-slate-500 font-medium"><i data-lucide="loader-2" class="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500"></i> Chargement...</div>';
    
    if (window.lucide) window.lucide.createIcons({ root: listEl });

    // Show modal
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);

    // Listen to Firebase comments
    if (currentCommentsListener) {
        currentCommentsListener();
        currentCommentsListener = null;
    }

    const q = query(collection(db, `publications/${pubId}/comments`), orderBy('createdAt', 'asc'));
    currentCommentsListener = onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
            listEl.innerHTML = '<div class="p-6 text-center text-slate-500 italic">Aucun commentaire pour le moment. Soyez le premier !</div>';
            return;
        }

        let html = '';
        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            const dateStr = data.createdAt ? new Date(data.createdAt.toDate()).toLocaleString('fr-FR', {
                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
            }) : 'À l\'instant';
            const authorName = data.authorName || 'U';
            const initials = authorName.substring(0,2).toUpperCase();

            html += `
                <div class="flex gap-3 mb-4">
                    <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0 border border-indigo-200">${initials}</div>
                    <div class="bg-white border border-slate-200 p-3 rounded-2xl w-full shadow-sm">
                        <div class="flex justify-between items-start mb-1 gap-2">
                            <span class="font-bold text-slate-900 text-sm leading-tight">${AppState.escapeHtml(authorName)}</span>
                            <span class="text-[10px] text-slate-400 font-medium shrink-0 mt-0.5">${dateStr}</span>
                        </div>
                        <p class="text-sm text-slate-700 break-words mt-1">${AppState.escapeHtml(data.content)}</p>
                    </div>
                </div>
            `;
        });
        listEl.innerHTML = html;
        // Scroll to bottom
        listEl.scrollTop = listEl.scrollHeight;
    }, (error) => {
        console.warn("Error fetching comments:", error);
        if (error.message && error.message.includes('permission')) {
            listEl.innerHTML = '<div class="p-6 text-center text-red-500 font-medium text-sm bg-red-50 rounded-xl border border-red-100"><i data-lucide="shield-alert" class="w-8 h-8 mx-auto mb-2 text-red-400"></i>Erreur de permission.<br>Mettez à jour vos règles Firestore en autorisant l\'accès à <strong>publications/{pubId}/comments</strong>.</div>';
            if (window.lucide) window.lucide.createIcons({ root: listEl });
        } else {
            listEl.innerHTML = '<div class="p-6 text-center text-red-500 font-medium"><i data-lucide="alert-circle" class="w-6 h-6 mx-auto mb-2 opacity-50"></i> Erreur lors du chargement des commentaires.</div>';
            if (window.lucide) window.lucide.createIcons({ root: listEl });
        }
    });

    // Handle clicks outside content to close
    modal.onclick = (e) => {
        if (e.target === modal) window.closeCommentsModal();
    };
};

export const closeCommentsModal = () => {
    const modal = document.getElementById('comments-modal');
    const content = document.getElementById('comments-modal-content');
    if (modal && content) {
        modal.classList.add('opacity-0');
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            if (currentCommentsListener) {
                currentCommentsListener();
                currentCommentsListener = null;
            }
        }, 300);
    }
};

export const addComment = async (event) => {
    event.preventDefault();
    if (!auth.currentUser) {
        showToast("Vous devez être connecté pour commenter.", "error");
        return;
    }

    const input = document.getElementById('comments-input');
    const pubId = document.getElementById('comments-pub-id').value;
    const submitBtn = document.getElementById('comments-submit-btn');

    const content = input.value.trim();
    if (!content || !pubId) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-white"></i>';
    if (window.lucide) window.lucide.createIcons({ root: submitBtn });

    try {
        const authorName = AppState.user.displayName || AppState.user.nom || AppState.user.email.split('@')[0];
        
        await addDoc(collection(db, `publications/${pubId}/comments`), {
            authorId: auth.currentUser.uid,
            authorName: authorName,
            content: content,
            createdAt: serverTimestamp()
        });
        input.value = '';
        
        // Update any visible badges for this publication
        const badges = document.querySelectorAll(`.comment-count-badge[data-pub-id="${pubId}"]`);
        badges.forEach(b => {
             const currentStr = b.textContent.replace(/[^0-9]/g, '');
             const currentCount = currentStr ? parseInt(currentStr, 10) : 0;
             b.textContent = `(${currentCount + 1})`;
        });
    } catch (e) {
        console.error("Error adding comment:", e);
        if (e.message && e.message.includes('permission')) {
            showToast("Permissions refusées. Vérifiez vos règles.", "error");
        } else {
            showToast("Erreur lors de l'ajout.", "error");
        }
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i>';
        if (window.lucide) window.lucide.createIcons({ root: submitBtn });
    }
};

export const CommentsModal = () => {
    return `
    <div id="comments-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] hidden items-center justify-center p-4 transition-opacity duration-300 opacity-0 flex">
        <div id="comments-modal-content" class="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transform scale-95 transition-transform duration-300 flex flex-col max-h-[85vh] border border-white/20">
            <!-- Header -->
            <div class="px-6 py-4 flex justify-between items-center bg-white border-b border-slate-100 z-10 shrink-0">
                <h3 id="comments-modal-title" class="text-lg font-extrabold text-slate-900 truncate pr-4">Commentaires</h3>
                <button type="button" class="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2.5 rounded-full transition cursor-pointer shrink-0 border border-slate-200" onclick="window.closeCommentsModal()">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
            
            <!-- List -->
            <div id="comments-list" class="flex-1 overflow-y-auto p-6 bg-slate-50/50 min-h-[50vh] relative">
                <!-- Dynamic content -->
            </div>
            
            <!-- Input -->
            <div class="p-4 border-t border-slate-100 bg-white shrink-0">
                <form id="comments-form" class="flex gap-2" onsubmit="window.addComment(event)">
                    <input type="hidden" id="comments-pub-id" value="">
                    <input type="text" id="comments-input" class="flex-1 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition shadow-sm bg-white placeholder-slate-400" placeholder="Écrire un commentaire..." autocomplete="off">
                    <button type="submit" id="comments-submit-btn" class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition flex items-center justify-center shadow-md shadow-indigo-600/20 w-12 h-12 shrink-0 cursor-pointer" title="Envoyer">
                        <i data-lucide="send" class="w-5 h-5"></i>
                    </button>
                </form>
            </div>
        </div>
    </div>
    `;
};
