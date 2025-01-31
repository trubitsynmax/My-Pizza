import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOnePizza = createAsyncThunk(
  "additionally/fetchOnlyOnePizza",
  async (id) => {
    const { data } = await axios.get(
      `https://6766d6fd560fbd14f18c43df.mockapi.io/MyPizza/${id}`
    );
    return data;
  }
);

const initialState = {
  item: [],
  status: "pending",
};

export const additionally = createSlice({
  name: "additionally",
  initialState,
  reducers: {
    additem(state, action) {
      state.item = [action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOnePizza.pending, (state) => {
      state.item = [];
      state.status = "pending";
    });
    builder.addCase(fetchOnePizza.fulfilled, (state, action) => {
      state.item = [action.payload];
      state.status = "succes";
    });
    builder.addCase(fetchOnePizza.rejected, (state) => {
      state.item = [];
      state.status = "error";
    });
  },
});

export default additionally.reducer;
