import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  q: "",
  tags: [],
  sort: "newest",
  view: "grid",
  page: 1,
  limit: 8,
};

const slice = createSlice({
  name: "articlesUI",
  initialState,
  reducers: {
    setQ(state, action) {
      state.q = action.payload;
      state.page = 1;
    },
    toggleTag(state, action) {
      const t = action.payload;
      state.tags = state.tags.includes(t) ? state.tags.filter((x) => x !== t) : [...state.tags, t];
      state.page = 1;
    },
    clearTags(state) {
      state.tags = [];
      state.page = 1;
    },
    setSort(state, action) {
      state.sort = action.payload;
      state.page = 1;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    setPage(state, action) {
      state.page = Math.max(1, action.payload);
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setQ, toggleTag, clearTags, setSort, setView, setPage, reset } = slice.actions;
export default slice.reducer;
