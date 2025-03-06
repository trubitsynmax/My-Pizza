import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type TItemAdd = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count?: number;
};
type CartItem = TItemAdd & { count: number };
type TItemMinus = {
  id: string;
  size: number;
  type: string;
};

interface IState {
  totalPrice: number;
  maxLength: number;
  item: CartItem[];
}

const initialState: IState = {
  totalPrice: 0,
  maxLength: 0,
  item: [],
};

export const cart = createSlice({
  name: "sort",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TItemAdd>) {
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
    minusItem(state, action: PayloadAction<TItemMinus>) {
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
      if (findItem && findItem.count > 0) {
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
    removeItem(state, action: PayloadAction<TItemAdd>) {
      state.item = state.item.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.type !== action.payload.type ||
          obj.size !== action.payload.size
      );
    },
  },
});

export const { addItem, removeBasket, minusItem, removeItem } = cart.actions;
export default cart.reducer;
