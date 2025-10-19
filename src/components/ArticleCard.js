"use client";
import { ArrowRight, Bookmark, CalendarDays, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";          // ⬅️ use locale-aware Link
import slugify from "@/helper/slugify";
import classNames from "@/helper/className";

export default function ArticleCard({ a, compact = false }) {
  const t = useTranslations("ArticleCard");
  const locale = useLocale();

  // Do NOT hand-roll /en. Let <Link> prefix based on active locale.
  const href = `/articles/${a.slug ?? slugify(a.title)}`;

  const formatDate = (iso) =>
    iso
      ? new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "2-digit" })
          .format(new Date(iso))
      : "";

  return (
    <article
      className={classNames(
        "group overflow-hidden rounded-2xl border bg-white",
        compact && "grid grid-cols-[120px_1fr]"
      )}
    >
      <div
        className={classNames(
          "relative",
          compact ? "h-full" : "h-48 sm:h-56 md:h-44"
        )}
        style={compact ? { minHeight: 120 } : {}}
      >
        <img
          src={a.hero}
          alt={a.title}
          className={classNames(
            "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
            compact ? "rounded-l-2xl" : "rounded-t-2xl"
          )}
        />
        <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-md hover:bg-white">
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(a.published_at)}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {a.author || t("unknownAuthor", { default: "Unknown" })}
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-slate-900">
          {a.title}
        </h3>

        {!!a.excerpt && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">{a.excerpt}</p>
        )}

        {!!a.tags?.length && (
          <div className="mt-3 flex flex-wrap gap-2">
            {a.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2 text-emerald-600">
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
            aria-label={t("readMore", { default: "Read more" })}
            title={t("readMore", { default: "Read more" })}
          >
            {t("readMore", { default: "Read more" })} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
