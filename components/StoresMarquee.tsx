"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

const N = 8;
const SLOTS = Array.from({ length: N }, (_, i) => i);

export function StoresMarquee() {
  return (
    <section aria-label="Stores" className="relative w-full overflow-hidden">
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

      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        loop
        loopAdditionalSlides={N}
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
        {SLOTS.map((slot) => {
          const letter = String.fromCharCode(65 + slot);
          return (
            <SwiperSlide key={slot} style={{ width: 288 }}>
              <div className="hover-gold-card-strong relative flex h-52 w-72 flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-2xl"
                  style={{ background: "radial-gradient(circle, #f5c518 0%, transparent 70%)" }}
                />

                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-black"
                    style={{ background: "linear-gradient(135deg, #f5c518 0%, #d4a82a 70%, #5a3a08 100%)" }}
                  >
                    {letter}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-[var(--color-text)]">
                      Partner {slot + 1}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
                      Sponsor Slot
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">
                    Featured
                  </div>
                  <div className="mt-1 font-mono text-base font-bold text-[var(--color-text)]">
                    Coming Soon
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
