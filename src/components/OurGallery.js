"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  A11y,
  FreeMode,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslations } from "next-intl";

export default function OurGallery({ id = "gallery", className }) {
  const t = useTranslations("gallery");
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);

  const images = [
    {
      src: "/images/image-1.jpg",
      alt: t("captions.tractorClose"),
      caption: t("captions.tractorClose"),
      width: 1600,
      height: 1067,
    },
    {
      src: "/images/image-2.jpg",
      alt: t("captions.soilSampling"),
      caption: t("captions.soilSampling"),
      width: 1600,
      height: 1067,
    },
    {
      src: "/images/image-3.jpg",
      alt: t("captions.waterMonitoring"),
      caption: t("captions.waterMonitoring"),
      width: 1600,
      height: 1067,
    },
    {
      src: "/images/image-4.jpg",
      alt: t("captions.labAnalysis"),
      caption: t("captions.labAnalysis"),
      width: 1600,
      height: 1067,
    },
    {
      src: "/images/image-5.jpg",
      alt: t("captions.fieldTeam"),
      caption: t("captions.fieldTeam"),
      width: 1600,
      height: 1067,
    },
    {
      src: "/images/image-6.jpg",
      alt: t("captions.weatherStation"),
      caption: t("captions.weatherStation"),
      width: 1600,
      height: 1067,
    },
    {
      src: "/images/image-7.jpg",
      alt: t("captions.fieldSurvey"),
      caption: t("captions.fieldSurvey"),
      width: 1600,
      height: 1067,
    },
    {
      src: "/images/image-8.jpg",
      alt: t("captions.irrigationChannel"),
      caption: t("captions.irrigationChannel"),
      width: 1600,
      height: 1067,
    },
  ];

  return (
    <section
      id={id}
      className={classNames(
        "relative w-full overflow-hidden border-y border-slate-200/60 bg-gradient-to-b from-slate-50 via-white to-slate-50 py-14 sm:py-20",
        className
      )}
      aria-label={t("title")}
    >
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <header className="mx-auto max-w-2xl text-center">
          <Pill>WRECC</Pill>
          <h2 className="mt-3  tracking-tight text-2xl sm:text-3xl md:text-4xl font-bold">
            {t("title")}
          </h2>
          <p className="mt-3 text-slate-600">{t("subtitle")}</p>
        </header>

        <div className="mt-10">
          <Swiper
            modules={[
              Navigation,
              Pagination,
              Autoplay,
              Keyboard,
              A11y,
              FreeMode,
            ]}
            loop
            onSwiper={(sw) => (swiperRef.current = sw)}
            onSlideChange={(sw) => setActive(sw.realIndex)}
            autoplay={{
              delay: 2600,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={650}
            keyboard={{ enabled: true }}
            freeMode={{ enabled: false }}
            spaceBetween={16}
            slidesPerView={1.05}
            centeredSlides
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 18,
                centeredSlides: true,
              },
              768: { slidesPerView: 1.6, spaceBetween: 20 },
              1024: { slidesPerView: 2.2, spaceBetween: 22 },
              1280: { slidesPerView: 3, spaceBetween: 24 },
            }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            aria-roledescription="carousel"
          >
            {images.map((img, i) => (
              <SwiperSlide key={`${img.src}-${i}`}>
                <figure className="group relative h-[260px] overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-transform duration-300 sm:h-[320px] md:h-[360px]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 33vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    priority={i < 2}
                  />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                    <div className="rounded-xl bg-gradient-to-t from-black/65 via-black/35 to-transparent p-3 text-white backdrop-blur-[1px]">
                      <p className="text-sm/5 font-medium sm:text-base/6">
                        {img.caption}
                      </p>
                    </div>
                  </figcaption>
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/60 to-transparent" />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-6 hidden items-center gap-3 overflow-x-auto p-2 sm:flex">
          {images.map((img, i) => {
            const isActive = i === active;
            return (
              <button
                key={`thumb-${i}`}
                type="button"
                onClick={() => swiperRef.current?.slideToLoop(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    swiperRef.current?.slideToLoop(i);
                }}
                aria-label={`Go to slide ${i + 1}: ${img.alt}`}
                className={classNames(
                  "group relative h-16 min-w-24 overflow-hidden rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500",
                  isActive
                    ? "border-emerald-400 ring-1 ring-emerald-300"
                    : "border-slate-200/70"
                )}
              >
                <span className="absolute inset-0">
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover object-center transition-opacity duration-200 group-hover:opacity-90"
                  />
                </span>
                {isActive && (
                  <span className="absolute inset-0 ring-2 ring-emerald-500/60 rounded-xl pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {children}
    </span>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
