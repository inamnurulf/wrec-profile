"use client";

import Section from "./atoms/Section";
import { CalendarCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Milestones() {
  const t = useTranslations();

  const roadmap = [
    { year: "2026", text: t("milestones.item1") },
    { year: "2028", text: t("milestones.item2") },
    { year: "2030", text: t("milestones.item3") },
    { year: "2040", text: t("milestones.item4") },
  ];

  return (
    <Section
      id="milestones"
      eyebrow={t("milestones.eyebrow")}
      title={t("milestones.title")}
      desc={t("milestones.desc")}
      data-aos="fade-up"
    >
      <ul className="relative list-none border-s border-slate-200 pl-6">
        {roadmap.map((m, i) => (
          <li
            key={m.year}
            className="mb-8 list-none" 
            data-aos="fade-up"
            data-aos-delay={i * 150}
            data-aos-duration="800"
            
          >
            {/* <div className="absolute -left-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600" /> */}
            <div className="flex items-start gap-3">
              <CalendarCheck className="mt-0.5 h-5 w-5 text-emerald-700" />
              <div>
                <p className="text-sm font-semibold text-emerald-700">{m.year}</p>
                <p className="mt-1 text-slate-700">{m.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
