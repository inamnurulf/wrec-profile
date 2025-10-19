"use client";

import Container from "./atoms/Container";
import Pill from "./atoms/Pill";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
      {/* Background image positioned left */}
      <img
        src="/images/weather-bg.png"
        alt="Weather station background"
        className="absolute left-0 top-0 z-0 h-full  object-cover opacity-50 pointer-events-none"
      />

      {/* Optional blending veil */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-50/40 via-white/60 to-slate-50/70 pointer-events-none" />

      {/* Foreground content */}
      <div className="relative z-10">
        <Container>
          <div className="grid gap-8 py-16 sm:py-24 md:grid-cols-2 md:items-center">
            <div>
              <Pill>{t("hero.faculty")}</Pill>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                {t("hero.title")}
              </h1>
              <p className="mt-4 max-w-xl text-slate-600">
                {t("hero.description")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#scope"
                  className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
                >
                  {t("hero.btnExplore")}
                </a>
                <a
                  href="#milestones"
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {t("hero.btnRoadmap")}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid h-full place-items-center rounded-xl bg-gradient-to-br from-emerald-100 to-slate-100">
                  <img
                    src="/hero-image.webp"
                    alt={t("hero.imageAlt")}
                    className="h-full rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute -left-0 -top-10 z-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-xl" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
