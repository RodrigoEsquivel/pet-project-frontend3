import { LoginState } from '../pages/LoginPage/slice/types';
import { SignUpState } from '../pages/SignUpPage/slice/types';
import { CreateProductState } from '../pages/CreateProductPage/slice/types';

export interface RootState {
    login?: LoginState;
    signUp?: SignUpState;
    createProduct?: CreateProductState;
  }