import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.seller || initialState;

export const selectSeller = createSelector([selectSlice], state => state);

export const selectProducts = createSelector(
  [selectSlice],
  SellerState => SellerState.products,
);

export const selectError = createSelector(
  [selectSlice],
  SellerState => SellerState.error,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  SellerState => SellerState.isFetching,
);

export const selectProductsLoaded = createSelector(
  [selectSlice],
  SellerState => SellerState.productsLoaded,
);
