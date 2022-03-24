import { LoginState } from '../pages/LoginPage/slice/types';
import { SignUpState } from '../pages/SignUpPage/slice/types';
import { CreateProductState } from '../pages/CreateProductPage/slice/types';
import { BuyerPageState } from '../pages/BuyerPage/slice/types';
import { SellerPageState } from '../pages/SellerPage/slice/types';

export interface RootState {
    login?: LoginState;
    signUp?: SignUpState;
    createProduct?: CreateProductState;
    buyer?: BuyerPageState;
    seller?: SellerPageState;
  }