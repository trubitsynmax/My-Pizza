export type TItem = {
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
    compoud: string[];
  }[];
};
