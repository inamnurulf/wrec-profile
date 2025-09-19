import Container from "./atoms/Container";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white font-bold">W</div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">WRECC</p>
              <p className="text-xs text-slate-500">Data, Innovation & Resilience</p>
            </div>
          </a>
          <nav className="hidden gap-6 text-sm font-medium text-slate-700 sm:flex">
            <a href="#about" className="hover:text-emerald-700">About</a>
            <a href="#vision" className="hover:text-emerald-700">Vision</a>
            <a href="#scope" className="hover:text-emerald-700">Research</a>
            <a href="#milestones" className="hover:text-emerald-700">Milestones</a>
            <a href="#team" className="hover:text-emerald-700">Team</a>
            <a href="#contact" className="hover:text-emerald-700">Contact</a>
          </nav>
          <a href="#contact" className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">Get in touch</a>
        </div>
      </Container>
    </header>
  );
}