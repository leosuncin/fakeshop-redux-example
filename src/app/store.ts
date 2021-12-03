import {
  Action,
  configureStore,
  PreloadedState,
  ThunkAction,
} from '@reduxjs/toolkit';

import productsReducer, {
  ProductsState,
} from '../features/products/productsSlice';

export function createStore(preloadedState?: PreloadedState<AppState>) {
  return configureStore({
    reducer: {
      products: productsReducer,
    },
    preloadedState,
    devTools: true,
  });
}

const store = createStore();

export type AppState = {
  products: ProductsState;
};

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
