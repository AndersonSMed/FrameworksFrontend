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
    addProductToCart: (state, action) => {
      const { cartItems, products } = state;

      const hasProductInCart = cartItems.find((item) => item.productId === action.payload);
      const productInfo = products.find((product) => product.productId === action.payload);
      const newCartItem = {
        productId: productInfo?.productId || '',
        title: productInfo?.title || '',
        price: productInfo?.price || 0,
        quantity: 1,
      } as ICartItem;

      return {
        ...state,
        cartItems: hasProductInCart
          ? cartItems.map((item) => {
              return item.productId === action.payload
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            })
          : [...cartItems, newCartItem],
      };
    },
    removeProductFromCart: (state, action) => {
      const newCartItems = state.cartItems.map((item) => {
        return item.productId === action.payload ? { ...item, quantity: item.quantity - 1 } : item;
      });

      return {
        ...state,
        cartItems: newCartItems.filter((item) => item.quantity > 0),
      };
    },
    deleteProductFromCart: (state, action) => ({
      ...state,
      cartItems: state.cartItems.filter((item) => item.productId !== action.payload),
    }),
  },
});

export const {
  updateIsLoading,
  updateCartItems,
  updateProducts,
  filterProducts,
  addProductToCart,
  removeProductFromCart,
  deleteProductFromCart,
} = homeSlice.actions;
export default homeSlice.reducer;
