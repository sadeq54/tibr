import { ADSENSE_CLIENT, CONSENT_REGIONS } from "@/lib/ads";

/**
 * AdSense loader + Consent Mode v2 defaults.
 *
 * Both are PLAIN script tags, never `next/script`: with `afterInteractive`
 * inside a server component Next only emitted `<link rel="preload">` and left
 * the real `<script>` to client hydration, which never ran — so no ads loaded
 * and AdSense's "code snippet" site verification could not find the snippet
 * either. A plain `<script async src>` is hoisted into `<head>` by React and
 * appears verbatim in the server HTML, exactly as AdSense documents it.
 *
 * Nothing renders until `NEXT_PUBLIC_ADSENSE_CLIENT` holds a real publisher id.
 */
const CONSENT_DEFAULTS =
  "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}" +
  `gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500,region:${JSON.stringify(CONSENT_REGIONS)}});` +
  "gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});";

/**
 * Consent Mode v2 defaults — denied for EEA/UK/CH, granted elsewhere; Google's
 * certified CMP (AdSense → Privacy & messaging) updates them at runtime.
 * Rendered in the layout `<head>` so it always executes before the hoisted ad
 * loader, on every page including embeds (it is inert: no network, no ads).
 */
export function ConsentDefaultsScript() {
  if (!ADSENSE_CLIENT) return null;
  return <script id="consent-default" dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS }} />;
}

/**
 * Suppresses ad requests on the page that renders it. Embed routes are meant
 * to be iframed by partners, so Auto ads must never inject into them.
 *
 * This replaces the old approach of withholding the loader tag on `/embed/*`:
 * that gate had to await `headers()`, which under cacheComponents/PPR pushed
 * the loader out of the static `<head>` and into `<body>` on EVERY page —
 * failing Google's "code not placed between <head> tags" readiness check.
 * The loader is now static in `<head>` sitewide, and embeds opt out here.
 *
 * `pauseAdRequests` is AdSense's own documented switch. It is set from an
 * inline script, which the parser executes while the `async` cross-origin
 * loader is still being fetched, so it is in place before any ad request.
 */
export function PauseAdRequests() {
  if (!ADSENSE_CLIENT) return null;
  return (
    <script
      id="adsense-pause"
      dangerouslySetInnerHTML={{
        __html: "(window.adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=1;",
      }}
    />
  );
}

/** The AdSense loader itself. Static in the layout `<head>` on every route. */
export function AdSenseScript() {
  if (!ADSENSE_CLIENT) return null;
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
