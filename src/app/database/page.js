"use client";
import { useMemo, useState } from "react";
import {
  Search,
  X,
  LayoutGrid,
  List as ListIcon,
  SortAsc,
  SortDesc,
  FileDown,
  Globe,
  FolderOpenDot,
} from "lucide-react";

/* -------------------- Mini UI bits (inline) -------------------- */
function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}
const fmtID = (iso) =>
  iso
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
        new Date(iso)
      )
    : "";

function Badge({ children, tone = "slate" }) {
  const map = {
    slate: "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200",
    green: "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    yellow: "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs ${map[tone]}`}
    >
      {children}
    </span>
  );
}

function Pagination({ page, pages, onPage }) {
  if (pages <= 1) return null;
  const nums = [];
  for (let i = 1; i <= pages; i++) nums.push(i);
  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPage(Math.max(1, page - 1))}
        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-40"
        disabled={page <= 1}
      >
        Prev
      </button>
      {nums.map((n) => (
        <button
          key={n}
          onClick={() => onPage(n)}
          className={classNames(
            "rounded-lg px-3 py-1.5 text-sm",
            n === page ? "bg-slate-900 text-white" : "hover:bg-slate-100"
          )}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onPage(Math.min(pages, page + 1))}
        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-40"
        disabled={page >= pages}
      >
        Next
      </button>
    </div>
  );
}

function Skeleton({ className = "" }) {
  return (
    <div
      className={classNames(
        "animate-pulse rounded-md bg-slate-200/70",
        className
      )}
    />
  );
}
function CardSkeleton({ compact = false }) {
  if (compact) {
    return (
      <div className="grid grid-cols-[1fr] gap-2 rounded-2xl border bg-white p-4 shadow-sm">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <Skeleton className="mb-2 h-5 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
      <div className="mt-3 flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
    </div>
  );
}

/* -------------------- Dummy data -------------------- */
const seed = [
  {
    id: crypto.randomUUID(),
    slug: "hydrology-report-2025",
    title: "Hydrology Report 2025",
    description: "Compiled rainfall & discharge datasets.",
    drive_link: "https://drive.google.com/file/d/1-demo/view",
    is_published: true,
    metadata: { owner: "WRECC", region: "DIY", version: 1 },
    created_at: new Date(Date.now() - 86400 * 1000 * 12).toISOString(),
    updated_at: new Date(Date.now() - 86400 * 1000 * 3).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    slug: "watershed-boundary-shapefile",
    title: "Watershed Boundary Shapefile",
    description: "ZIP berisi .shp, .dbf, .prj (EPSG:4326).",
    drive_link: "https://drive.google.com/file/d/2-demo/view",
    is_published: true,
    metadata: { epsg: 4326, size_mb: 14.2 },
    created_at: new Date(Date.now() - 86400 * 1000 * 7).toISOString(),
    updated_at: new Date(Date.now() - 86400 * 1000 * 2).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    slug: "rainfall-timeseries-2018-2025",
    title: "Rainfall Timeseries (2018–2025)",
    description: "CSV + README. Cleaned, checked missing values.",
    drive_link: "https://drive.google.com/file/d/3-demo/view",
    is_published: true,
    metadata: { stations: 37, rows: 102934 },
    created_at: new Date(Date.now() - 86400 * 1000 * 20).toISOString(),
    updated_at: new Date(Date.now() - 86400 * 1000 * 1).toISOString(),
  },
];

/* -------------------- File card -------------------- */
function FileCard({ f, compact = false }) {
  if (compact) {
    return (
      <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="min-w-0 truncate font-semibold">{f.title}</h3>
          {f.is_published ? (
            <Badge tone="green">Published</Badge>
          ) : (
            <Badge tone="yellow">Draft</Badge>
          )}
        </div>
        <p className="line-clamp-2 text-sm text-slate-600">
          {f.description || "—"}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>Diperbarui {fmtID(f.updated_at) || "—"}</span>
          <div className="flex items-center gap-2">
            <a
              href={f.drive_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 hover:bg-slate-50"
              title="Buka di Drive"
            >
              <Globe size={14} /> Open
            </a>
            <a
              href={f.drive_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 hover:bg-slate-50"
              title="Unduh"
            >
              <FileDown size={14} /> Download
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="min-w-0 truncate font-semibold">{f.title}</h3>
        {f.is_published ? (
          <Badge tone="green">Published</Badge>
        ) : (
          <Badge tone="yellow">Draft</Badge>
        )}
      </div>
      <p className="line-clamp-3 text-sm text-slate-600">
        {f.description || "—"}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>Diperbarui {fmtID(f.updated_at) || "—"}</span>
        <div className="flex items-center gap-2">
          <a
            href={f.drive_link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 hover:bg-slate-50"
            title="Buka di Drive"
          >
            <Globe size={14} /> Open
          </a>
          <a
            href={f.drive_link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 hover:bg-slate-50"
            title="Unduh"
          >
            <FileDown size={14} /> Download
          </a>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Page -------------------- */
export default function PublicFilesDummyPage() {
  // local UI state
  const [q, setQ] = useState("");
  const [view, setView] = useState("grid"); // "grid" | "list"
  const [sort, setSort] = useState("created_desc"); // created_desc|created_asc|title_asc|title_desc
  const [page, setPage] = useState(1);
  const limit = 12;

  // derive filtered/sorted items from dummy data
  const filtered = useMemo(() => {
    let rows = seed.filter((r) => r.is_published); // public page → only published
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      rows = rows.filter(
        (r) =>
          r.title.toLowerCase().includes(s) ||
          (r.description || "").toLowerCase().includes(s)
      );
    }
    const byCreated = (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    const byTitle = (a, b) => a.title.localeCompare(b.title);
    switch (sort) {
      case "created_asc":
        rows.sort(byCreated);
        break;
      case "title_asc":
        rows.sort(byTitle);
        break;
      case "title_desc":
        rows.sort((a, b) => -byTitle(a, b));
        break;
      default:
        rows.sort((a, b) => -byCreated(a, b));
    }
    return rows;
  }, [q, sort]);

  const meta = useMemo(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / limit));
    return { total: filtered.length, pages, page, limit };
  }, [filtered.length, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

  const skeletonCount =
    view === "list" ? Math.min(limit, 8) : Math.min(limit, 12);

  const onChangeSearch = (v) => {
    setQ(v);
    if (page !== 1) setPage(1);
  };

  const headerNote = useMemo(() => {
    const parts = [];
    parts.push(`Menampilkan ${meta.total} file`);
    if (q) parts.push(`dengan kata kunci "${q}"`);
    return parts.join(" ");
  }, [meta.total, q]);

  // no dark mode: no theme toggles, no dark classes
  const loading = false;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 min-h-[80vh]">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Data & Documents
        </h1>
        <div className="mt-2 h-1 w-16 rounded bg-emerald-500" />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700">
          Database ini disediakan oleh WRECC (Water Resources Engineering and
          Climate Center) sebagai media publikasi dan pusat informasi. Seluruh
          konten yang ditampilkan merupakan bagian dari upaya WRECC dalam
          mendukung riset, edukasi, serta kolaborasi di bidang sumber daya air
          dan perubahan iklim. Data yang tersedia dapat digunakan untuk
          keperluan akademik maupun referensi publik dengan tetap menghormati
          ketentuan penggunaan yang berlaku. Setiap penyalahgunaan, penggandaan
          tanpa izin, maupun distribusi di luar ketentuan yang ditetapkan tidak
          diperbolehkan.
          <span className="mt-3 block font-medium text-slate-800">
            Hak cipta © 2025 WRECC. Semua hak dilindungi undang-undang.
          </span>
        </p>
      </div>

      {/* Toolbar */}
      <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => onChangeSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400"
              placeholder="Cari judul atau deskripsi…"
            />
            {q && (
              <button
                onClick={() => onChangeSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 rounded-xl border bg-white px-2 py-1.5 text-sm">
            <span className="hidden px-2 text-slate-500 sm:inline">
              Urutkan
            </span>
            <button
              onClick={() => {
                setSort("created_desc");
                setPage(1);
              }}
              className={classNames(
                "inline-flex items-center gap-1 rounded-lg px-2 py-1",
                sort === "created_desc" && "bg-slate-100"
              )}
              title="Terbaru"
            >
              <SortDesc className="h-4 w-4" />
              <span className="hidden sm:inline">Terbaru</span>
            </button>
            <button
              onClick={() => {
                setSort("created_asc");
                setPage(1);
              }}
              className={classNames(
                "inline-flex items-center gap-1 rounded-lg px-2 py-1",
                sort === "created_asc" && "bg-slate-100"
              )}
              title="Terlama"
            >
              <SortAsc className="h-4 w-4" />
              <span className="hidden sm:inline">Terlama</span>
            </button>
            <button
              onClick={() => {
                setSort(sort === "title_asc" ? "title_desc" : "title_asc");
                setPage(1);
              }}
              className={classNames(
                "inline-flex items-center gap-1 rounded-lg px-2 py-1",
                (sort === "title_asc" || sort === "title_desc") &&
                  "bg-slate-100"
              )}
              title="A → Z / Z → A"
            >
              A↔Z
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-xl border">
            <button
              onClick={() => setView("grid")}
              className={classNames(
                "inline-flex items-center gap-2 px-3 py-2 text-sm",
                view === "grid" ? "bg-slate-100" : "bg-white"
              )}
              title="Grid"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={classNames(
                "inline-flex items-center gap-2 px-3 py-2 text-sm",
                view === "list" ? "bg-slate-100" : "bg-white"
              )}
              title="List"
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Result count */}
      <div className="mb-4 text-sm text-slate-600">{headerNote}</div>

      {/* List */}
      {loading ? (
        view === "grid" ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <CardSkeleton key={i} compact />
            ))}
          </div>
        )
      ) : pageItems.length > 0 ? (
        view === "grid" ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((f) => (
              <FileCard key={f.id} f={f} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pageItems.map((f) => (
              <FileCard key={f.id} f={f} compact />
            ))}
          </div>
        )
      ) : (
        // Empty state
        <div className="mt-12 rounded-2xl border bg-white p-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <FolderOpenDot className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-slate-700">Tidak ada file yang cocok.</p>
          {q && (
            <button
              onClick={() => {
                setQ("");
                setPage(1);
              }}
              className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
            >
              Hapus kata kunci
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {meta.pages > 1 && (
        <div className="mt-8">
          <Pagination
            page={meta.page}
            pages={meta.pages}
            onPage={(p) => setPage(p)}
          />
        </div>
      )}
    </div>
  );
}
