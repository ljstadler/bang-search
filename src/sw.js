const VERSION = "v1.0.0";

const CACHE_NAME = `bang-search-${VERSION}`;

const APP_STATIC_RESOURCES = [
    "./",
    "./bangs.js",
    "./clipboard-check.svg",
    "./clipboard.svg",
    "./favicon.ico",
    "./index.html",
    "./manifest.json",
    "./search.html",
    "./styles.css",
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
                    return undefined;
                }),
            );
            await clients.claim();
        })(),
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const url = new URL(event.request.url);

            const cached = await cache.match(event.request);

            if (cached) {
                event.waitUntil(
                    fetch(event.request)
                        .then((resp) => {
                            if (resp.ok) cache.put(event.request, resp.clone());
                        })
                        .catch(() => {}),
                );
                return cached;
            }
            try {
                const networkResp = await fetch(event.request);
                if (networkResp.ok) {
                    cache.put(event.request, networkResp.clone());
                }
                return networkResp;
            } catch {
                if (event.request.mode === "navigate") {
                    let path = url.pathname;
                    if (path === "/") path = "/index.html";
                    if (!path.includes(".")) path += ".html";
                    const fallback = await cache.match(path);
                    if (fallback) return fallback;
                }
                return new Response(null, { status: 404 });
            }
        })(),
    );
});
