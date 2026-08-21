/* Gold Prices Arabia — service worker (dependency-free).
 *
 *  navigations ........ network-first; offline → cached /offline shell (per locale)
 *  /_next/static/, /flags/, /fonts/, /appIcone.* ... stale-while-revalidate
 *  /api/, /charts/, /embed/, /_next/image, cross-origin, non-GET ... never touched
 *
 * Bump VERSION whenever the caching rules change: activate() drops every
 * cache whose name differs, so stale assets never outlive a deploy.
 */
const VERSION = "v1";
const CACHE = "gpa-" + VERSION;

// One offline shell per locale; chosen by the failed navigation's URL prefix.
const LOCALES = ["en", "fr", "tr", "ur", "hi"]; // "ar" is the unprefixed default
const OFFLINE_DEFAULT = "/offline";
const OFFLINE_PATHS = [OFFLINE_DEFAULT].concat(LOCALES.map((l) => "/" + l + OFFLINE_DEFAULT));

const SWR_PREFIXES = ["/_next/static/", "/flags/", "/fonts/", "/appIcone."];
// Live data, generated images and partner-embedded widgets must always hit the
// network — a cached price is a wrong price.
const NEVER = /^\/(?:api\/|charts\/|_next\/image|(?:[a-z]{2}\/)?embed\/)/;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // Add one by one (not addAll) so a single failing locale can't abort install.
      Promise.all(
        OFFLINE_PATHS.map((p) => cache.add(new Request(p, { cache: "reload" })).catch(() => undefined)),
      ),
    ).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (NEVER.test(url.pathname)) return;

  if (req.mode === "navigate") {
    event.respondWith(networkFirst(req, url.pathname));
    return;
  }
  if (SWR_PREFIXES.some((p) => url.pathname.startsWith(p))) {
    event.respondWith(staleWhileRevalidate(req));
  }
});

/** Pick the offline shell matching the locale prefix of a failed navigation. */
function offlinePathFor(pathname) {
  const seg = pathname.split("/")[1];
  return LOCALES.includes(seg) ? "/" + seg + OFFLINE_DEFAULT : OFFLINE_DEFAULT;
}

async function networkFirst(req, pathname) {
  try {
    return await fetch(req);
  } catch {
    const cache = await caches.open(CACHE);
    const shell = (await cache.match(offlinePathFor(pathname))) || (await cache.match(OFFLINE_DEFAULT));
    return shell || Response.error();
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);
  const network = fetch(req)
    .then((res) => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => undefined);
  return cached || (await network) || Response.error();
}
