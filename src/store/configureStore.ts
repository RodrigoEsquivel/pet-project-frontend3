import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import  loginReducer  from '../pages/LoginPage/slice/'
import { loginWatcherSaga } from '../pages/LoginPage/slice/saga';
import signUpReducer from '../pages/SignUpPage/slice';
import { signUpWatcherSaga } from '../pages/SignUpPage/slice/saga';
//importar reducers y sgas de las páginas

export const configureAppStore = () =>{
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer:{
            login : loginReducer,
            signUp: signUpReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    });

    sagaMiddleware.run(loginWatcherSaga);
    sagaMiddleware.run(signUpWatcherSaga);

    return store;
}