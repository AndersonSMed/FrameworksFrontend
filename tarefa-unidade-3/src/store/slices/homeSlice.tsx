import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    products: [],
    cartItems: [],
    isLoading: true,
  },
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
    }),
  },
});

export const { updateIsLoading, updateCartItems, updateProducts } = homeSlice.actions;
export default homeSlice.reducer;
