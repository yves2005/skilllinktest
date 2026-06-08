import React from 'react';
import { createRoot } from 'react-dom/client';
import { DUMMY_SERVICES, DUMMY_FREELANCES, AppState } from '../state.js';
import { ServiceCard } from '../components/ServiceCard.js';
import { FreelanceCard } from '../components/FreelanceCard.js';
import { AiSkillSuggestions } from '../components/AiSkillSuggestions.jsx';

const SkeletonCard = () => `
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
        <div class="h-48 bg-slate-200"></div>
        <div class="p-5">
            <div class="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div class="flex items-center space-x-3 mt-3 mb-4">
                <div class="w-8 h-8 rounded-full bg-slate-200"></div>
                <div class="flex-1">
                    <div class="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                    <div class="h-3 bg-slate-200 rounded w-1/3"></div>
                </div>
            </div>
            <div class="border-t border-slate-100 pt-4 flex justify-between items-center mt-2">
                <div class="h-4 bg-slate-200 rounded w-1/4"></div>
                <div class="h-5 bg-slate-200 rounded w-1/4"></div>
            </div>
        </div>
    </div>
`;

const FreelanceSkeletonCard = () => `
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
        <div class="p-6 flex flex-col items-center">
            <div class="w-20 h-20 rounded-full bg-slate-200 mb-4"></div>
            <div class="h-5 bg-slate-200 rounded w-1/2 mb-2"></div>
            <div class="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div class="w-24 h-8 bg-slate-200 rounded-full mb-4"></div>
            <div class="w-full border-t border-slate-100 pt-4 flex justify-between items-center mt-2">
                <div class="h-4 bg-slate-200 rounded w-1/3"></div>
                <div class="h-5 bg-slate-200 rounded w-1/4"></div>
            </div>
        </div>
    </div>
`;

