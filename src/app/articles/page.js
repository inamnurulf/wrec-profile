"use client";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  X,
  CalendarDays,
  User,
  Tag as TagIcon,
  LayoutGrid,
  List as ListIcon,
  ArrowRight,
  SortAsc,
  SortDesc,
} from "lucide-react";

import ArticleCard from "@/components/ArticleCard";
import Badge from "@/components/atoms/Badge";
import Pagination from "@/components/atoms/Pagination";
import parseIndoDate from "@/helper/parseIndoDate";
import slugify from "@/helper/slugify";

// --- Utilities ---




function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}




const DUMMY = [
  {
    title: "Optimasi Irigasi Berbasis Sensor untuk Pertanian Berkelanjutan",
    author: {
      name: "Dr. Arif Wibowo",
      role: "Hydrology Researcher",
      avatar:
        "https://images.unsplash.com/photo-1603575448360-9b67d0a51f1a?q=80&w=400&auto=format&fit=crop",
    },
    date: "Kamis, 19 Juni 2025",
    hero:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
    tags: ["Irigasi", "Pertanian", "Teknologi"],
    excerpt:
      "Pemanfaatan sensor kelembapan tanah untuk mengatur distribusi air yang lebih efisien di lahan pertanian.",
  },
  {
    title: "Dampak Perubahan Iklim terhadap Sumber Daya Air di Indonesia",
    author: {
      name: "Prof. Ratna Dewi",
      role: "Climate Specialist",
      avatar:
        "https://images.unsplash.com/photo-1542282811-943ef1a977c1?q=80&w=400&auto=format&fit=crop",
    },
    date: "Senin, 05 Mei 2025",
    hero:
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600&auto=format&fit=crop",
    tags: ["Iklim", "Air", "Adaptasi"],
    excerpt:
      "Analisis tren iklim terbaru dan implikasinya bagi ketersediaan air di kawasan tropis.",
  },
  {
    title: "Model Hidrologi: Prediksi Banjir dengan Machine Learning",
    author: { name: "Rizki Putra", role: "Data Analyst" },
    date: "Jumat, 14 Maret 2025",
    hero:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1600&auto=format&fit=crop",
    tags: ["Hidrologi", "Banjir", "AI"],
    excerpt:
      "Penerapan algoritma pembelajaran mesin untuk memperkirakan risiko banjir di DAS perkotaan.",
  },
  {
    title: "Pengelolaan Waduk untuk Mitigasi Kekeringan",
    author: { name: "Andi Saputra", role: "Water Resources Advisor" },
    date: "Rabu, 30 April 2025",
    hero:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
    tags: ["Waduk", "Kekeringan", "Manajemen Air"],
    excerpt:
      "Strategi pengaturan pelepasan air waduk untuk menekan dampak musim kemarau panjang.",
  },
  {
    title: "Sistem Peringatan Dini Banjir di Wilayah Perkotaan",
    author: { name: "Laras N.", role: "Disaster Risk Engineer" },
    date: "Selasa, 11 Februari 2025",
    hero:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop",
    tags: ["Banjir", "IoT", "Mitigasi"],
    excerpt:
      "Mengintegrasikan sensor IoT dan data satelit untuk sistem peringatan dini yang lebih akurat.",
  },
  {
    title: "Jejak Karbon Sektor Air: Dari Pembangunan hingga Operasional",
    author: { name: "Siti Hanifah", role: "Environmental Analyst" },
    date: "Kamis, 22 Mei 2025",
    hero:
      "https://images.unsplash.com/photo-1497493292307-31c376b6e479?q=80&w=1600&auto=format&fit=crop",
    tags: ["Karbon", "Energi", "Air"],
    excerpt:
      "Evaluasi emisi karbon pada infrastruktur air dan peluang reduksinya melalui energi terbarukan.",
  },
  {
    title: "Peran DAS dalam Menjaga Keseimbangan Ekosistem",
    author: { name: "Dimas T.", role: "Researcher" },
    date: "Sabtu, 18 Januari 2025",
    hero:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
    tags: ["DAS", "Ekosistem", "Konservasi"],
    excerpt:
      "Bagaimana pengelolaan daerah aliran sungai mendukung ketahanan air dan keanekaragaman hayati.",
  },
  {
    title: "7 Indikator Kualitas Air yang Wajib Dipantau",
    author: { name: "Nadya Pramudita", role: "Lab Associate" },
    date: "Minggu, 27 April 2025",
    hero:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
    tags: ["Kualitas Air", "Monitoring"],
    excerpt:
      "Parameter penting seperti pH, DO, BOD, hingga TSS yang menentukan kesehatan ekosistem perairan.",
  },
  {
    title: "Kesalahan Umum dalam Pemodelan Hidrologi",
    author: { name: "Rama A.", role: "Hydrologist" },
    date: "Senin, 7 Juli 2025",
    hero:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
    tags: ["Hidrologi", "Modeling"],
    excerpt:
      "Mengulas bias data, asumsi model, dan keterbatasan input dalam simulasi hidrologi.",
  },
  {
    title: "Membangun Infrastruktur Hijau untuk Kota Tahan Iklim",
    author: { name: "Joshua Lim", role: "Urban Planner" },
    date: "Selasa, 29 Juli 2025",
    hero:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
    tags: ["Kota", "Infrastruktur Hijau", "Iklim"],
    excerpt:
      "Solusi berbasis alam seperti taman resapan dan bio-swale untuk menekan risiko banjir perkotaan.",
  },
];



