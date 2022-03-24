import {
    call,
    put,
    takeEvery,
  } from 'redux-saga/effects';
  import { sellerActions as actions } from '.';
  import { constants } from '../../../utils/constants';
  import { request } from '../../../utils/request';
  import { getToken, getUserId } from '../../../utils/cookies';
  
  export function* sellerWatcherSaga() {
    yield takeEvery(actions.fetchingData.type, sellerWorkerSaga);
  }
  const requestURL = `${constants.URL}/product/selectAllFromUser`;
  
  function* sellerWorkerSaga():any {
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
      const payload = yield call(request, requestURL, requestOptions);
      if (payload) {
        yield put(actions.setProducts(payload['products']))
        yield put(actions.loadProductsSuccess());
      }
    } catch (error) {
      yield put(actions.loadProductsError());
    }
  }
  