import { configureStore } from "@reduxjs/toolkit";
import { publicApi } from "@/services/public.api";
import articlesUIReducer from "./slices/article.slice";
import publicFilesReducer from "./slices/publicFiles.slice";

export const store = configureStore({
  reducer: {
    [publicApi.reducerPath]: publicApi.reducer,
    articlesUI: articlesUIReducer,
    publicFilesUI: publicFilesReducer,
  },
  middleware: (getDefault) => getDefault().concat(publicApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
