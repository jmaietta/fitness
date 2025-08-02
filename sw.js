const CACHE_NAME = 'forge-fitness-cache-v5';
const urlsToCache = [
    // Core app files
    '/',
    '/index.html',
    '/privacy.html',
    '/style.css',
    '/script.js',
    '/food_data.js',
    '/site.webmanifest',
    
    // Icons and logos
    '/forge-logo.png',
    '/forge-logo-2.png',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    
    // Screenshots for manifest
    '/screenshots_1.jpg',
    '/screenshots_2.jpg',
    '/screenshots_3.jpg',
    '/screenshots_4.jpg',
    '/screenshots_5.jpg',
    '/screenshots_6.jpg',
    
    // Exercise images
    '/burpee.png',
    '/calf-raises.png',
    '/calf-stretch.png',
    '/chair-dip.png',
    '/glute-bridge.png',
    '/hamstring-stretch.png',
    '/high-knees.png',
    '/jumping-jacks.png',
    '/lunges.png',
    '/mountain-climbers.png',
    '/neck-stretch.png',
    '/plank.png',
    '/push-up.png',
    '/quad-stretch.png',
    '/shoulder-stretch.png',
    '/squats.png',
    '/Supermans.png',
    
    // Food database images
    '/apple-pic.png',
    '/beans-pic.png',
    '/beef-pic.png',
    '/bison2-pic.png',
    '/bread3-pic.png',
    '/chicken-pic.png',
    '/egg-pic.png',
    '/greens-pic.png',
    '/olive-oil-pic.png',
    '/peanut-butter-pic.png',
    '/rabes-pic.png',
    '/rice-pic.png',
    '/salmon-pic.png',
    '/yogurt-pic.png'
];

// Install the service worker and cache all of the app's content
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache v5');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch content from the cache first, and then from the network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      })
  );
});

// Clean up old caches when updating
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
