export interface ModifyUserState {
  name: string;
  lastName: string;
  email: string;
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
  role: string;
  loadError: boolean;
  modifyError: boolean;
  deleteError: boolean;
  isLoading: boolean;
  isModifying: boolean;
  isDeleting: boolean;
  loadSuccess: boolean;
  modifySuccess: boolean;
  deleteSuccess: boolean;
  userNotFound: boolean;
}
