import { createAsyncThunk } from "@reduxjs/toolkit";
import { ValueLink } from "../../slices/pizza/type";
import axios from "axios";

export const fetchPizzaItems = createAsyncThunk(
  "pizza/fetchPizzaId",
  async (params: ValueLink) => {
    const { isCategory, isFilter, isSort } = params;
    const { data } = await axios.get(
      `https://67d43e67d2c7857431ecfd6a.mockapi.io/Pizzac?${isCategory}&${isSort}&order=${isFilter}`
    );
    return data;
  }
);
