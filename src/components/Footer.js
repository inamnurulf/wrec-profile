import Container from "./atoms/Container";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-600">© 2025 WRECC — Universitas Gadjah Mada</p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Data</span>
            <span>•</span>
            <span>Innovation</span>
            <span>•</span>
            <span>Resilience</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}