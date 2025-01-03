import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(store, action) {
      store.categoryId = action.payload;
    },
    setSort(store, action) {
      store.sort = action.payload;
    },
  },
});

export const { setFilter, setSort } = filter.actions;
export default filter.reducer;
