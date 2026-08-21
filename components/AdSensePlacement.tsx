import { AdSenseUnit } from "@/components/AdSenseUnit";
import { ADSENSE_CLIENT, ADSENSE_SLOTS, type AdSlotName } from "@/lib/ads";

const PRESET: Record<AdSlotName, { minHeight: number; format: "auto" | "vertical"; className: string }> = {
  inContent: { minHeight: 280, format: "auto", className: "" },
  sidebar: { minHeight: 600, format: "vertical", className: "hidden lg:block" },
};

/**
 * Server-side gate for a named AdSense placement: renders the client unit only
 * when the publisher id AND that placement's slot id are configured. Pages can
 * therefore keep the placement in the tree permanently; nothing ships until
 * the owner fills the env vars.
 */
export function AdSensePlacement({ name }: { name: AdSlotName }) {
  const slot = ADSENSE_SLOTS[name];
  if (!ADSENSE_CLIENT || !slot) return null;
  const p = PRESET[name];
  return <AdSenseUnit client={ADSENSE_CLIENT} slot={slot} minHeight={p.minHeight} format={p.format} className={p.className} />;
}
