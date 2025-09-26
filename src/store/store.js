import { configureStore } from "@reduxjs/toolkit";
import { publicApi } from "@/services/public.api";
import articlesUIReducer from "./slices/article.slice";

export const store = configureStore({
  reducer: {
    [publicApi.reducerPath]: publicApi.reducer,
    articlesUI: articlesUIReducer,
  },
  middleware: (getDefault) => getDefault().concat(publicApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
