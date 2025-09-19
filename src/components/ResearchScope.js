import Section from "./atoms/Section";
import Card from "./atoms/Card";
import { CloudSun, Cpu, Droplets, Users } from "lucide-react";


export default function ResearchScope() {
  const items = [
    {
      icon: <CloudSun className="h-6 w-6 text-emerald-700" />, 
      title: "Historical & Future Hydro‑Climate Database",
      desc: "A comprehensive database of past and projected hydrological and climate data for trend analysis, scenario modeling, and long‑term planning.",
    },
    {
      icon: <Cpu className="h-6 w-6 text-emerald-700" />, 
      title: "Hydro‑Climate Informatics & Technology",
      desc: "Decision‑support systems, hydroinformatics, and GIS‑based analysis to improve water security and resilience.",
    },
    {
      icon: <Droplets className="h-6 w-6 text-emerald-700" />, 
      title: "Socio‑Hydro‑Climate & Innovative Technologies",
      desc: "Tools that combine social, hydrological, and climate knowledge to support irrigation and community‑based water management.",
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-700" />, 
      title: "Community‑Based Management",
      desc: "Participatory irrigation, rural water development, and capacity building for equitable governance and sustainability.",
    },
  ];

  return (
    <Section id="scope" eyebrow="Research Scope" title="Advancing Socio‑Hydro‑Climate Research">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Card key={item.title} icon={item.icon} title={item.title} desc={item.desc} />
        ))}
      </div>
    </Section>
  );
}
