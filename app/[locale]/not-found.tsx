import { Header } from "@/components/Header";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="text-7xl font-extrabold text-[var(--color-gold)]">404</div>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          Page not found.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-md bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
        >
          ← Home
        </Link>
      </main>
    </>
  );
}
