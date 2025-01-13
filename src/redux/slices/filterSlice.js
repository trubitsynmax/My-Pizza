import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  MoreOrLess: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setValueSort(state, action) {
      state.MoreOrLess = !action.payload;
    },
    setSearch(state, action) {
      state.categoryId = Number(action.payload.filter);
      state.MoreOrLess = action.payload.valueSort;
      state.sort = action.payload.sort;
    },
  },
});

export const { setFilter, setSort, setSearch, setValueSort } = filter.actions;
export default filter.reducer;