export const MarketplaceView = {
    render: () => `
        <div class="mb-8 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 sm:p-12 text-white shadow-lg overflow-hidden relative">
            <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
            <div class="relative z-10 flex flex-col sm:flex-row justify-between items-center">
                <div class="max-w-xl text-center sm:text-left mb-6 sm:mb-0">
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Trouvez le talent idéal.</h2>
                    <p class="text-indigo-100 text-lg">Parcourez notre catalogue d'experts triés sur le volet et donnez vie à vos projets.</p>
                </div>
                <div class="flex-shrink-0">
                    <button class="bg-white text-indigo-900 hover:bg-slate-50 px-6 py-3 rounded-xl font-bold transition shadow-sm flex items-center">
                        <i data-lucide="sparkles" class="w-5 h-5 mr-2"></i> Recommandation IA
                    </button>
                </div>
            </div>
        </div>
        
        <div class="flex flex-col md:flex-row gap-8">
            <!-- Sidebar -->
            <aside class="w-full md:w-1/4 space-y-6 self-start md:sticky md:top-24 z-10">
                <div class="bg-white p-2 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 class="font-bold text-slate-900 mb-4 flex items-center">
                        <i data-lucide="search" class="w-4 h-4 mr-2 text-indigo-500"></i> Recherche d'Expert
                    </h3>
                    <div class="space-y-4">
                        <div class="flex flex-col sm:flex-row gap-3">
                            <div class="relative flex-grow">
                                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
                                <input type="text" id="freelanceSearchInput" placeholder="Compétence ou job..." class="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition">
                                <div id="ai-skill-suggestions-freelance"></div>
                            </div>
                            <div class="relative w-full sm:w-48">
                                <select id="freelanceCategorySelect" class="w-full pl-3 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition appearance-none cursor-pointer">
                                    <option value="">Toutes les catégories</option>
                                    <option value="Développement">Développement</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Rédaction">Rédaction</option>
                                </select>
                                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none"></i>
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-3">
                            <div class="relative flex-grow">
                                <i data-lucide="map-pin" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
                                <input type="text" id="freelanceLocationInput" placeholder="Localisation (ex: Paris, Lyon...)" class="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition">
                            </div>
                            <div class="flex gap-2 w-full sm:w-64">
                                <div class="relative w-1/2">
                                    <input type="number" id="freelanceTjmMinInput" placeholder="TJM Min" min="0" step="50" class="w-full pl-3 pr-2 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition">
                                </div>
                                <div class="relative w-1/2">
                                    <input type="number" id="freelanceTjmMaxInput" placeholder="TJM Max" min="0" step="50" class="w-full pl-3 pr-2 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none transition">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 class="font-bold text-slate-900 mb-4 flex items-center">
                        <i data-lucide="filter" class="w-4 h-4 mr-2 text-indigo-500"></i> Filtres Services
                    </h3>
                    
                    <div class="mb-6">
                        <h4 class="text-sm font-semibold text-slate-700 mb-3">Catégories</h4>
                        <div class="space-y-2.5">
                            <label class="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" value="Code" class="category-filter w-4 h-4 rounded text-indigo-600 flex-shrink-0 cursor-pointer">
                                <span class="text-sm text-slate-600 group-hover:text-slate-900">Développement Web</span>
                            </label>
                            <label class="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" value="Design" class="category-filter w-4 h-4 rounded text-indigo-600 flex-shrink-0 cursor-pointer">
                                <span class="text-sm text-slate-600 group-hover:text-slate-900">Design & Graphisme</span>
                            </label>
                            <label class="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" value="Marketing" class="category-filter w-4 h-4 rounded text-indigo-600 flex-shrink-0 cursor-pointer">
                                <span class="text-sm text-slate-600 group-hover:text-slate-900">Marketing & SEO</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h4 class="text-sm font-semibold text-slate-700 mb-3">Budget Maximum</h4>
                        <input type="range" id="budgetRange" min="0" max="5000" step="100" value="5000" class="w-full accent-indigo-600 cursor-pointer">
                        <div class="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                            <span>0€</span>
                            <span id="budgetValue">5000€</span>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h4 class="text-sm font-semibold text-slate-700 mb-3 flex justify-between">
                            <span>Note minimum</span>
                            <span class="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs">4.0+</span>
                        </h4>
                        <div class="flex items-center justify-between text-sm cursor-pointer group" id="ratingFilterCont">
                            <span class="text-slate-600 group-hover:text-slate-900">Exiger les top profils</span>
                            <div class="relative">
                                <input type="checkbox" id="ratingFilter" class="sr-only peer">
                                <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-slate-100">
                        <button id="reset-filters" class="w-full px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition flex items-center justify-center">
                            <i data-lucide="rotate-ccw" class="w-4 h-4 mr-2"></i> Réinitialiser
                        </button>
                    </div>
                </div>
            </aside>
            
            <!-- Grid -->
            <div class="w-full md:w-3/4">
                <!-- Freelances Section -->
                <div class="mb-12">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h2 class="text-2xl font-bold text-slate-900 mb-4 sm:mb-0">Freelances Disponibles</h2>
                        <div class="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm whitespace-nowrap">
                            <span id="freelance-result-count" class="text-indigo-600 font-bold">${DUMMY_FREELANCES.length}</span> experts
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6" id="freelance-grid">
                        ${DUMMY_FREELANCES.map(f => FreelanceCard(f)).join('')}
                    </div>
                    
                    <div id="no-freelances" class="hidden text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm mt-4">
                        <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <i data-lucide="users" class="w-6 h-6 text-slate-400"></i>
                        </div>
                        <h3 class="font-bold text-slate-900">Aucun expert trouvé</h3>
                        <p class="text-slate-500 mt-1 text-sm">Modifiez votre recherche.</p>
                    </div>
                </div>
                
                <!-- Services Section -->
                <div>
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h2 class="text-2xl font-bold text-slate-900 mb-4 sm:mb-0">Services</h2>
                    
                    <div class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                        <div class="relative w-full sm:w-64">
                            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
                            <input type="text" id="searchInput" placeholder="Rechercher un service..." class="w-full pl-9 pr-10 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm transition shadow-sm">
                            <button id="voice-search-btn" type="button" class="absolute right-2 top-[7px] p-1 text-slate-400 hover:text-indigo-600 transition cursor-pointer" title="Recherche vocale">
                                <i data-lucide="mic" class="w-4 h-4"></i>
                            </button>
                        </div>
                        <div class="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm whitespace-nowrap w-full sm:w-auto text-center">
                            <span id="result-count" class="text-indigo-600 font-bold">-</span> résultats
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6" id="marketplace-grid">
                    ${Array(6).fill(0).map(() => SkeletonCard()).join('')}
                </div>
                
                <div id="load-more-container" class="hidden mt-10 text-center">
                    <button id="load-more-btn" class="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl transition shadow-sm inline-flex items-center">
                        Charger plus <i data-lucide="chevron-down" class="w-4 h-4 ml-2"></i>
                    </button>
                </div>
                
                <div id="no-results" class="hidden text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm mt-4">
                    <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                        <i data-lucide="search-x" class="w-8 h-8 text-slate-400"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900">Aucun résultat trouvé</h3>
                    <p class="text-slate-500 mt-2 max-w-sm mx-auto text-sm">Nous n'avons pas trouvé de services correspondant à vos critères. Essayez d'élargir votre recherche.</p>
                    <button id="reset-action-btn" class="mt-6 text-indigo-600 hover:text-indigo-700 font-semibold text-sm hover:underline">Effacer tous les filtres</button>
                </div>
            </div>
        </div>
    `,
    attachEvents: () => {
        let isLoaded = false;
        let displayedCount = 6;
        const ITEMS_PER_PAGE = 6;
        let currentFiltered = [...DUMMY_SERVICES];

        // Services DOM
        const grid = document.getElementById('marketplace-grid');
        const noResults = document.getElementById('no-results');
        const count = document.getElementById('result-count');
        
        // Freelances DOM
        const freelanceGrid = document.getElementById('freelance-grid');
        const noFreelances = document.getElementById('no-freelances');
        const freelanceCount = document.getElementById('freelance-result-count');
        const freelanceSearchInput = document.getElementById('freelanceSearchInput');
        const freelanceCategorySelect = document.getElementById('freelanceCategorySelect');
        const freelanceLocationInput = document.getElementById('freelanceLocationInput');
        const freelanceTjmMinInput = document.getElementById('freelanceTjmMinInput');
        const freelanceTjmMaxInput = document.getElementById('freelanceTjmMaxInput');

        if (AppState.preSelectedSearchQuery && freelanceSearchInput) {
            freelanceSearchInput.value = AppState.preSelectedSearchQuery;
            delete AppState.preSelectedSearchQuery;
        }

        const loadMoreCont = document.getElementById('load-more-container');
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        const categoryFilters = document.querySelectorAll('.category-filter');
        const budgetRange = document.getElementById('budgetRange');
        const budgetValue = document.getElementById('budgetValue');
        const ratingFilter = document.getElementById('ratingFilter');
        const ratingFilterCont = document.getElementById('ratingFilterCont');
        const resetBtn = document.getElementById('reset-filters');
        const resetActionBtn = document.getElementById('reset-action-btn');
        const searchInput = document.getElementById('searchInput');
        const voiceSearchBtn = document.getElementById('voice-search-btn');

        // ==== FREELANCES FILTERING ====
        let typingTimer;
        const updateFreelanceGrid = () => {
            clearTimeout(typingTimer);
            
            // Show skeletons immediately
            freelanceGrid.innerHTML = Array(6).fill(0).map(() => FreelanceSkeletonCard()).join('');
            freelanceGrid.classList.remove('hidden');
            noFreelances.classList.add('hidden');

            typingTimer = setTimeout(() => {
                const query = freelanceSearchInput ? freelanceSearchInput.value.toLowerCase().trim() : '';
                const categorySelectValue = freelanceCategorySelect ? freelanceCategorySelect.value : '';
                const locationQuery = freelanceLocationInput ? freelanceLocationInput.value.toLowerCase().trim() : '';
                const tjmMin = freelanceTjmMinInput && freelanceTjmMinInput.value ? parseInt(freelanceTjmMinInput.value, 10) : 0;
                const tjmMax = freelanceTjmMaxInput && freelanceTjmMaxInput.value ? parseInt(freelanceTjmMaxInput.value, 10) : Infinity;
    
                const filtered = DUMMY_FREELANCES.filter(f => {
                    const matchName = f.name && f.name.toLowerCase().includes(query);
                    const matchTitle = f.title && f.title.toLowerCase().includes(query);
                    const matchSkills = f.skills && f.skills.some(s => s.toLowerCase().includes(query));
                    const textMatch = matchName || matchTitle || matchSkills;
                    
                    const matchLocation = locationQuery === '' || (f.location && f.location.toLowerCase().includes(locationQuery));
                    const currentTjm = f.tjm || 0;
                    const matchTjm = currentTjm >= tjmMin && currentTjm <= tjmMax;
    
                    // Simple category fallback parsing based on dummy data categories, mapping to the defined options
                    let matchCategory = true;
                    if (categorySelectValue) {
                        const lCategory = categorySelectValue.toLowerCase();
                        // Map dummy titles to our dropdown categories:
                        let fCats = "Aucune";
                        const tl = (f.title || '').toLowerCase() + " " + (f.skills || []).join(" ").toLowerCase();
                        if (tl.includes('développeur') || tl.includes('react') || tl.includes('python')) fCats = 'développement';
                        else if (tl.includes('design') || tl.includes('ui/ux')) fCats = 'design';
                        else if (tl.includes('marketing') || tl.includes('seo') || tl.includes('growth')) fCats = 'marketing';
                        else if (tl.includes('rédaction') || tl.includes('copy')) fCats = 'rédaction';
    
                        matchCategory = fCats === lCategory;
                    }
    
                    return textMatch && matchCategory && matchLocation && matchTjm;
                });
    
                if (freelanceCount) freelanceCount.innerText = filtered.length;
    
                if (filtered.length > 0) {
                    freelanceGrid.innerHTML = filtered.map(f => FreelanceCard(f)).join('');
                    freelanceGrid.classList.remove('hidden');
                    noFreelances.classList.add('hidden');
                } else {
                    freelanceGrid.innerHTML = '';
                    freelanceGrid.classList.add('hidden');
                    noFreelances.classList.remove('hidden');
                }
    
                if (window.lucide) window.lucide.createIcons();
            }, 600); // Animation feeling
        };

        if (freelanceSearchInput) {
            freelanceSearchInput.addEventListener('input', updateFreelanceGrid);
        }
        if (freelanceCategorySelect) {
            freelanceCategorySelect.addEventListener('change', updateFreelanceGrid);
        }
        if (freelanceLocationInput) {
            freelanceLocationInput.addEventListener('input', updateFreelanceGrid);
        }
        if (freelanceTjmMinInput) {
            freelanceTjmMinInput.addEventListener('input', updateFreelanceGrid);
        }
        if (freelanceTjmMaxInput) {
            freelanceTjmMaxInput.addEventListener('input', updateFreelanceGrid);
        }
        
        if (freelanceGrid) {
            freelanceGrid.addEventListener('click', (e) => {
                const skillBtn = e.target.closest('.skill-filter-tag');
                if (skillBtn) {
                    e.stopPropagation();
                    const skill = skillBtn.getAttribute('data-skill');
                    if (freelanceSearchInput) {
                        freelanceSearchInput.value = skill;
                        updateFreelanceGrid();
                        // Scroll top smoothly up to the search bar so they see the result of their click
                        freelanceSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        }
        // ==============================

        // Configuration de la recherche vocale
        if (voiceSearchBtn) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.lang = 'fr-FR';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                recognition.onstart = () => {
                    voiceSearchBtn.classList.remove('text-slate-400', 'hover:text-indigo-600');
                    voiceSearchBtn.classList.add('text-red-500', 'animate-pulse');
                };

                recognition.onresult = (event) => {
                    if (event.results && event.results[0] && event.results[0][0]) {
                        searchInput.value = event.results[0][0].transcript;
                        updateGrid();
                    }
                };

                recognition.onend = () => {
                    voiceSearchBtn.classList.remove('text-red-500', 'animate-pulse');
                    voiceSearchBtn.classList.add('text-slate-400', 'hover:text-indigo-600');
                };

                recognition.onerror = (event) => {
                    console.warn('Information de reconnaissance vocale (Micro externe potentiellement requis):', event.error);
                    voiceSearchBtn.classList.remove('text-red-500', 'animate-pulse');
                    voiceSearchBtn.classList.add('text-slate-400', 'hover:text-indigo-600');
                };

                voiceSearchBtn.addEventListener('click', () => {
                    try {
                        recognition.start();
                    } catch(e) {
                        console.error('Erreur au démarrage de la reconnaissance vocale', e);
                    }
                });
            } else {
                voiceSearchBtn.style.display = 'none';
            }
        }
        
        ratingFilterCont?.addEventListener('click', (e) => {
            if (e.target !== ratingFilter) {
                e.preventDefault();
                ratingFilter.checked = !ratingFilter.checked;
                updateGrid();
            }
        });

        const renderGrid = () => {
            if (currentFiltered.length > 0) {
                grid.innerHTML = currentFiltered.slice(0, displayedCount).map(s => {
                    let authorImg = null;
                    if (AppState.user && s.authorId === AppState.user.uid && AppState.profileData?.avatarImage) {
                        authorImg = AppState.profileData.avatarImage;
                    } else {
                        const authorInfo = DUMMY_FREELANCES.find(f => f.uid === s.authorId);
                        if (authorInfo && authorInfo.img) {
                            authorImg = authorInfo.img;
                        }
                    }
                    if (authorImg) {
                        return ServiceCard({ ...s, authorImg });
                    }
                    return ServiceCard(s);
                }).join('');
                grid.classList.remove('hidden');
                noResults.classList.add('hidden');
                
                if (displayedCount < currentFiltered.length) {
                    loadMoreCont.classList.remove('hidden');
                } else {
                    loadMoreCont.classList.add('hidden');
                }
                setTimeout(() => { if(window.loadCommentCounts) window.loadCommentCounts() }, 50);
            } else {
                grid.innerHTML = '';
                grid.classList.add('hidden');
                noResults.classList.remove('hidden');
                loadMoreCont.classList.add('hidden');
            }
            
            count.innerText = currentFiltered.length;
            if (window.lucide) window.lucide.createIcons();
        };

        const updateGrid = () => {
            if (!isLoaded) return;
            
            const selectedCategories = Array.from(categoryFilters)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            const maxBudget = parseInt(budgetRange.value, 10);
            const needsHighRating = ratingFilter.checked;
            const searchQuery = searchInput.value.toLowerCase().trim();
            
            currentFiltered = DUMMY_SERVICES.filter(service => {
                if (selectedCategories.length > 0 && !selectedCategories.includes(service.category)) {
                    return false;
                }
                
                const priceMatch = service.price.match(/(\d+)/);
                const price = priceMatch ? parseInt(priceMatch[1], 10) : 0;
                
                if (price > maxBudget) return false;
                
                if (needsHighRating && service.rating < 4.9) return false;
                
                if (searchQuery && !service.title.toLowerCase().includes(searchQuery) && !service.auteur.toLowerCase().includes(searchQuery)) {
                    return false;
                }
                
                return true;
            });
            
            displayedCount = ITEMS_PER_PAGE;
            renderGrid();
        };

        categoryFilters.forEach(cb => cb.addEventListener('change', updateGrid));
        
        budgetRange?.addEventListener('input', (e) => {
            budgetValue.innerText = e.target.value + '€';
            updateGrid();
        });
        
        ratingFilter?.addEventListener('change', updateGrid);
        searchInput?.addEventListener('input', updateGrid);
        
        const performReset = () => {
            categoryFilters.forEach(cb => cb.checked = false);
            budgetRange.value = 5000;
            budgetValue.innerText = '5000€';
            ratingFilter.checked = false;
            searchInput.value = '';
            updateGrid();
        };

        resetBtn?.addEventListener('click', performReset);
        resetActionBtn?.addEventListener('click', performReset);
        
        loadMoreBtn?.addEventListener('click', () => {
            loadMoreBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
            if (window.lucide) window.lucide.createIcons();
            
            setTimeout(() => {
                displayedCount += ITEMS_PER_PAGE;
                renderGrid();
                loadMoreBtn.innerHTML = 'Charger plus <i data-lucide="chevron-down" class="w-4 h-4 ml-2"></i>';
                if (window.lucide) window.lucide.createIcons();
            }, 50);
        });
        
        // Render AiSkillSuggestions
        const aiSuggestionsContainer = document.getElementById('ai-skill-suggestions-freelance');
        if (aiSuggestionsContainer) {
            const root = createRoot(aiSuggestionsContainer);
            root.render(<AiSkillSuggestions inputId="freelanceSearchInput" />);
            aiSuggestionsContainer.__reactRoot = root;
        }

        // Initialiser la grid directement sans délai artificiel
        isLoaded = true;
        updateGrid();
    }
};
