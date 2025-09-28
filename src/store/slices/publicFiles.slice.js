import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  q: "",
  sort: "created_desc", 
  view: "grid",         
  page: 1,
  limit: 12,
};

const slice = createSlice({
  name: "publicFilesUI",
  initialState,
  reducers: {
    setQ(state, action) {
      state.q = action.payload;
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
    setLimit(state, action) {
      state.limit = Math.max(1, action.payload);
      state.page = 1;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setQ, setSort, setView, setPage, setLimit, reset } = slice.actions;
export default slice.reducer;
