import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPizzaItems = createAsyncThunk(
  "pizza/fetchPizzaId",
  async (params: ValueLink) => {
    const { isCategory, isFilter, isSort } = params;
    const { data } = await axios.get(
      `https://6766d6fd560fbd14f18c43df.mockapi.io/MyPizza?${isCategory}&${isSort}&order=${isFilter}`
    );
    return data;
  }
);

type TItem = {
  id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category?: number[];
  rating: number;
  info: {
    caloric: string;
    proteins: string;
    fats: string;
    carbohydrates: string;
    dietaryFiber: string;
    water: string;
    compound: string[];
  }[];
};

type ValueLink = {
  isCategory: string;
  isFilter: string;
  isSort: string;
};

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
