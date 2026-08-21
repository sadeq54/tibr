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

/** The AdSense loader itself. Mounted via the layout's AdsGate → never on `/embed/*`. */
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
