import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.createProduct || initialState;

export const selectSignUp = createSelector([selectSlice], state => state);

export const selectName = createSelector(
  [selectSlice],
  CreateProductState => CreateProductState.name,
);

export const selectDescription = createSelector(
  [selectSlice],
  CreateProductState => CreateProductState.description,
);

export const selectImageURI = createSelector(
  [selectSlice],
  CreateProductState => CreateProductState.imageURI,
);

export const selectPrice = createSelector(
  [selectSlice],
  CreateProductState => CreateProductState.price,
);

export const selectBrand = createSelector(
  [selectSlice],
  CreateProductState => CreateProductState.brand,
);


export const selectError = createSelector(
  [selectSlice],
  CreateProductState => CreateProductState.error,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  CreateProductState => CreateProductState.isFetching,
);

export const selectProductCreated = createSelector(
  [selectSlice],
  CreateProductState => CreateProductState.productCreated,
);
