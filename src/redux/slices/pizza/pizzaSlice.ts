import { createSlice } from "@reduxjs/toolkit";
import { TItem } from "../../utils/types";
import { fetchPizzaItems } from "../../utils/asyncAction/fetchAction";

const initialState = {
  items: [] as TItem[],
  status: "pending" as "pending" | "succes" | "error",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzaItems.pending, (state) => {
      state.items = [];
      state.status = "pending";
    });
    builder.addCase(fetchPizzaItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "succes";
    });
    builder.addCase(fetchPizzaItems.rejected, (state) => {
      state.items = [];
      state.status = "error";
    });
  },
});

export default pizzaSlice.reducer;
