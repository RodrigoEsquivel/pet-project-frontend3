import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.signUp || initialState;

export const selectSignUp = createSelector([selectSlice], state => state);

export const selectName = createSelector(
  [selectSlice],
  SignUpState => SignUpState.name,
);

export const selectLastName = createSelector(
  [selectSlice],
  SignUpState => SignUpState.lastName,
);

export const selectPassword = createSelector(
  [selectSlice],
  SignUpState => SignUpState.password,
);

export const selectPasswordConfirmation = createSelector(
  [selectSlice],
  SignUpState => SignUpState.passwordConfirmation,
);

export const selectEmail = createSelector(
  [selectSlice],
  SignUpState => SignUpState.email,
);

export const selectRole = createSelector(
  [selectSlice],
  SignUpState => SignUpState.role,
);

export const selectError = createSelector(
  [selectSlice],
  SignUpState => SignUpState.error,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  SignUpState => SignUpState.isFetching,
);

export const selectSignUpSuccess = createSelector(
  [selectSlice],
  SignUpState => SignUpState.signUpSuccess,
);

export const selectAlreadyRegistered = createSelector(
  [selectSlice],
  SignUpState => SignUpState.alreadyRegistered,
);
