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
  if (Array.isArray(tags) && typeof tags[0] === "object")
    return tags.map((t) => t.name);
  return tags;
};

const mapArticle = (a) => ({
  ...a,
  hero: a.hero ?? toHero(a),
  tags: toTagNames(a.tags),
  excerpt: a.summary ?? a.excerpt ?? "", // your ArticleCard reads `excerpt` optionally
});

const mapPublicFile = (f) => ({
  id: f.id,
  slug: f.slug,
  title: f.title,
  description: f.description ?? "",
  links: f.links ?? [],
  is_published: !!f.is_published,
  metadata: f.metadata ?? {},
  created_at: f.created_at ?? f.createdAt ?? null,
  updated_at: f.updated_at ?? f.updatedAt ?? null,
});

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  keepUnusedDataFor: 60,
  tagTypes: ["Articles", "Tags", "Article", "PublicFiles"],
  endpoints: (builder) => ({
    listArticles: builder.query({
      /**
       * params: { q?, tag_ids?: number[], category_id?, sort?: "newest"|"oldest"|"az", page?, limit?, slug? }
       */
      query: ({
        q,
        tag_ids,
        category_id,
        sort = "newest",
        page = 1,
        limit = 12,
        slug,
      }) => {
        const u = new URL("/v1/articles", process.env.NEXT_PUBLIC_API_BASE_URL);
        if (q) u.searchParams.set("q", q);
        if (category_id) u.searchParams.set("category_id", String(category_id));
        (tag_ids ?? []).forEach((id) =>
          u.searchParams.append("tag_id", String(id))
        );
        u.searchParams.set("status", "published");

        const map = {
          newest: { field: "published_at", order: "desc" },
          oldest: { field: "published_at", order: "asc" },
          az: { field: "title", order: "asc" },
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
              ...(result.data?.items ?? []).map((a) => ({
                type: "Article",
                id: a.id,
              })),
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
        return mapped
          .filter((x) => x.id !== arg.exclude_id)
          .slice(0, arg.limit ?? 4);
      },
      providesTags: [{ type: "Articles", id: "RELATED" }],
    }),

    getTags: builder.query({
      query: () => "/tags",
      transformResponse: (resp) => {
        const items = Array.isArray(resp?.data) ? resp.data : resp ?? [];
        return {
          data: items.map((t) =>
            typeof t === "string" ? { id: t, name: t } : t
          ),
        };
      },
      providesTags: [{ type: "Tags", id: "LIST" }],
    }),
    // add inside endpoints: (builder) => ({ ... })
    getPublicFileBySlug: builder.query({
      /**
       * Fetch single public file by slug.
       * Public FE only shows published files.
       */
      query: (slug) => {
        const u = new URL(
          "/v1/public-files",
          process.env.NEXT_PUBLIC_API_BASE_URL
        );
        u.searchParams.set("is_published", "true");
        u.searchParams.set("slug", slug);
        u.searchParams.set("limit", "1");
        return u.pathname + u.search;
      },
      transformResponse: (resp) => {
        const root = resp?.data ?? resp ?? {};
        const raw = root.items?.[0] ?? null;
        return raw ? mapPublicFile(raw) : null;
      },
      providesTags: (file, _err, slug) =>
        file
          ? [{ type: "PublicFiles", id: file.id }]
          : [{ type: "PublicFiles", id: `SLUG:${slug}` }],
    }),

    listPublicFiles: builder.query({
      /**
       * params: { q?, sort? = "created_desc"|"created_asc"|"title_asc"|"title_desc", page?, limit? }
       * Always fetches only published files for public FE
       */
      query: ({ q, sort = "created_desc", page = 1, limit = 12 }) => {
        const u = new URL(
          "/v1/public-files",
          process.env.NEXT_PUBLIC_API_BASE_URL
        );
        if (q) u.searchParams.set("q", q);
        // enforce only published on public FE
        u.searchParams.set("is_published", "true");

        const map = {
          created_desc: { field: "created_at", order: "desc" },
          created_asc: { field: "created_at", order: "asc" },
          title_asc: { field: "title", order: "asc" },
          title_desc: { field: "title", order: "desc" },
        };
        const s = map[sort] ?? map.created_desc;
        u.searchParams.set("sort", s.field);
        u.searchParams.set("order", s.order);
        u.searchParams.set("page", String(page));
        u.searchParams.set("limit", String(limit));

        return u.pathname + u.search;
      },
      transformResponse: (resp) => {
        const root = resp?.data ?? resp ?? {};
        const items = (root.items ?? []).map(mapPublicFile);
        return { data: { ...root, items } };
      },
      providesTags: (result) =>
        result
          ? [
              ...(result.data?.items ?? []).map((f) => ({
                type: "PublicFiles",
                id: f.id,
              })),
              { type: "PublicFiles", id: "LIST" },
            ]
          : [{ type: "PublicFiles", id: "LIST" }],
    }),
  }),
});

export const {
  useListArticlesQuery,
  useGetArticleBySlugQuery,
  useListRelatedQuery,
  useGetTagsQuery,
  useListPublicFilesQuery,
  useGetPublicFileBySlugQuery
} = publicApi;
