import { create } from 'zustand';

type cartType = {
  name: string;
  price: number;
  Image: string;
  id: string;
};

interface BearState {
  cart: cartType[] | [];
  addToCart: (item: cartType) => void;
}

export const useCartStore = create<BearState>()((set, get) => ({
  cart: [],
  addToCart: (item: cartType) => {
    set((state) => ({
      cart: [...state.cart, item],
    }));
  },
}));
