"use client";

import Section from "./atoms/Section";
import Card from "./atoms/Card";
import { Cpu, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations(); // same single messages file

  return (
    <Section
      id="about"
      eyebrow={t("about.eyebrow")}
      title={t("about.title")}
      desc={t("about.desc")}
      data-aos="fade-up"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div data-aos="fade-right" data-aos-delay="100">
          <Card
            icon={<Cpu className="h-6 w-6 text-emerald-700" />}
            title={t("about.card1.title")}
            desc={t("about.card1.desc")}
          />
        </div>

        <div data-aos="fade-left" data-aos-delay="200">
          <Card
            icon={<Users className="h-6 w-6 text-emerald-700" />}
            title={t("about.card2.title")}
            desc={t("about.card2.desc")}
          />
        </div>
      </div>
    </Section>
  );
}
