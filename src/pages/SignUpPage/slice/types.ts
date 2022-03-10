/* --- STATE --- */
export interface SignUpState {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
  error: boolean;
  isFetching: boolean;
  signUpSuccess: boolean;
  alreadyRegistered: boolean;
}
