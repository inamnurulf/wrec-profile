"use client";

import Section from "./atoms/Section";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Vision() {
  const t = useTranslations();

  const points = [
    { key: "point1", delay: 100 },
    { key: "point2", delay: 200 },
    { key: "point3", delay: 300 },
  ];

  return (
    <Section
      id="vision"
      eyebrow={t("vision.eyebrow")}
      title={t("vision.title")}
      desc={t("vision.desc")}
      data-aos="fade-up"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {points.map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: p.delay / 1000 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur transition-all hover:border-emerald-500 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold">
                {i + 1}
              </div>
              <p className="text-slate-700 leading-relaxed">{t(`vision.${p.key}`)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
