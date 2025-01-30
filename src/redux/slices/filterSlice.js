import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  MoreOrLess: true,
  inputValue: "",
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  isOpen: false,
};

export const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setValueInput(state, action) {
      state.inputValue = action.payload;
    },
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
    setOpen(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const {
  setFilter,
  setSort,
  setSearch,
  setValueSort,
  setOpen,
  setValueInput,
} = filter.actions;
export default filter.reducer;
