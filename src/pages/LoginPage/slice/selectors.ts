import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.login || initialState;

export const selectEmail = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.email,
);

export const selectPassword = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.password,
);

export const selectIsLogged = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.isLogged,
);

export const selectError = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.error,
);

export const selectIsFetching = createSelector(
  [selectSlice],
  LoginExampleState => LoginExampleState.isFetching,
);

export const selectLogin = createSelector([selectSlice], state => state);
