import { call, put, select, takeEvery } from 'redux-saga/effects';
import { modifyUserActions as actions } from '.';
import { constants } from '../../../utils/constants';
import {
  selectEmail,
  selectPassword,
  selectName,
  selectLastName,
  selectRole,
  selectNewPassword,
} from './selectors';
import { request } from '../../../utils/request';
import { getToken, getUserId } from '../../../utils/cookies';

export function* modifyUserWatcherSaga() {
  yield takeEvery(actions.isModifying.type, modifyWorkerSaga);
  yield takeEvery(actions.isLoading.type, loadWorkerSaga);
  yield takeEvery(actions.isDeleting.type, deleteWorkerSaga);
}

const modifyRequestURL = `${constants.URL}/user/update`;
const loadRequestURL = `${constants.URL}/user/read`;
const deleteRequestURL = `${constants.URL}/user/deleteUser`;

function* modifyWorkerSaga():any {
  try {
    const Email: string = yield select(selectEmail);
    const Name: string = yield select(selectName);
    const LastName: string = yield select(selectLastName);
    const Role: string = yield select(selectRole);
    const Password: string = yield select(selectPassword);
    const NewPassword: string = yield select(selectNewPassword);
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    requestHeaders.append('authorization', getToken().replace(/['"]+/g, ''));

    const urlencoded = new URLSearchParams();
    urlencoded.append('UserId', getUserId());
    urlencoded.append('Email', Email);
    urlencoded.append('Name', Name);
    urlencoded.append('LastName', LastName);
    urlencoded.append('Role', Role);
    urlencoded.append('Password', Password);
    urlencoded.append('NewPassword', NewPassword)

    const requestOptions = {
      method: 'POST',
      headers: requestHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    const payload = yield call(request, modifyRequestURL, requestOptions);
    if (payload.message === 'User not found') {
      yield put(actions.userNotFound());
    } else {
      yield put(actions.modifySuccess());
    }
  } catch (error) {
    yield put(actions.modifyError());
  }
}

function* loadWorkerSaga():any {
  try {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    requestHeaders.append('authorization', getToken().replace(/['"]+/g, ''));

    const urlencoded = new URLSearchParams();
    urlencoded.append('UserId', getUserId());

    const requestOptions = {
      method: 'POST',
      headers: requestHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    const payload = yield call(request, loadRequestURL, requestOptions);
    if (payload) {
      yield put(actions.setEmail(payload['user']['email']));
      yield put(actions.setLastName(payload['user']['lastName']));
      yield put(actions.setName(payload['user']['name']));
      yield put(actions.setRole(payload['user']['role']));
      yield put(actions.loadSuccess());
    }
  } catch (error) {
    yield put(actions.loadError());
  }
}

function* deleteWorkerSaga():any {
  try {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    requestHeaders.append('authorization', getToken().replace(/['"]+/g, ''));

    const urlencoded = new URLSearchParams();
    urlencoded.append('UserId', getUserId());

    const requestOptions = {
      method: 'POST',
      headers: requestHeaders,
      body: urlencoded,
      redirect: 'follow',
    };
    
    const payload = yield call(request, deleteRequestURL, requestOptions);
    if (payload) {
      yield put(actions.deleteSuccess());
    }
  } catch (error) {
    yield put(actions.deleteError());
  }
}