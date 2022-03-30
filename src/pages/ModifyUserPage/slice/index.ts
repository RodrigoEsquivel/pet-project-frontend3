import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ModifyUserState } from './types';

export const initialState: ModifyUserState = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  newPassword: '',
  newPasswordConfirmation: '',
  role: '',
  loadError: false,
  loadSuccess: false,
  isLoading: false,
  modifyError: false,
  modifySuccess: false,
  isModifying: false,
  userNotFound: false,
  deleteError: false,
  deleteSuccess: false,
  isDeleting: false,
};

const slice = createSlice({
  name: 'modify',
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
    setNewPassword(state, action: PayloadAction<any>) {
      state.newPassword = action.payload;
    },
    setNewPasswordConfirmation(state, action: PayloadAction<any>) {
      state.newPasswordConfirmation = action.payload;
    },
    setRole(state, action: PayloadAction<any>) {
      state.role = action.payload;
    },
    setModifySuccess(state, action: PayloadAction<any>) {
      state.modifySuccess = action.payload;
    },
    setDeleteSuccess(state, action: PayloadAction<any>) {
      state.deleteSuccess = action.payload;
    },
    userNotFound(state) {
      state.userNotFound = true;
      state.isModifying = false;
      state.modifyError = true;
      state.modifySuccess = false;
    },
    modifyError(state) {
      state.userNotFound = false;
      state.isModifying = false;
      state.modifyError = true;
      state.modifySuccess = false;
    },
    modifySuccess(state) {
      state.userNotFound = false;
      state.isModifying = false;
      state.modifyError = false;
      state.modifySuccess = true;
    },
    isModifying(state) {
      state.userNotFound = false;
      state.isModifying = true;
      state.modifyError = false;
      state.modifySuccess = false;
    },
    loadError(state) {
      state.isLoading = false;
      state.loadError = true;
      state.loadSuccess = false;
    },
    loadSuccess(state) {
      state.isLoading = false;
      state.loadError = false;
      state.loadSuccess = true;
    },
    isLoading(state) {
      state.isLoading = true;
      state.loadError = false;
      state.loadSuccess = false;
    },
    deleteError(state) {
      state.isDeleting = false;
      state.deleteError = true;
      state.deleteSuccess = false;
    },
    deleteSuccess(state) {
      state.isDeleting = false;
      state.deleteError = false;
      state.deleteSuccess = true;
    },
    isDeleting(state) {
      state.isDeleting = true;
      state.deleteError = false;
      state.deleteSuccess = false;
    },
  },
});

export const { actions: modifyUserActions } = slice;
export default slice.reducer;
export const useModifyUserSlice = () => {
  return { actions: slice.actions };
};