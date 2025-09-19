import Section from "./atoms/Section";
import { Mail, Phone, Globe } from "lucide-react";

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch" desc="We’d love to collaborate on research, training, and community impact.">
      <div className="grid gap-6 sm:grid-cols-3">
        <a href="mailto:wrecc@ugm.mail.ac.id" className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
          <Mail className="h-5 w-5 text-emerald-700" />
          <span>wrecc@ugm.mail.ac.id</span>
        </a>
        <a href="tel:+62821221212121" className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
          <Phone className="h-5 w-5 text-emerald-700" />
          <span>+62 8212 2121 2121</span>
        </a>
        <a href="https://wrecc.tp.ugm.ac.id" className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
          <Globe className="h-5 w-5 text-emerald-700" />
          <span>wrecc.tp.ugm.ac.id</span>
        </a>
      </div>
    </Section>
  );
}
