import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AppState } from '../../app/store';
import { Product, ProductId } from '../../app/types';

export interface ProductsState {
  products: Product[];
  product?: Product;
  status: 'idle' | 'loading' | 'failed';
}

export const initialState: ProductsState = {
  products: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await fetch('https://fakestoreapi.com/products');

  return response.json() as Promise<Product[]>;
});

export const fetchProduct = createAsyncThunk(
  'products/fetchOne',
  async (id: ProductId) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    return response.json() as Promise<Product>;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    removeProduct(state) {
      delete state.product;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export const { removeProduct } = productsSlice.actions;

export const selectProducts = (state: AppState) => state.products.products;

export const selectProduct = (state: AppState) => state.products.product;

export default productsSlice.reducer;
