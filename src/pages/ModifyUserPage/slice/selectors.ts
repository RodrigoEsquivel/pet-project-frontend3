import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.modifyUser || initialState;

export const selectModifyUser = createSelector([selectSlice], state => state);

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

export const selectNewPassword = createSelector(
  [selectSlice],
  SignUpState => SignUpState.newPassword,
);

export const selectNewPasswordConfirmation = createSelector(
  [selectSlice],
  SignUpState => SignUpState.newPasswordConfirmation,
);

export const selectEmail = createSelector(
  [selectSlice],
  SignUpState => SignUpState.email,
);

export const selectRole = createSelector(
  [selectSlice],
  SignUpState => SignUpState.role,
);

export const selectLoadError = createSelector(
  [selectSlice],
  SignUpState => SignUpState.loadError,
);

export const selectModifyError = createSelector(
  [selectSlice],
  SignUpState => SignUpState.modifyError,
);

export const selectDeleteError = createSelector(
  [selectSlice],
  SignUpState => SignUpState.deleteError,
);

export const selectIsLoading = createSelector(
  [selectSlice],
  SignUpState => SignUpState.isLoading,
);

export const selectIsModifying = createSelector(
  [selectSlice],
  SignUpState => SignUpState.isModifying,
);

export const selectIsDeleting = createSelector(
  [selectSlice],
  SignUpState => SignUpState.isDeleting,
);

export const selectLoadSuccess = createSelector(
  [selectSlice],
  SignUpState => SignUpState.loadSuccess,
);

export const selectModifySuccess = createSelector(
  [selectSlice],
  SignUpState => SignUpState.modifySuccess,
);

export const selectDeleteSuccess = createSelector(
  [selectSlice],
  SignUpState => SignUpState.deleteSuccess,
);

export const selectUserNotFound = createSelector(
  [selectSlice],
  SignUpState => SignUpState.userNotFound,
);
