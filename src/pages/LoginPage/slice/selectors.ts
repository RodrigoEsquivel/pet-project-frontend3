import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.login || initialState;

export const selectEmail = createSelector(
  [selectSlice],
  LoginState => LoginState.email,
);

export const selectPassword = createSelector(
  [selectSlice],
  LoginState => LoginState.password,
);

export const selectIsLogged = createSelector(
  [selectSlice],
  LoginState => LoginState.isLogged,
);

export const selectError = createSelector(
  [selectSlice],
  LoginState => LoginState.error,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  LoginState => LoginState.isFetching,
);

export const selectLogin = createSelector([selectSlice], state => state);
