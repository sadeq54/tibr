import Image from "next/image";

import { Link } from "@/i18n/navigation";

type Props = {
  name: string;
  photo: string;
  profileUrl: string;
  publishedAt: string;
  updatedAt?: string;
  locale: string;
};

function formatDate(iso: string, locale: string): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return iso;
  return new Date(t).toLocaleDateString(locale === "ar" ? "ar" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function AuthorByline({ name, photo, profileUrl, publishedAt, updatedAt, locale }: Props) {
  return (
    <div className="flex items-center gap-3 border-y border-[var(--color-border)] py-4">
      <Image
        src={photo}
        alt={name}
        width={48}
        height={48}
        className="rounded-full border border-[var(--color-gold)]/40 object-cover"
        style={{ width: 48, height: 48 }}
      />
      <div className="flex-1 text-sm">
        <div className="text-[var(--color-text)]">
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
            {locale === "ar" ? "بقلم" : "By"}
          </span>{" "}
          <Link
            href={profileUrl as never}
            className="font-semibold text-[var(--color-gold)] hover:underline"
          >
            {name}
          </Link>
        </div>
        <div className="mt-1 text-xs text-[var(--color-text-dim)]">
          <time dateTime={publishedAt}>{formatDate(publishedAt, locale)}</time>
          {updatedAt && updatedAt !== publishedAt ? (
            <>
              {" · "}
              <span>{locale === "ar" ? "حُدِّث" : "Updated"} </span>
              <time dateTime={updatedAt}>{formatDate(updatedAt, locale)}</time>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
