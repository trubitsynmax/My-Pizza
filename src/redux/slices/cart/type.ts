export type TItemAdd = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count?: number;
};
export type CartItem = TItemAdd & { count: number };
export type TItemMinus = {
  id: string;
  size: number;
  type: string;
};

export interface IState {
  totalPrice: number;
  maxLength: number;
  item: CartItem[];
}
