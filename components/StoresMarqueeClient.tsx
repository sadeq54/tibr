"use client";

import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

type Broker = {
  name: string;
  logo: string;
  islamic: boolean;
};

const BROKERS: Broker[] = [
  {
    name: "Exness",
    logo: "https://arabinvest.net/uc_files/image/resize/100/60/app_files/exness_logo_dark_clear_newpng_17407596135891311645731.png",
    islamic: true,
  },
  {
    name: "XM",
    logo: "https://arabinvest.net/uc_files/image/resize/100/60/app_files/custom-fields/inner_logo/xm_15years_logo_black300_209png_17467925716283250661726.png",
    islamic: true,
  },
  {
    name: "Evest",
    logo: "https://arabinvest.net/uc_files/image/resize/100/60/app_files/custom-fields/inner_logo/evest_logo_eng_inside_300_180png_168605907102691232733738.png",
    islamic: true,
  },
];

export function StoresMarqueeClient() {
  const t = useTranslations("StoresMarquee");
  return (
    <section aria-labelledby="stores-marquee-heading" className="relative w-full overflow-hidden">
      <h2
        id="stores-marquee-heading"
        className="mb-4 text-xl font-bold tracking-tight text-[var(--color-text)] md:text-2xl mx-7"
      >
        {t("heading")}
      </h2>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
        style={{ background: "linear-gradient(to right, var(--color-bg) 0%, transparent 100%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
        style={{ background: "linear-gradient(to left, var(--color-bg) 0%, transparent 100%)" }}
        aria-hidden
      />

      {/* Duplicate slides so loop has enough material (Swiper requires
          slides > slidesPerView * 2 for loop). With 3 brokers we duplicate
          to 9 for smooth infinite marquee with no warning. */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        loop
        loopAdditionalSlides={BROKERS.length * 2}
        grabCursor
        freeMode={{ enabled: true, momentum: true, momentumRatio: 0.6 }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={6000}
        allowTouchMove
        className="!py-4"
      >
        {[...BROKERS, ...BROKERS, ...BROKERS].map((b, i) => (
          <SwiperSlide key={`${b.name}-${i}`} style={{ width: 288 }}>
            <div className="hover-gold-card-strong relative flex h-52 w-72 flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-2xl"
                style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }}
              />

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-16 flex-shrink-0 items-center justify-center rounded-md bg-white p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.logo}
                    alt={`${b.name} logo`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold text-[var(--color-text)]">{b.name}</div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
                    {b.islamic ? "Islamic Account" : "Broker"}
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  type="button"
                  className="w-full rounded-md py-1.5 text-center text-xs font-bold text-black transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #f5c518 0%, #d4a82a 70%, #5a3a08 100%)",
                  }}
                >
                  Open Account
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
