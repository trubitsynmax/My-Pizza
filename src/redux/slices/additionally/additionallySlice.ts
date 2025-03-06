import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TItem } from "../../utils/types";

export const fetchOnePizza = createAsyncThunk(
  "additionally/fetchOnlyOnePizza",
  async (id: string) => {
    const { data } = await axios.get(
      `https://6766d6fd560fbd14f18c43df.mockapi.io/MyPizza/${id}`
    );
    return data;
  }
);

const initialState = {
  item: [] as TItem[],
  status: "pending" as "pending" | "succes" | "error",
};

export const additionally = createSlice({
  name: "additionally",
  initialState,
  reducers: {
    additem(state, action: PayloadAction<TItem>) {
      state.item = [action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOnePizza.pending, (state) => {
      state.item = [];
      state.status = "pending";
    });
    builder.addCase(
      fetchOnePizza.fulfilled,
      (state, action: PayloadAction<TItem>) => {
        state.item = [action.payload];
        state.status = "succes";
      }
    );
    builder.addCase(fetchOnePizza.rejected, (state) => {
      state.item = [];
      state.status = "error";
    });
  },
});

export default additionally.reducer;
