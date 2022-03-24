import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { CreateProductState } from './types';

export const initialState: CreateProductState = {
  name: '',
  description: '',
  imageURI: '',
  price: 0,
  brand: '',
  error: false,
  isFetching: false,
  productCreated: false,
};

const slice = createSlice({
    name: 'createProduct',
    initialState,
    reducers: {
      setName(state, action: PayloadAction<any>) {
        state.name = action.payload;
      },
      setDescription(state, action: PayloadAction<any>) {
        state.description = action.payload;
      },
      setImageURI(state, action: PayloadAction<any>) {
        state.imageURI = action.payload;
      },
      setPrice(state, action: PayloadAction<any>) {
        state.price = action.payload;
      },
      setBrand(state, action: PayloadAction<any>) {
        state.brand = action.payload;
      },
      createProductError(state) {
        state.productCreated = false;
        state.isFetching = false;
        state.error = true;
      },
      createProductSuccess(state) {
        state.productCreated = true;
        state.isFetching = false;
        state.error = false;
      },
      fetchingData(state) {
        state.productCreated = false;
        state.isFetching = true;
        state.error = false;
      },
    },
  });
  
export const { actions: createProductActions } = slice;
export default slice.reducer;
export const useCreateProductSlice = () => {
  return { actions: slice.actions };
};
