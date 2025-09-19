import Section from "./atoms/Section";
import Card from "./atoms/Card";
import { Cpu, Users } from "lucide-react";


export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Data, Innovation, and Resilience" desc="A hub for integrated water–climate research, education, and outreach at Universitas Gadjah Mada.">
      <div className="grid gap-6 sm:grid-cols-2">
        <Card
          icon={<Cpu className="h-6 w-6 text-emerald-700" />}
          title="Hydro-Climate Informatics"
          desc="Advanced models, decision-support systems, and digital platforms (incl. GIS and integrated modeling) to predict and mitigate water-related risks."
        />
        <Card
          icon={<Users className="h-6 w-6 text-emerald-700" />}
          title="Community-Based Management"
          desc="Empowering local communities through participatory irrigation, rural water development, and watershed conservation with training and consultancy."
        />
      </div>
    </Section>
  );
}