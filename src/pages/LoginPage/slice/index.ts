import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { LoginState } from './types';

export const initialState: LoginState = {
  email: '',
  password: '',
  token: '',
  userID: '',
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
    authSuccess(state: LoginState, action: PayloadAction<any>) {
      state.token = action.payload.token;
      state.userID = action.payload.userID;
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

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useLoginSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
