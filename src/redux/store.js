import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";
import additionally from "./slices/additionallySlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    additionally,
  },
});
