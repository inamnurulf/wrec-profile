"use client";

import Container from "./atoms/Container";
import Pill from "./atoms/Pill";
import { Droplets } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
      <Container>
        <div className="grid gap-8 py-16 sm:py-24 md:grid-cols-2 md:items-center">
          <div>
            <Pill>Faculty of Agricultural Technology · UGM</Pill>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Water Resources Engineering & Climate Center
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              We advance socio-hydro-climate understanding and co-create
              innovative approaches to build a sustainable and resilient future
              for water, climate, and society.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#scope"
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Explore research
              </a>
              <a
                href="#milestones"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                See roadmap
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid h-full place-items-center rounded-xl bg-gradient-to-br from-emerald-100 to-slate-100">
                <img
                  src="/hero-image.jpg"
                  alt="Hero Image"
                  className="h-full rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute -left-10 -top-10 -z-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
