/**
 * Official social profiles for the brand.
 *
 * Single source of truth: the Organization `sameAs` in `components/JsonLd.tsx`
 * and the visible footer links both read from here, so a new profile is added
 * once and can never drift between the markup and the schema.
 *
 * Only add a profile that actually exists and is controlled by us — a dead URL
 * in `sameAs` weakens the entity signal instead of strengthening it.
 */
export type SocialProfile = {
  name: string;
  /** Handle without the leading @. */
  handle: string;
  url: string;
};

export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  {
    name: "Instagram",
    handle: "goldpricearabia",
    url: "https://www.instagram.com/goldpricearabia/",
  },
];

/** URLs for schema.org `sameAs`. */
export const SOCIAL_URLS: readonly string[] = SOCIAL_PROFILES.map((p) => p.url);
