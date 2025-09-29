"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  Tag as TagIcon,
  User,
  ChevronRight,
  Eye,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import RelatedItemCard from "@/components/atoms/RelatedItemCard";
import ShareButtons from "@/components/atoms/ShareButton";
import slugify from "@/helper/slugify";
import {
  useGetArticleBySlugQuery,
  useListRelatedQuery,
  useGetTagsQuery,
} from "@/services/public.api";
import ArticlePdfButton from "../helper/handleDownloadPDF";

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
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

const TagPills = ({ tags = [] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((t, i) => (
      <span
        key={`${t}-${i}`}
        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium"
      >
        <TagIcon className="w-3 h-3" /> {t}
      </span>
    ))}
  </div>
);

export default function ArticleDetailPage() {
  const progress = useReadingProgress();
  const router = useRouter();
  const { slug } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: article, isLoading, isError } = useGetArticleBySlugQuery(slug);

  useEffect(() => {
    if (!isLoading && !article) {
      router.replace("/404");
    }
  }, [isLoading, article, router]);

  // Reading time from `summary + content` (fallback)
  const totalText = useMemo(() => {
    if (!article) return "";
    const chunks = [article.summary, article.content].filter(Boolean);
    return chunks.join(" ");
  }, [article]);
  const minutes = Math.max(3, Math.round(wordCount(totalText) / 200));

  // ---- Related: need tag_ids from names ----
  const { data: tagsResp } = useGetTagsQuery();
  const tagSlugToId = useMemo(() => {
    const m = new Map();
    (tagsResp?.data ?? []).forEach((t) => m.set(slugify(t.name), t.id));
    return m;
  }, [tagsResp]);

  const selectedTagIds = useMemo(() => {
    const names = article?.tags ?? [];
    return names.map((n) => tagSlugToId.get(slugify(n))).filter(Boolean);
  }, [article, tagSlugToId]);

  const { data: relatedResp } = useListRelatedQuery(
    article
      ? { tag_ids: selectedTagIds, exclude_id: article.id, limit: 4 }
      : { tag_ids: [], exclude_id: 0, limit: 4 },
    { skip: !article }
  );

  const relatedItems = useMemo(() => {
    const items = relatedResp?.data?.items ?? [];
    return items
      .filter((x) => x.id !== article?.id)
      .slice(0, 4)
      .map((x) => ({
        title: x.title,
        thumb: x.hero || x.cover || "/placeholder.jpg",
        date: x.published_at ? fmtID(x.published_at) : "",
        slug: x.slug,
      }));
  }, [relatedResp, article]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="h-2 w-1/2 bg-emerald-100 rounded mb-4 animate-pulse" />
        <div className="h-8 w-3/4 bg-slate-100 rounded mb-6 animate-pulse" />
        <div className="h-64 w-full bg-slate-100 rounded-2xl animate-pulse" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-red-600">
        Gagal memuat artikel. Coba muat ulang.
      </div>
    );
  }
  if (!article) return null;

  return (
    <div className="relative">
      {/* Reading progress */}
      <div
        className="fixed top-0 left-0 h-1 bg-emerald-500 z-50"
        style={{ width: `${progress}%` }}
      />

      <header className="border-b bg-gradient-to-br from-emerald-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-gray-700">
              Beranda
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/articles" className="hover:text-gray-700">
              Artikel
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700">{article.title}</span>
          </nav>

          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            {article.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-600">
            <div className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" /> {minutes} menit baca
            </div>
            {typeof article.views === "number" && (
              <div className="inline-flex items-center gap-2">
                <Eye className="w-4 h-4" />{" "}
                {article.views.toLocaleString("id-ID")} views
              </div>
            )}
            <TagPills tags={article.tags} />
          </div>
        </div>
      </header>

      {/* Hero */}
      {article.hero && (
        <div className="max-w-7xl mx-auto px-4">
          <img
            src={article.hero}
            alt={article.title}
            className="w-full h-72 md:h-96 object-cover rounded-2xl shadow mt-6"
          />
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Content */}
        <article className="md:col-span-8 bg-white rounded-2xl shadow p-6 my-3">
          {/* Author */}
          {(article.author || article.published_at) && (
            <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow">
              {article.author?.avatar && (
                <img
                  src={article.author.avatar}
                  alt={article.author || "author"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  {article.author || "—"}
                </div>
                {article.author?.role && (
                  <p className="text-sm text-gray-500">{article.author.role}</p>
                )}
              </div>
              {article.published_at && (
                <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" /> {fmtID(article.published_at)}
                </div>
              )}
            </div>
          )}

          {/* Share & Download Buttons */}
          <div className="my-6 flex items-center gap-4">
            <ShareButtons />
            <ArticlePdfButton article={article} minutes={minutes} fmtID={fmtID} />  
          </div>

          {/* Summary (optional) */}
          {article.summary && (
            <p className="text-gray-700 leading-8 mb-6">{article.summary}</p>
          )}

          {/* Markdown/HTML body */}
          {article.content && (
            <div className="prose max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-3xl font-extrabold tracking-tight mt-8 mb-4 text-gray-900"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-2xl font-semibold mt-6 mb-3 text-gray-800"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-xl font-semibold mt-5 mb-2 text-gray-800"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <div className="text-gray-700 leading-8 mb-4" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="list-disc list-inside space-y-1 text-gray-700 mb-4 pl-4"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      className="list-decimal list-inside space-y-1 text-gray-700 mb-4 pl-4"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="ml-2" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-emerald-400 pl-4 italic text-gray-600 my-4"
                      {...props}
                    />
                  ),
                  code: ({ node, inline, ...props }) =>
                    inline ? (
                      <code
                        className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono text-emerald-700"
                        {...props}
                      />
                    ) : (
                      <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 overflow-x-auto my-4">
                        <code className="font-mono text-sm" {...props} />
                      </pre>
                    ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-emerald-600 hover:underline font-medium"
                      {...props}
                    />
                  ),
                  img: ({ node, ...props }) => (
                    <img
                      className="rounded-xl shadow my-6 max-w-full"
                      {...props}
                    />
                  ),
                  table: ({ node, ...props }) => (
                    <table
                      className="w-full border-collapse border border-gray-200 text-sm my-6"
                      {...props}
                    />
                  ),
                  thead: ({ node, ...props }) => (
                    <thead
                      className="bg-gray-100 text-gray-700 font-semibold"
                      {...props}
                    />
                  ),
                  tbody: ({ node, ...props }) => (
                    <tbody className="divide-y divide-gray-200" {...props} />
                  ),
                  tr: ({ node, ...props }) => (
                    <tr className="border-b last:border-0" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="border border-gray-200 px-3 py-2 text-left"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="border border-gray-200 px-3 py-2"
                      {...props}
                    />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="my-8 border-gray-200" {...props} />
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-6 md:sticky md:top-20 self-start">
          {/* Related */}
          <div className="bg-white rounded-2xl shadow p-5">
            <div className="text-sm font-semibold text-gray-700 mb-3">
              Artikel Lain
            </div>
            <ul className="space-y-4">
              {relatedItems.length === 0 ? (
                <li className="text-sm text-gray-500">
                  Tidak ada artikel terkait.
                </li>
              ) : (
                relatedItems.map((it, idx) => (
                  <RelatedItemCard key={idx} item={it} />
                ))
              )}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}