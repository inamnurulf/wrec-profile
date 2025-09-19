import Section from "./atoms/Section";

export default  function Vision() {
  return (
    <Section id="vision" eyebrow="Our Vision" title="Socio‑Hydro‑Climate leadership for a resilient future" desc="We enhance knowledge exchange, educate the next generation, coordinate interdisciplinary initiatives, and build bridges with partners.">
      <ul className="grid gap-3 text-slate-700 sm:grid-cols-2">
        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" /> Enhance exchange of ideas across disciplines.</li>
        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" /> Educate problem‑solvers on water, climate, and equity.</li>
        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" /> Coordinate new programs, facilities, and services.</li>
        <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" /> Build bridges with academic, public, and international partners.</li>
      </ul>
    </Section>
  );
}
