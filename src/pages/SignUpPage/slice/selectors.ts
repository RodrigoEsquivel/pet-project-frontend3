import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.signUp || initialState;

export const selectSignUp = createSelector([selectSlice], state => state);

export const selectName = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.name,
);

export const selectLastName = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.lastName,
);

export const selectPassword = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.password,
);

export const selectPasswordConfirmation = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.passwordConfirmation,
);

export const selectEmail = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.email,
);

export const selectRole = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.role,
);

export const selectError = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.error,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.isFetching,
);

export const selectSignUpSuccess = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.signUpSuccess,
);

export const selectAlreadyRegistered = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.alreadyRegistered,
);
