import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import  loginReducer  from '../pages/LoginPage/slice/'
import { loginWatcherSaga } from '../pages/LoginPage/slice/saga';
import signUpReducer from '../pages/SignUpPage/slice';
import { signUpWatcherSaga } from '../pages/SignUpPage/slice/saga';
import createProductReducer from '../pages/CreateProductPage/slice';
import { createProductWatcherSaga } from '../pages/CreateProductPage/slice/saga';
import buyerReducer from '../pages/BuyerPage/slice';
import { buyerWatcherSaga } from '../pages/BuyerPage/slice/saga';
import sellerReducer from '../pages/SellerPage/slice';
import { sellerWatcherSaga } from '../pages/SellerPage/slice/saga';
import modifyUserReducer from '../pages/ModifyUserPage/slice';
import { modifyUserWatcherSaga } from '../pages/ModifyUserPage/slice/saga';

export const configureAppStore = () =>{
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer:{
            login : loginReducer,
            signUp: signUpReducer,
            createProduct: createProductReducer,
            buyer: buyerReducer,
            seller: sellerReducer,
            modifyUser: modifyUserReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    });

    sagaMiddleware.run(loginWatcherSaga);
    sagaMiddleware.run(signUpWatcherSaga);
    sagaMiddleware.run(createProductWatcherSaga);
    sagaMiddleware.run(buyerWatcherSaga);
    sagaMiddleware.run(sellerWatcherSaga);
    sagaMiddleware.run(modifyUserWatcherSaga);

    return store;
}