import {
  take,
  call,
  put,
  select,
  takeLatest,
  takeEvery,
  delay,
} from 'redux-saga/effects';
import { signUpActions as actions } from '.';
import { constants } from '../../../utils/constants';
import {
  selectEmail,
  selectPassword,
  selectName,
  selectLastName,
  selectRole,
} from './selectors';
import { request } from '../../../utils/request';
import { url } from 'inspector';

export function* signUpWatcherSaga() {
  yield takeEvery(actions.fetchingData.type, signUpWorkerSaga);
}

const requestURL = `${constants.URL}/user/create`;

function* signUpWorkerSaga():any {
  try {
    const Email: string = yield select(selectEmail);
    const Name: string = yield select(selectName);
    const LastName: string = yield select(selectLastName);
    const Role: string = yield select(selectRole);
    const Password: string = yield select(selectPassword);
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('Email', Email);
    urlencoded.append('Name', Name);
    urlencoded.append('LastName', LastName);
    urlencoded.append('Role', Role);
    urlencoded.append('Password', Password);

    const requestOptions = {
      method: 'POST',
      headers: requestHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    const payload = yield call(request, requestURL, requestOptions);
    if (payload.message === 'Email already registered') {
      yield put(actions.AlreadyRegistered());
    } else {
      yield put(actions.signUpSuccess());
    }
  } catch (error) {
    yield put(actions.signUpError());
  }
}
