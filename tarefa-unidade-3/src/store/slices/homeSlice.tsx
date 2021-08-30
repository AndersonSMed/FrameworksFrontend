import { createSlice } from '@reduxjs/toolkit';
import { ICartItem, IProductWithKey } from '../../interfaces';

interface HomeState {
  products: IProductWithKey[];
  filteredProducts: IProductWithKey[];
  cartItems: ICartItem[];
  isLoading: boolean;
}

const initialState: HomeState = {
  products: [],
  filteredProducts: [],
  cartItems: [],
  isLoading: true,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateIsLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    updateCartItems: (state, action) => ({
      ...state,
      cartItems: action.payload,
    }),
    updateProducts: (state, action) => ({
      ...state,
      products: action.payload,
      filteredProducts: action.payload,
    }),
    filterProducts: (state, action) => ({
      ...state,
      filteredProducts: state.products.filter(
        (product) => product.title.toLowerCase().search(action.payload.toLowerCase()) !== -1
      ),
    }),
  },
});

export const { updateIsLoading, updateCartItems, updateProducts, filterProducts } =
  homeSlice.actions;
export default homeSlice.reducer;
