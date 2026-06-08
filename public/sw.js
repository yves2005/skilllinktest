const CACHE_NAME = 'skilllink-profiles-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/app.js',
  '/src/state.js',
  '/src/styles.css',
  '/src/translations.json',
  '/assets/icon.png', // if there's any
  // Add other local assets here as needed
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching App Shell');
        return cache.addAll(ASSETS_TO_CACHE.filter(url => !url.includes('assets/icon.png'))); // Safely cache what we know exists
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event (Network first, falling back to cache)
self.addEventListener('fetch', event => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;
  
  // Exclude API calls or chrome extensions from caching (if any)
  if (!(event.request.url.indexOf('http') === 0)) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response before caching
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          // Add to cache for future offline use
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => {
        // If network fails, serve from cache
        return caches.match(event.request);
      })
  );
});
