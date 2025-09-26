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

        if (page) u.searchParams.set("page", String(page));
        if (limit) u.searchParams.set("limit", String(limit));
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

    getTags: builder.query({
      query: () => "/tags",
      providesTags: [{ type: "Tags", id: "LIST" }],
    }),
  }),
});

export const { useListArticlesQuery, useGetTagsQuery } = publicApi;
