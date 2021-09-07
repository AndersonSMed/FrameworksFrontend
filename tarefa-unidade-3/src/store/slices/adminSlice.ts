import { createSlice } from '@reduxjs/toolkit';
import { IProductWithKey } from '../../interfaces';

interface AdminState {
  products: IProductWithKey[];
  isLoading: boolean;
}

const initialState: AdminState = {
  products: [],
  isLoading: true,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateIsLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    updateProducts: (state, action) => ({
      ...state,
      products: action.payload,
      filteredProducts: action.payload,
    }),
  },
});

export const { updateIsLoading, updateProducts } = adminSlice.actions;
export default adminSlice.reducer;
