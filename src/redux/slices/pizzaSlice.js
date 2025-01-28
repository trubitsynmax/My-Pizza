import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPizzaItems = createAsyncThunk(
  "pizza/fetchPizzaId",
  async (params) => {
    const { isCategory, isFilter, isSort } = params;
    const { data } = await axios.get(
      `https://6766d6fd560fbd14f18c43df.mockapi.io/MyPizza?${isCategory}&${isSort}&order=${isFilter}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "pending",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
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
