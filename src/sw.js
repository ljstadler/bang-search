const VERSION = "1788157318806";

const CACHE_NAME = `bang-search-${VERSION}`;

const APP_STATIC_RESOURCES = [
    "./",
    "./bangs.js",
    "./favicon.ico",
    "./index.css",
    "./index.html",
    "./index.js",
    "./manifest.json",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            cache.addAll(APP_STATIC_RESOURCES);
        })(),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const names = await caches.keys();
            await Promise.all(
                names.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                }),
            );
            await clients.claim();
        })(),
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(caches.match("./"));
        return;
    }

    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) {
                return cachedResponse;
            }
            return new Response(null, { status: 404 });
        })(),
    );
});
