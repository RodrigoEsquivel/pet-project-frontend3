/* --- STATE --- */
export interface LoginState {
  email: string;
  password: string;
  isLogged: boolean;
  error: boolean;
  isFetching: boolean;
}
