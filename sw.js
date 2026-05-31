const CACHE_NAME = 'materialowka-v13'; // Zmiana tej wersji wymusi pobranie nowej ikony
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png', // Upewnij się, że nazwy plików ikon zgadzają się z Twoimi
    './icon-512.png',
    './IMG/stopa_regulowana.jpg',
    './IMG/stopa_uchylna.jpg',
    './IMG/rygiel.jpg',
    './IMG/pion.jpg',
    './IMG/reka.jpg',
    './IMG/diagonal.jpg',
    './IMG/lemdeck_40cm.jpg',
    './IMG/lemdeck_60cm.jpg',
    './IMG/klapa.jpg',
    './IMG/blacha_stalowa.jpg',
    './IMG/kraweznik_drewniany.jpg',
    './IMG/kraweznik_aluminiowy.jpg',
    './IMG/zaczep_kraweznika_(plastik).jpg',
    './IMG/zaczep_kraweznika_(motylek).jpg',
    './IMG/zaczep_kraweznika_(zabijak).jpg'
];

// Instalacja Service Workera i buforowanie plików
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Aktywacja i czyszczenie starych wersji cache
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Serwowanie plików z cache w trybie offline
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cachedResponse => {
            return cachedResponse || fetch(e.request);
        })
    );
});
                           
