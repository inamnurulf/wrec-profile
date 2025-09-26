// services/public.api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
       * params shape:
       * {
       *   q?, tag_ids?: number[], category_id?: number,
       *   sort?: "newest"|"oldest"|"az", page?, limit?, slug?
       * }
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
      transformResponse: (resp) => resp?.data?.items?.[0] ?? null,
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
        return u.pathname + u.search;
      },
      providesTags: [{ type: "Articles", id: "RELATED" }],
    }),

    getTags: builder.query({
      query: () => "/tags",
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
