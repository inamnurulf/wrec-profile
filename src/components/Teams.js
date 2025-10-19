"use client";

import Section from "./atoms/Section";
import { useTranslations } from "next-intl";

export default function Team() {
  const t = useTranslations();

  const members = [
    { name: "Prof. Sigit Supadmo Arif", role: t("team.role.advisor") },
    { name: "Muhamad Khoiru Zaki, Ph.D", role: t("team.role.climateHead") },
    { name: "Hanggar Ganara Mawandha, Ph.D", role: t("team.role.waterHead") },
    { name: "Yunita Nur Azizah, S.T.P", role: t("team.role.climateMember") },
    { name: "Nindya Marsya Larasati, S.Sos", role: t("team.role.community") },
    { name: "Issiami Nursafa, S.T.P", role: t("team.role.waterMember") },
  ];

  return (
    <Section
      id="team"
      eyebrow={t("team.eyebrow")}
      title={t("team.title")}
      desc={t("team.desc")}
      data-aos="fade-up"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m, i) => (
          <div
            key={m.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            data-aos="zoom-in-up"
            data-aos-delay={i * 100} // stagger each card
          >
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700 font-semibold">
                {m.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold leading-tight">{m.name}</p>
                <p className="text-sm text-slate-600">{m.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
