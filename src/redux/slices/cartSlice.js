import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  maxLength: 0,
  item: [],
};

export const cart = createSlice({
  name: "sort",
  initialState,
  reducers: {
    addItem(state, action) {
      if (state.maxLength <= 99) {
        state.maxLength++;
        const findItem = state.item.find(
          (obj) =>
            obj.id === action.payload.id &&
            obj.size === action.payload.size &&
            obj.type === action.payload.type
        );
        if (findItem) {
          findItem.count++;
        } else {
          state.item.push({ ...action.payload, count: 1 });
        }
        state.totalPrice = state.item.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
      }
    },
    removeBasket(state) {
      state.item = [];
      state.totalPrice = 0;
    },
    minusItem(state, action) {
      const findItem = state.item.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );
      if (findItem) {
        findItem.count--;
        state.maxLength--;
      }
      if (findItem.count > 0) {
        state.totalPrice = state.item.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
      } else {
        const deletedItem = (state.item = state.item.filter(
          (obj) =>
            obj.id !== action.payload.id ||
            obj.type !== action.payload.type ||
            obj.size !== action.payload.size
        ));
        state.totalPrice = deletedItem.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
      }
    },
    removeItem(state, action) {
      state.item = state.item.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.type !== action.payload.type ||
          obj.size !== action.payload.size
      );
    },
    niceDay(state, action) {
      const fun = true;
      if (fun === true) {
        const mood = "lisen music";
      } else {
        const mood = "don't";
      }
    },
  },
});

export const { addItem, removeBasket, minusItem, removeItem } = cart.actions;
export default cart.reducer;
