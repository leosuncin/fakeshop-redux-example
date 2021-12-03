import {
  Action,
  configureStore,
  PreloadedState,
  ThunkAction,
} from '@reduxjs/toolkit';

export function createStore(
  preloadedState?: PreloadedState<Record<string, unknown>>,
) {
  return configureStore({
    reducer: {},
    preloadedState,
    devTools: true,
  });
}

const store = createStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
