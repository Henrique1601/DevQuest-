const CACHE_NAME = "devquest-pro-v1";

const CORE_ASSETS = [
  "/",
  "/manifest.json",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
  "/cheatsheets",
  "/code-blanks",
  "/git-visualizer"
];

// Instalação do Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn("[SW] Falha ao pré-carregar alguns assets:", err);
      });
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de versões antigas do cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptação de requisições de rede
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Apenas intercepta requisições HTTP/HTTPS do tipo GET
  if (request.method !== "GET" || !request.url.startsWith("http")) {
    return;
  }

  // Não intercepta chamadas de autenticação ou APIs dinâmicas
  if (request.url.includes("/api/auth") || request.url.includes("/api/gemini")) {
    return;
  }

  // Para navegação entre páginas (HTML): Estratégia Network-First com fallback de Cache
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          // Se a página requisitada não estiver no cache, retorna a página inicial ou cheatsheets
          const fallbackHome = await caches.match("/");
          return fallbackHome || new Response("Você está offline. Acesse uma página previamente visitada.", {
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        })
    );
    return;
  }

  // Para assets estáticos (JS, CSS, SVGs, imagens, fontes): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
