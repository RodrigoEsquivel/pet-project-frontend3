import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SellerPageState } from './types';

export const initialState: SellerPageState = {
  products: [],
  error: false,
  isFetching: false,
  productsLoaded: false,
};

const slice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
      setProducts(state, action: PayloadAction<any>) {
        state.products = action.payload;
      },
      loadProductsError(state) {
        state.productsLoaded = false;
        state.isFetching = false;
        state.error = true;
      },
      loadProductsSuccess(state) {
        state.productsLoaded = true;
        state.isFetching = false;
        state.error = false;
      },
      fetchingData(state) {
        state.productsLoaded = false;
        state.isFetching = true;
        state.error = false;
      },
    },
  });
  
  export const { actions: sellerActions } = slice;
  export default slice.reducer;
  export const useSellerSlice = () => {
    return { actions: slice.actions };
  };
  
  /**
   * Example Usage:
   *
   * export function MyComponentNeedingThisSlice() {
   *  const { actions } = useSignUpSlice();
   *
   *  const onButtonClick = (evt) => {
   *    dispatch(actions.someAction());
   *   };
   * }
   */
  