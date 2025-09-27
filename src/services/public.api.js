// services/public.api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// map API article -> FE article
const toHero = (a) => {
  // prefer explicit hero_id if backend provides it; otherwise first image id
  const id = a.hero_id ?? a.image_ids?.[0];
  return id ? `/media/${id}` : "/placeholder/cover.jpg"; // fallback: put a small local placeholder
};

const toTagNames = (tags) => {
  if (!tags) return [];
  // API may return [{id,name}, ...] or ["name", ...]
  if (Array.isArray(tags) && typeof tags[0] === "object") return tags.map((t) => t.name);
  return tags;
};

const mapArticle = (a) => ({
  ...a,
  hero: a.hero ?? toHero(a),
  tags: toTagNames(a.tags),
  excerpt: a.summary ?? a.excerpt ?? "", // your ArticleCard reads `excerpt` optionally
});

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  keepUnusedDataFor: 60,
  tagTypes: ["Articles", "Tags", "Article"],
  endpoints: (builder) => ({
    listArticles: builder.query({
      /**
       * params: { q?, tag_ids?: number[], category_id?, sort?: "newest"|"oldest"|"az", page?, limit?, slug? }
       */
      query: ({ q, tag_ids, category_id, sort = "newest", page = 1, limit = 12, slug }) => {
        const u = new URL("/v1/articles", process.env.NEXT_PUBLIC_API_BASE_URL);
        if (q) u.searchParams.set("q", q);
        if (category_id) u.searchParams.set("category_id", String(category_id));
        (tag_ids ?? []).forEach((id) => u.searchParams.append("tag_id", String(id)));
        u.searchParams.set("status", "published");

        const map = {
          newest: { field: "published_at", order: "desc" },
          oldest: { field: "published_at", order: "asc" },
          az:     { field: "title",        order: "asc" },
        };
        const s = map[sort] ?? map.newest;
        u.searchParams.set("sort", s.field);
        u.searchParams.set("order", s.order);
        u.searchParams.set("page", String(page));
        u.searchParams.set("limit", String(limit));
        if (slug) u.searchParams.set("slug", slug);

        return u.pathname + u.search;
      },
      transformResponse: (resp) => {
        const data = resp?.data ?? {};
        const items = (data.items ?? []).map(mapArticle);
        return { data: { ...data, items } };
      },
      providesTags: (result) =>
        result
          ? [
              ...(result.data?.items ?? []).map((a) => ({ type: "Article", id: a.id })),
              { type: "Articles", id: "LIST" },
            ]
          : [{ type: "Articles", id: "LIST" }],
    }),

    getArticleBySlug: builder.query({
      query: (slug) => {
        const u = new URL("/v1/articles", process.env.NEXT_PUBLIC_API_BASE_URL);
        u.searchParams.set("status", "published");
        u.searchParams.set("slug", slug);
        u.searchParams.set("limit", "1");
        return u.pathname + u.search;
      },
      transformResponse: (resp) => {
        const a = resp?.data?.items?.[0] ?? null;
        return a ? mapArticle(a) : null;
      },
      providesTags: (a) => (a ? [{ type: "Article", id: a.id }] : []),
    }),

    listRelated: builder.query({
      query: ({ tag_ids = [], exclude_id, limit = 4 }) => {
        const u = new URL("/v1/articles", process.env.NEXT_PUBLIC_API_BASE_URL);
        u.searchParams.set("status", "published");
        u.searchParams.set("sort", "published_at");
        u.searchParams.set("order", "desc");
        u.searchParams.set("page", "1");
        u.searchParams.set("limit", String(limit + 1));
        tag_ids.forEach((id) => u.searchParams.append("tag_id", String(id)));
        if (exclude_id) u.searchParams.set("exclude_id", String(exclude_id));
        return u.pathname + u.search;
      },
      transformResponse: (resp, _m, arg) => {
        const raw = resp?.data?.items ?? [];
        const mapped = raw.map(mapArticle);
        return mapped.filter((x) => x.id !== arg.exclude_id).slice(0, arg.limit ?? 4);
      },
      providesTags: [{ type: "Articles", id: "RELATED" }],
    }),

    getTags: builder.query({
      query: () => "/tags",
      transformResponse: (resp) => {
        const items = Array.isArray(resp?.data) ? resp.data : resp ?? [];
        return { data: items.map((t) => (typeof t === "string" ? { id: t, name: t } : t)) };
      },
      providesTags: [{ type: "Tags", id: "LIST" }],
    }),
  }),
});

export const {
  useListArticlesQuery,
  useGetArticleBySlugQuery,
  useListRelatedQuery,
  useGetTagsQuery,
} = publicApi;
