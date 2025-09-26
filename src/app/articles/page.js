"use client";
import { useMemo } from "react";
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
import Image from "next/image";
import slugify from "@/helper/slugify";
import ArticleCard from "@/components/ArticleCard";
import Badge from "@/components/atoms/Badge";
import Pagination from "@/components/atoms/Pagination";
import { useGetTagsQuery, useListArticlesQuery } from "@/services/public.api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setQ,
  toggleTag,
  clearTags,
  setSort,
  setView,
  setPage,
  reset,
} from "@/store/slices/article.slice";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}
const fmtID = (iso) =>
  iso
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
        new Date(iso)
      )
    : "";

export default function ArticlesFrontPage() {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((s) => s.articlesUI);

  const { data: tagsResp, isLoading: tagsLoading } = useGetTagsQuery();

  // Build slug->id map from /tags
  const tagSlugToId = useMemo(() => {
    const m = new Map();
    (tagsResp?.data ?? []).forEach((t) => m.set(slugify(t.name), t.id));
    return m;
  }, [tagsResp]);

  // Convert selected tags (names) -> numeric IDs
  const tag_ids = useMemo(
    () => ui.tags.map((t) => tagSlugToId.get(slugify(t))).filter(Boolean),
    [ui.tags, tagSlugToId]
  );

  const {
    data: articlesResp,
    isLoading,
    isError,
  } = useListArticlesQuery({
    q: ui.q || undefined,
    tag_ids, // <— numeric IDs for backend
    // category_id: ui.category_id, // if you have category filtering
    sort: ui.sort, // "newest" | "oldest" | "az"
    page: ui.page,
    limit: ui.limit,
  });

  const articles = articlesResp?.data?.items ?? [];
  console.log("this is the articles :", articles)
  const meta = articlesResp
    ? {
        page: articlesResp.data.page,
        limit: articlesResp.data.limit,
        total: articlesResp.data.total,
        pages: Math.ceil(articlesResp.data.total / articlesResp.data.limit),
      }
    : { page: 1, limit: ui.limit, total: 0, pages: 1 };

  const allTags = useMemo(
    () =>
      (tagsResp?.data ?? [])
        .map((t) => t.name)
        .sort((a, b) => a.localeCompare(b)),
    [tagsResp]
  );

  // First item from server-sorted list
  const featured = articles[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Featured */}
      {featured && (
        <section className="relative mb-10 overflow-hidden rounded-3xl border bg-slate-900 text-white">
          <div className="absolute inset-0">
            {featured.hero && (
              <Image
                src={featured.hero}
                alt={featured.title}
                fill
                className="object-cover opacity-50"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/40 to-transparent" />
          </div>
          <div className="relative grid gap-6 p-6 sm:grid-cols-2 sm:p-10">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {(featured.tags ?? []).slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
                {featured.title}
              </h1>
              {featured.summary && (
                <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
                  {featured.summary}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-200/90">
                {featured.published_at && (
                  <>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {fmtID(featured.published_at)}
                    </span>
                    <span>•</span>
                  </>
                )}
                {featured.author?.name && (
                  <span className="inline-flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {featured.author.name}
                    {featured.author.role ? ` · ${featured.author.role}` : ""}
                  </span>
                )}
              </div>
              <a
                href={`/articles/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 font-medium text-slate-900 hover:bg-emerald-300"
              >
                Baca unggulan <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Toolbar */}
      <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={ui.q}
              onChange={(e) => dispatch(setQ(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400"
              placeholder="Cari judul, tag, atau penulis..."
            />
            {ui.q && (
              <button
                onClick={() => dispatch(setQ(""))}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => dispatch(reset())}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <Filter className="h-4 w-4" /> Reset
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-xl border">
            <button
              onClick={() => dispatch(setView("grid"))}
              className={classNames(
                "inline-flex items-center gap-2 px-3 py-2 text-sm",
                ui.view === "grid" ? "bg-slate-100" : "bg-white"
              )}
              title="Grid"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => dispatch(setView("list"))}
              className={classNames(
                "inline-flex items-center gap-2 px-3 py-2 text-sm",
                ui.view === "list" ? "bg-slate-100" : "bg-white"
              )}
              title="List"
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-1 rounded-xl border bg-white px-2 py-1.5 text-sm">
            <span className="hidden px-2 text-slate-500 sm:inline">
              Urutkan
            </span>
            <button
              onClick={() => {
                dispatch(setSort("newest"));
                dispatch(setPage(1));
              }}
              className={classNames(
                "inline-flex items-center gap-1 rounded-lg px-2 py-1",
                ui.sort === "newest" && "bg-slate-100"
              )}
              title="Terbaru"
            >
              <SortDesc className="h-4 w-4" />
              <span className="hidden sm:inline">Terbaru</span>
            </button>
            <button
              onClick={() => {
                dispatch(setSort("oldest"));
                dispatch(setPage(1));
              }}
              className={classNames(
                "inline-flex items-center gap-1 rounded-lg px-2 py-1",
                ui.sort === "oldest" && "bg-slate-100"
              )}
              title="Terlama"
            >
              <SortAsc className="h-4 w-4" />
              <span className="hidden sm:inline">Terlama</span>
            </button>
            <button
              onClick={() => {
                dispatch(setSort("az"));
                dispatch(setPage(1));
              }}
              className={classNames(
                "inline-flex items-center gap-1 rounded-lg px-2 py-1",
                ui.sort === "az" && "bg-slate-100"
              )}
              title="A → Z"
            >
              A→Z
            </button>
          </div>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="mb-6 flex flex-wrap items-center gap-2">
        {tagsLoading ? (
          <span className="text-xs text-slate-500">Loading tags…</span>
        ) : (
          allTags.map((t) => (
            <Badge
              key={t}
              active={ui.tags.includes(t)}
              onClick={() => dispatch(toggleTag(t))}
            >
              {t}
            </Badge>
          ))
        )}
        {ui.tags.length > 0 && (
          <button
            onClick={() => dispatch(clearTags())}
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
          >
            Bersihkan <X className="h-3.5 w-3.5" />
          </button>
        )}
      </section>

      {/* Result Count */}
      <div className="mb-4 text-sm text-slate-600">
        {isLoading ? (
          "Memuat artikel…"
        ) : (
          <>
            Menampilkan <span className="font-semibold">{meta.total}</span>{" "}
            artikel
            {ui.tags.length ? (
              <>
                {" "}
                dengan tag{" "}
                {ui.tags.map((t) => (
                  <span
                    key={t}
                    className="mx-0.5 rounded bg-slate-100 px-1.5 py-0.5 text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </>
            ) : null}
            {ui.q ? (
              <>
                {" "}
                yang cocok dengan kata kunci{" "}
                <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[11px]">
                  {ui.q}
                </span>
              </>
            ) : null}
          </>
        )}
      </div>

      {/* List */}
      {!isLoading &&
        !isError &&
        (ui.view === "grid" ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {articles.map((a) => (
              <ArticleCard key={a.id} a={a} compact />
            ))}
          </div>
        ))}

      {/* Empty State */}
      {!isLoading && !isError && articles.length === 0 && (
        <div className="mt-12 rounded-2xl border bg-white p-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <TagIcon className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-slate-700">
            Tidak ada artikel yang cocok dengan filter saat ini.
          </p>
          <button
            onClick={() => {
              dispatch(clearTags());
              dispatch(setQ(""));
            }}
            className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
          >
            Hapus filter
          </button>
        </div>
      )}

      {/* Pagination */}
      {meta.pages > 1 && (
        <div className="mt-8">
          <Pagination
            page={meta.page}
            pages={meta.pages}
            onPage={(p) => dispatch(setPage(p))}
          />
        </div>
      )}

      <p className="mt-10 text-center text-xs text-slate-500">
        * Artikel ditayangkan dari API WRECC (via proxy + RTK Query cache).
      </p>
    </div>
  );
}
