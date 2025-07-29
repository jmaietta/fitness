const CACHE_NAME = 'forge-fitness-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/food_data.js',
    '/site.webmanifest',
    '/forge-logo.png',
    '/forge-logo-2.png',
    // Add ALL of your exercise image paths below
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
    '/Supermans.png'
];

// Install the service worker and cache all of the app's content
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
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
