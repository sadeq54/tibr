/**
 * Google AdSense wiring. Everything is gated on `NEXT_PUBLIC_ADSENSE_CLIENT`
 * holding a real publisher id (`ca-pub-<digits>`): without it no script, no
 * units, no ads.txt — so a placeholder can never leak into production markup.
 *
 * Owner setup (see sadeqblocker.md): create the AdSense account, add the site,
 * paste the `ca-pub-…` id into Netlify env, redeploy, wait for approval. Unit
 * slot ids are optional; with Auto ads enabled in the AdSense dashboard the
 * script alone already serves anchor + in-article ads.
 */
const CLIENT_RE = /^ca-pub-\d{10,20}$/;

export const ADSENSE_CLIENT: string | null = (() => {
  const v = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ?? "";
  return CLIENT_RE.test(v) ? v : null;
})();

export const adsEnabled = ADSENSE_CLIENT !== null;

/** `pub-…` form used by ads.txt. */
export const ADSENSE_PUB_ID = ADSENSE_CLIENT ? ADSENSE_CLIENT.replace(/^ca-/, "") : null;

const SLOT_RE = /^\d{6,12}$/;
function slot(name: string): string | null {
  const v = process.env[name]?.trim() ?? "";
  return SLOT_RE.test(v) ? v : null;
}

/**
 * Manual unit slot ids (AdSense → Ads → By ad unit). Each is optional: a unit
 * without a slot renders nothing, so placements can be enabled one by one.
 */
export const ADSENSE_SLOTS = {
  /** Responsive in-content unit under the price tables on price pages. */
  inContent: slot("NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT"),
  /** Tall sidebar unit (desktop only). */
  sidebar: slot("NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR"),
} as const;

export type AdSlotName = keyof typeof ADSENSE_SLOTS;

/** Countries/regions where consent must be denied by default (Consent Mode v2). */
export const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  "IS", "LI", "NO", "GB", "CH",
];
