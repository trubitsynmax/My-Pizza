import { createAsyncThunk } from "@reduxjs/toolkit";
import { ValueLink } from "../../slices/pizza/type";
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
