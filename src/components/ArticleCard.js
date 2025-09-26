import { ArrowRight, Bookmark, CalendarDays, User } from "lucide-react";
import classNames from "@/helper/className";
import slugify from "@/helper/slugify";


  const toLocalDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    const pad = (n) => n.toString().padStart(2, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    return `${yyyy}-${mm}-${dd}`;
  };


export default function ArticleCard({ a, compact = false }) {
  const slug = slugify(a.title);
  return (
    <article className={classNames("group overflow-hidden rounded-2xl border bg-white", compact ? "grid grid-cols-[120px_1fr]" : "")}
    >
      <div className={classNames("relative", compact ? "h-full" : "h-48 sm:h-56 md:h-44")}
        style={compact ? { minHeight: 120 } : {}}
      >
        <img src={a.hero} alt={a.title} className={classNames("h-full w-full object-cover transition-transform duration-300 group-hover:scale-105", compact ? "rounded-l-2xl" : "rounded-t-2xl")} />
        <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-md backdrop-blur transition hover:bg-white">
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
      <div className={classNames("p-4 sm:p-5", compact ? "" : "")}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{toLocalDate(a.published_at)}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-2"><User className="h-3.5 w-3.5" />{a.author?.name}</span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-slate-900">
          {a.title}
        </h3>
        {a.excerpt && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">{a.excerpt}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {a.tags.map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700">{t}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-emerald-600">
          <a href={`/articles/${slug}`} className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
            Baca selengkapnya <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}