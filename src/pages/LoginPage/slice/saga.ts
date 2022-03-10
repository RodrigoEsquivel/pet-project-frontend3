import { call, put, select, takeEvery } from 'redux-saga/effects';
import { loginActions as actions } from '.';
import { constants } from '../../../utils/constants';
import { selectEmail, selectPassword } from './selectors';
import { request } from '../../../utils/request';
import Cookies from 'universal-cookie';

// function* doSomething() {}

export function* loginWatcherSaga() {
  yield takeEvery(actions.fetchingData.type, loginWorkerSaga);
}

const requestURL = `${constants.URL}/login`;

function* loginWorkerSaga(): any {
  try {
    const Email: string = yield select(selectEmail);
    const Password: string = yield select(selectPassword);
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('Email', Email);
    urlencoded.append('Password', Password);

    const requestOptions = {
      method: 'POST',
      headers: requestHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    const payload = yield call(request, requestURL, requestOptions);
    const { token } = payload['token'];
    const cookies = new Cookies();
    cookies.set('token', token, { path: '/' });
    yield put(actions.authSuccess());
  } catch (e) {
    yield put(actions.authError());
  }
}
