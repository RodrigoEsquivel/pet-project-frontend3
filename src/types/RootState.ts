import { LoginState } from '../pages/LoginPage/slice/types';
import { SignUpState } from '../pages/SignUpPage/slice/types';

export interface RootState {
    login?: LoginState;
    signUp?: SignUpState;
  }