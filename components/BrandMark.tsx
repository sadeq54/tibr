import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
};

export function BrandMark({ size = 72, className }: Props) {
  return (
    <Image
      src="/logosvg.svg"
      alt="Gold Prices Arabia"
      width={1920}
      height={1080}
      className="w-36 h-auto"
     
    />
  );
}
