import Container from "./Container";
export default function Section({ id, eyebrow, title, desc, children }) {
  return (
    <section id={id} className="py-16 sm:py-20">
      <Container>
        <div className="mb-8">
          {eyebrow && <p className="text-sm font-semibold tracking-widest text-emerald-700 uppercase">{eyebrow}</p>}
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          {desc && <p className="mt-3 max-w-3xl text-slate-600">{desc}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}