// --- Main Component ---
export default function ArticlesFrontPage() {
  const [q, setQ] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const allTags = useMemo(() => {
    const s = new Set();
    DUMMY.forEach((a) => a.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const qn = q.trim().toLowerCase();
    let list = DUMMY.filter((a) => {
      const text = `${a.title} ${a.excerpt ?? ""} ${a.author.name} ${a.tags.join(" ")}`.toLowerCase();
      const matchesQ = qn ? text.includes(qn) : true;
      const matchesTags = activeTags.length
        ? activeTags.every((t) => a.tags.includes(t))
        : true;
      return matchesQ && matchesTags;
    });

    list = list.sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      const da = parseIndoDate(a.date)?.getTime() ?? 0;
      const db = parseIndoDate(b.date)?.getTime() ?? 0;
      return sort === "newest" ? db - da : da - db;
    });

    return list;
  }, [q, activeTags, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  // Featured article = first of newest filtered list
  const featured = filtered[0] ?? DUMMY[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Featured */}
      <section className="relative mb-10 overflow-hidden rounded-3xl border bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img src={featured.hero} alt={featured.title} className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/40 to-transparent" />
        </div>
        <div className="relative grid gap-6 p-6 sm:grid-cols-2 sm:p-10">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {featured.tags.slice(0, 3).map((t) => (
                <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">{t}</span>
              ))}
            </div>
            <h1 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">{featured.title}</h1>
            {featured.excerpt && (
              <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">{featured.excerpt}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-200/90">
              <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" />{featured.date}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-2"><User className="h-4 w-4" />{featured.author.name}{featured.author.role ? ` · ${featured.author.role}` : ""}</span>
            </div>
            <a href={`/articles/${slugify(featured.title)}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 font-medium text-slate-900 hover:bg-emerald-300">
              Baca unggulan <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400"
              placeholder="Cari judul, tag, atau penulis..."
            />
            {q && (
              <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setActiveTags([]);
              setQ("");
              setSort("newest");
              setPage(1);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <Filter className="h-4 w-4" /> Reset
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-xl border">
            <button
              onClick={() => setView("grid")}
              className={classNames("inline-flex items-center gap-2 px-3 py-2 text-sm", view === "grid" ? "bg-slate-100" : "bg-white")}
              title="Grid"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={classNames("inline-flex items-center gap-2 px-3 py-2 text-sm", view === "list" ? "bg-slate-100" : "bg-white")}
              title="List"
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-1 rounded-xl border bg-white px-2 py-1.5 text-sm">
            <span className="hidden px-2 text-slate-500 sm:inline">Urutkan</span>
            <button
              onClick={() => setSort("newest")}
              className={classNames("inline-flex items-center gap-1 rounded-lg px-2 py-1", sort === "newest" && "bg-slate-100")}
              title="Terbaru"
            >
              <SortDesc className="h-4 w-4" />
              <span className="hidden sm:inline">Terbaru</span>
            </button>
            <button
              onClick={() => setSort("oldest")}
              className={classNames("inline-flex items-center gap-1 rounded-lg px-2 py-1", sort === "oldest" && "bg-slate-100")}
              title="Terlama"
            >
              <SortAsc className="h-4 w-4" />
              <span className="hidden sm:inline">Terlama</span>
            </button>
            <button
              onClick={() => setSort("az")}
              className={classNames("inline-flex items-center gap-1 rounded-lg px-2 py-1", sort === "az" && "bg-slate-100")}
              title="A → Z"
            >
              A→Z
            </button>
          </div>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="mb-6 flex flex-wrap items-center gap-2">
        {allTags.map((t) => (
          <Badge
            key={t}
            active={activeTags.includes(t)}
            onClick={() => {
              setPage(1);
              setActiveTags((prev) =>
                prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
              );
            }}
          >
            {t}
          </Badge>
        ))}
        {activeTags.length > 0 && (
          <button onClick={() => setActiveTags([])} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
            Bersihkan <X className="h-3.5 w-3.5" />
          </button>
        )}
      </section>

      {/* Result Count */}
      <div className="mb-4 text-sm text-slate-600">
        Menampilkan <span className="font-semibold">{filtered.length}</span> artikel
        {activeTags.length ? (
          <>
            {" "}dengan tag {activeTags.map((t) => (
              <span key={t} className="mx-0.5 rounded bg-slate-100 px-1.5 py-0.5 text-[11px]">{t}</span>
            ))}
          </>
        ) : null}
        {q ? (
          <>
            {" "}yang cocok dengan kata kunci <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[11px]">{q}</span>
          </>
        ) : null}
      </div>

      {/* List */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((a) => (
            <ArticleCard key={a.title} a={a} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {paged.map((a) => (
            <ArticleCard key={a.title} a={a} compact />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="mt-12 rounded-2xl border bg-white p-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <TagIcon className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-slate-700">Tidak ada artikel yang cocok dengan filter saat ini.</p>
          <button onClick={() => { setActiveTags([]); setQ(""); }} className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700">Hapus filter</button>
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="mt-8">
          <Pagination page={page} pages={pages} onPage={setPage} />
        </div>
      )}

      {/* Footer note */}
      <p className="mt-10 text-center text-xs text-slate-500">
        * Halaman ini hanya demo frontend dengan data dummy. Hubungkan ke API nyata untuk produksi.
      </p>
    </div>
  );
}
