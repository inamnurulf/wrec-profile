"use client";

import Section from "./atoms/Section";
import { Mail, Phone, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations();

  return (
    <Section
      id="contact"
      eyebrow={t("contact.eyebrow")}
      title={t("contact.title")}
      desc={t("contact.desc")}
      data-aos="fade-right"
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <a
          href="mailto:wrecc@ugm.mail.ac.id"
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <Mail className="h-5 w-5 text-emerald-700" />
          <span>wrecc@ugm.mail.ac.id</span>
        </a>

        <div
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <Phone className="h-5 w-5 text-emerald-700" />
          <span>+62 8817412516</span>
        </div>

        <div
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <Globe className="h-5 w-5 text-emerald-700" />
          <span>wrecc.tp.ugm.ac.id</span>
        </div>
      </div>
    </Section>
  );
}
