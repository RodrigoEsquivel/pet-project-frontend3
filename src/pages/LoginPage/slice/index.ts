import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { LoginState } from './types';

export const initialState: LoginState = {
  email: '',
  password: '',
  isLogged: false,
  error: false,
  isFetching: false,
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail(state: LoginState, action: PayloadAction<any>) {
      state.email = action.payload;
    },
    setPassword(state: LoginState, action: PayloadAction<any>) {
      state.password = action.payload;
    },
    setIsLogged(state: LoginState, action: PayloadAction<any>) {
      state.isLogged = action.payload;
    },
    authSuccess(state: LoginState) {
      state.isLogged = true;
      state.isFetching = false;
      state.error = false;
    },
    authError(state: LoginState) {
      state.isLogged = false;
      state.isFetching = false;
      state.error = true;
    },
    fetchingData(state: LoginState) {
      state.isLogged = false;
      state.isFetching = true;
      state.error = false;
    },
  },
});

export const { actions: loginActions } = slice;
export default slice.reducer;
export const useLoginSlice = () => {
  return { actions: slice.actions };
};