import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SignUpState } from './types';

export const initialState: SignUpState = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  role: '',
  error: false,
  isFetching: false,
  signUpSuccess: false,
  alreadyRegistered: false,
};

const slice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<any>) {
      state.name = action.payload;
    },
    setLastName(state, action: PayloadAction<any>) {
      state.lastName = action.payload;
    },
    setEmail(state, action: PayloadAction<any>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<any>) {
      state.password = action.payload;
    },
    setPasswordConfirmation(state, action: PayloadAction<any>) {
      state.passwordConfirmation = action.payload;
    },
    setRole(state, action: PayloadAction<any>) {
      state.role = action.payload;
    },
    AlreadyRegistered(state) {
      state.alreadyRegistered = true;
      state.isFetching = false;
      state.error = true;
      state.signUpSuccess = false;
    },
    signUpError(state) {
      state.signUpSuccess = false;
      state.isFetching = false;
      state.error = true;
      state.alreadyRegistered = false;
    },
    signUpSuccess(state) {
      state.alreadyRegistered = false;
      state.signUpSuccess = true;
      state.isFetching = false;
      state.error = false;
    },
    fetchingData(state) {
      state.alreadyRegistered = false;
      state.signUpSuccess = false;
      state.isFetching = true;
      state.error = false;
    },
  },
});

export const { actions: signUpActions } = slice;
export default slice.reducer;

export const useSignUpSlice = () => {
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
