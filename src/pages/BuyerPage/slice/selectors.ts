import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.buyer || initialState;

export const selectBuyer = createSelector([selectSlice], state => state);

export const selectProducts = createSelector(
  [selectSlice],
  BuyerState => BuyerState.products,
);

export const selectError = createSelector(
  [selectSlice],
  BuyerState => BuyerState.error,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  BuyerState => BuyerState.isFetching,
);

export const selectProductsLoaded = createSelector(
  [selectSlice],
  BuyerState => BuyerState.productsLoaded,
);
