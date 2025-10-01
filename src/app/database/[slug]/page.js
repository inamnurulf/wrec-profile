"use client";

import React, { useEffect, useMemo } from "react";
import { Clock, ChevronRight, ExternalLink, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import ShareButtons from "@/components/atoms/ShareButton";
import { useGetPublicFileBySlugQuery } from "@/services/public.api";


const getDownloadLink = (link) => {
  const match = link.match(/\/d\/([^/]+)\//);
  return match
    ? `https://drive.google.com/uc?export=download&id=${match[1]}`
    : link; 
};


/** ---------- Tiny UI helpers ---------- */
function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200/70 dark:bg-slate-700/50 ${className}`}
    />
  );
}
function Chip({
  children,
  tone = "slate",
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
      : tone === "amber"
      ? "bg-amber-100 text-amber-800 ring-amber-200"
      : "bg-slate-100 text-slate-700 ring-slate-200";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ring-1 ${toneClass}`}
    >
      {children}
    </span>
  );
}

/** ---------- Reading progress ---------- */
function useReadingProgress() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    const current = window.scrollY;
      setProgress(Math.min(100, Math.max(0, (current / total) * 100)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

const wordCount = (s = "") => String(s).split(/\s+/).filter(Boolean).length;
const fmtID = (iso) =>
  iso
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
        new Date(iso)
      )
    : "";

/** ---------- Page ---------- */
export default function FileDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const progress = useReadingProgress();

  const { data: file, isLoading, isError } = useGetPublicFileBySlugQuery(slug);

  useEffect(() => {
    if (!isLoading && !file) router.replace("/404");
  }, [isLoading, file, router]);

  const minutes = useMemo(() => {
    const base = [file?.title, file?.description].filter(Boolean).join(" ");
    return Math.max(1, Math.round(wordCount(base) / 200));
  }, [file]);

  /** ---------- Skeleton while loading ---------- */
  if (isLoading) {
    return (
      <div className="relative">
        {/* progress bar (subtle while loading) */}
        <div className="fixed top-0 left-0 h-1 bg-emerald-400/70 z-50 w-1/3 animate-pulse" />

        <header className="border-b bg-gradient-to-br from-emerald-50 via-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 text-sm">
              <Skeleton className="h-4 w-20" />
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <Skeleton className="h-4 w-14" />
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <Skeleton className="h-4 w-40" />
            </div>

            <Skeleton className="h-10 w-2/3 mt-4 rounded-lg" />

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main card skeleton */}
          <div className="md:col-span-8 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6 my-3">
            <div className="mb-6">
              <Skeleton className="h-8 w-40 rounded-lg" />
            </div>

            {/* Description paragraphs */}
            <div className="space-y-3 mb-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-9/12" />
            </div>

            {/* Links list */}
            <h2 className="mb-2 text-sm font-semibold text-slate-600">
              Tautan
            </h2>
            <div className="space-y-2 mb-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3"
                >
                  <div className="min-w-0 w-full">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-64 mt-2" />
                  </div>
                  <Skeleton className="h-7 w-20 rounded-md" />
                </div>
              ))}
            </div>

            {/* Metadata block */}
            <h2 className="mb-2 text-sm font-semibold text-slate-600">
              Metadata
            </h2>
            <Skeleton className="h-64 w-full rounded-lg" />

            <div className="mt-6">
              <Skeleton className="h-9 w-28 rounded-lg" />
            </div>
          </div>

          {/* Sidebar skeleton */}
          <aside className="md:col-span-4 space-y-6 md:sticky md:top-20 self-start">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5">
              <Skeleton className="h-5 w-28 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </aside>
        </main>
      </div>
    );
  }

  /** ---------- Error ---------- */
  if (isError) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          Gagal memuat data. Coba muat ulang.
        </div>
      </div>
    );
  }

  if (!file) return null;

  const links = Array.isArray(file.links) ? file.links : [];
  const statusTone = file.is_published ? "emerald" : "amber";

  return (
    <div className="relative">
      {/* Reading progress */}
      <div
        className="fixed top-0 left-0 h-1 bg-emerald-500 z-50 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />

      <header className="border-b bg-gradient-to-br from-emerald-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded">
              Beranda
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/database" className="hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded">
              Database
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700 truncate">{file.title}</span>
          </nav>

          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            {file.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-gray-600">
            <Chip>
              <Clock className="w-4 h-4" />
              {minutes} menit baca
            </Chip>

            <Chip>
              Dibuat: {fmtID(file.created_at) || "—"}
            </Chip>

            <Chip>
              Diperbarui: {fmtID(file.updated_at) || "—"}
            </Chip>

            <Chip tone={statusTone}>
              {file.is_published ? "Published" : "Draft"}
            </Chip>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main */}
        <article className="md:col-span-8 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6 my-3">
          {/* Share */}
          <div className="mb-6">
            <ShareButtons />
          </div>

          {/* Description */}
          {file.description && (
            <div className="prose prose-slate max-w-none mb-6 prose-headings:scroll-mt-24">
              <ReactMarkdown>{file.description}</ReactMarkdown>
            </div>
          )}

          {/* Links */}
          <section className="mb-6">
            <h2 className="mb-2 text-sm font-semibold text-slate-600">Tautan</h2>
            {links.length === 0 ? (
              <p className="text-slate-500">—</p>
            ) : (
              <ul className="space-y-2">
                {links.map((l, i) => (
                  <li
                    key={`${l.href}-${i}`}
                    className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium">
                        {l.name || "Link"}
                      </div>
                      {l.description ? (
                        <div className="truncate text-xs text-slate-500">
                          {l.description}
                        </div>
                      ) : null}
                    </div>
                    {l?.href && (
                      <a
                        href={getDownloadLink(l.href)}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      >
                        <Download size={14} /> Download
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Metadata */}
          <section className="mb-10">
            <h2 className="mb-2 text-sm font-semibold text-slate-600">
              Metadata
            </h2>
            <pre className="max-h-96 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed">
{JSON.stringify(file.metadata ?? {}, null, 2)}
            </pre>
          </section>

          {/* Back */}
          <div>
            <Link
              href="/database"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              ← Kembali
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-6 md:sticky md:top-20 self-start">
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5">
            <div className="text-sm font-semibold text-gray-700 mb-3">
              Info Ringkas
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <span className="text-gray-500">Slug:</span> {file.slug}
              </li>
              <li>
                <span className="text-gray-500">ID:</span> {file.id}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">Status:</span>
                <Chip tone={statusTone}>
                  {file.is_published ? "Published" : "Draft"}
                </Chip>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
