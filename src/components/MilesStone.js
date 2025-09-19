import Section from "./atoms/Section";
import { CalendarCheck } from "lucide-react";

export default function Milestones() {
  const roadmap = [
    { year: "2026", text: "Establish a 5‑Year Research Roadmap for climate‑adaptive irrigation, flood & drought resilience, climate projections, and the water‑energy‑food nexus." },
    { year: "2028", text: "Launch annual joint research programs, international publications, policy briefs, seminars, and workshops with partners." },
    { year: "2030", text: "Expand short courses and training for governments and communities to strengthen water & climate adaptation capacity." },
    { year: "2040", text: "Achieve full integration of research, education, and outreach; become a national & Asia‑Pacific reference hub." },
  ];

  return (
    <Section id="milestones" eyebrow="Future Plans & Milestones" title="Roadmap to 2040">
      <ol className="relative border-s border-slate-200 pl-6">
        {roadmap.map((m) => (
          <li key={m.year} className="mb-8">
            <div className="absolute -left-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600" />
            <div className="flex items-start gap-3">
              <CalendarCheck className="mt-0.5 h-5 w-5 text-emerald-700" />
              <div>
                <p className="text-sm font-semibold text-emerald-700">{m.year}</p>
                <p className="mt-1 text-slate-700">{m.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}