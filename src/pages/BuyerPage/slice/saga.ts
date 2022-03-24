import {call, put, takeEvery } from 'redux-saga/effects';
import { buyerActions as actions } from '.';
import { constants } from '../../../utils/constants';
import { request } from '../../../utils/request';
import { getToken } from '../../../utils/cookies';
 
export function* buyerWatcherSaga() {
  yield takeEvery(actions.fetchingData.type, buyerWorkerSaga);
}
const requestURL = `${constants.URL}/product/selectAll`;
  
function* buyerWorkerSaga():any {
  try {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    requestHeaders.append('authorization', getToken().replace(/['"]+/g, ''));  
    const requestOptions = {
      method: 'GET',
      headers: requestHeaders,
      redirect: 'follow',
    };  
    const payload = yield call(request, requestURL, requestOptions);
    if (payload) {
      yield put(actions.setProducts(payload['products']))
      yield put(actions.loadProductsSuccess());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.loadProductsError());
  }
}