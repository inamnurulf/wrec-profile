"use client";

import Section from "./atoms/Section";
import Card from "./atoms/Card";
import { CloudSun, Cpu, Droplets, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ResearchScope() {
  const t = useTranslations();

  const items = [
    {
      icon: <CloudSun className="h-6 w-6 text-emerald-700" />,
      title: t("scope.item1.title"),
      desc: t("scope.item1.desc"),
    },
    {
      icon: <Cpu className="h-6 w-6 text-emerald-700" />,
      title: t("scope.item2.title"),
      desc: t("scope.item2.desc"),
    },
    {
      icon: <Droplets className="h-6 w-6 text-emerald-700" />,
      title: t("scope.item3.title"),
      desc: t("scope.item3.desc"),
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-700" />,
      title: t("scope.item4.title"),
      desc: t("scope.item4.desc"),
    },
  ];

  return (
    <Section
      id="scope"
      eyebrow={t("scope.eyebrow")}
      title={t("scope.title")}
      desc={t("scope.desc")}
      data-aos="fade-up"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.title}
            data-aos="fade-up"
            data-aos-delay={i * 150} // stagger delay: 0, 150, 300, 450
            data-aos-duration="800"
          >
            <Card
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
