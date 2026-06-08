export const ContactModal = () => `
    <div id="contact-modal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center hidden opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl transform scale-95 transition-transform duration-300" id="contact-modal-content">
            <div class="flex justify-between items-center mb-5">
                <h2 class="text-xl font-bold text-slate-900 flex items-center">
                    <i data-lucide="headphones" class="w-6 h-6 mr-2 text-indigo-600"></i> Support Client
                </h2>
                <button id="close-contact-modal" class="text-slate-400 hover:text-red-500 transition">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            
            <form id="contact-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Votre nom</label>
                    <input type="text" required class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition text-sm">
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" required class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition text-sm">
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Sujet</label>
                    <select required class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition text-sm appearance-none">
                        <option value="">Sélectionnez un sujet</option>
                        <option value="account">Problème de compte</option>
                        <option value="billing">Paiement / Facturation</option>
                        <option value="bug">Rapport de bug</option>
                        <option value="other">Autre demande</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea required rows="4" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition text-sm resize-none"></textarea>
                </div>
                
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center">
                    <i data-lucide="send" class="w-4 h-4 mr-2"></i> Envoyer le message
                </button>
            </form>
            
            <div id="contact-success-msg" class="hidden flex-col items-center justify-center text-center py-6">
                <div class="w-16 h-16 bg-green-100 rounded-full flex justify-center items-center mb-4">
                    <i data-lucide="check" class="w-8 h-8 text-green-600"></i>
                </div>
                <h3 class="font-bold text-lg text-slate-900 mb-2">Message envoyé !</h3>
                <p class="text-sm text-slate-500 mb-6">Notre équipe de support vous répondra dans les plus brefs délais.</p>
                <button id="close-contact-success" class="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Fermer</button>
            </div>
        </div>
    </div>
`;
