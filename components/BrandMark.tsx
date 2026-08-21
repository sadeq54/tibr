import Image from "next/image";

type Props = {
  /** Rendered logo height in px — width follows the 923×312 intrinsic ratio. */
  height?: number;
  className?: string;
  /** Header instance is the LCP candidate — keep priority there. */
  priority?: boolean;
};

/**
 * Site logo — the ORIGINAL brand artwork (public/logosvg.svg, 923×312).
 * This asset is the owner's logo and must not be replaced with a coded mark.
 * It embeds a raster (~1.2 MB); browsers cache it after the first hit. Do not
 * reference it more than once per page.
 */
export function BrandMark({ height = 38, className, priority = true }: Props) {
  const width = Math.round((height * 923) / 312);
  return (
    <Image
      src="/logosvg.svg"
      alt="أسعار الذهب العربية · Gold Prices Arabia"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
