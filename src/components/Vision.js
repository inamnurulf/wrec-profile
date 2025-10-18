"use client";

import Section from "./atoms/Section";
import { useTranslations } from "next-intl";

export default function Vision() {
  const t = useTranslations();

  return (
    <Section
      id="vision"
      eyebrow={t("vision.eyebrow")}
      title={t("vision.title")}
      desc={t("vision.desc")}
    >
      <ul className="grid gap-3 text-slate-700 sm:grid-cols-2">
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
          {t("vision.point1")}
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
          {t("vision.point2")}
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
          {t("vision.point3")}
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
          {t("vision.point4")}
        </li>
      </ul>
    </Section>
  );
}
