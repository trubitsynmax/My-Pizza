import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filter/filterSlice";
import cart from "./slices/cart/cartSlice";
import pizza from "./slices/pizza/pizzaSlice";
import additionally from "./slices/additionally/additionallySlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    additionally,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
