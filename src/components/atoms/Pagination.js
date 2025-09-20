import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pages, onPage }) {
  const go = (p) => onPage(Math.min(Math.max(1, p), pages));
  return (
    <div className="flex items-center justify-center gap-2">
      <button onClick={() => go(page - 1)} disabled={page === 1} className="rounded-full border px-3 py-1.5 text-sm disabled:opacity-40">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="text-sm text-slate-600">Halaman {page} dari {pages}</span>
      <button onClick={() => go(page + 1)} disabled={page === pages} className="rounded-full border px-3 py-1.5 text-sm disabled:opacity-40">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}