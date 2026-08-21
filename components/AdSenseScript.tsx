import Script from "next/script";

import { ADSENSE_CLIENT, CONSENT_REGIONS } from "@/lib/ads";

/**
 * AdSense loader + Consent Mode v2 defaults. Renders nothing until the
 * publisher id is configured. Consent is denied by default only for EEA/UK/CH
 * visitors (region-scoped), which is what Google requires; the consent banner
 * itself comes from AdSense → Privacy & messaging (Google's certified CMP) and
 * updates these defaults — no extra code here.
 *
 * The defaults are a plain inline <script> so they run at parse time, before
 * the (afterInteractive) ad loader can read consent state.
 * Mounted by the layout's AdsGate so it never loads inside `/embed/*`.
 */
const CONSENT_DEFAULTS =
  "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}" +
  `gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500,region:${JSON.stringify(CONSENT_REGIONS)}});` +
  "gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});";

export function AdSenseScript() {
  if (!ADSENSE_CLIENT) return null;
  return (
    <>
      <script id="consent-default" dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS }} />
      <Script
        id="adsbygoogle-js"
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
      />
    </>
  );
}
