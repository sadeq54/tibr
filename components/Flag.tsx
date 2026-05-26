/**
 * Self-hosted SVG flag (3x2 aspect) from country-flag-icons, copied at
 * setup time into /public/flags/{cc}.svg (lowercase). Replaces emoji flags
 * which don't render on Windows Chrome (no native regional-indicator glyphs).
 *
 *   <Flag cc="SA" /> — 24×16 default
 *   <Flag cc="SA" size={12} alt="Saudi Arabia flag" />
 */
export function Flag({
  cc,
  className,
  alt,
  size = 16,
}: {
  cc: string;
  className?: string;
  alt?: string;
  size?: number;
}) {
  const code = cc.toLowerCase();
  const w = Math.round(size * 1.5);
  // Default alt = "{CC} flag" so SF / Lighthouse stop flagging empty alts.
  // Callers can pass alt="" explicitly for genuinely decorative cases (next to
  // visible country-name text — most uses) and the screen reader will skip it.
  const resolvedAlt = alt === undefined ? `${cc.toUpperCase()} flag` : alt;
  return (
    <img
      src={`/flags/${code}.svg`}
      alt={resolvedAlt}
      width={w}
      height={size}
      loading="lazy"
      decoding="async"
      className={`inline-block align-text-bottom ${className ?? ""}`}
      role={resolvedAlt === "" ? "presentation" : undefined}
    />
  );
}
