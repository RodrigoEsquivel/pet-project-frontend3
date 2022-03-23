import {
    take,
    call,
    put,
    select,
    takeLatest,
    takeEvery,
    delay,
  } from 'redux-saga/effects';
  import { createProductActions as actions } from '.';
  import { constants } from '../../../utils/constants';
  import {
    selectName,
    selectDescription,
    selectImageURI,
    selectBrand,
    selectPrice
  } from './selectors';
  import { request } from '../../../utils/request';
  import { url } from 'inspector';
  import { getToken, getUserId } from '../../../utils/utils';
  
  export function* createProductWatcherSaga() {
    yield takeEvery(actions.fetchingData.type, createProductWorkerSaga);
  }
  //needs to add seller with the id of the logged in user
  const requestURL = `${constants.URL}/product/create`;
  
  function* createProductWorkerSaga():any {
    try {
      const Name: string = yield select(selectName);
      const Description: string = yield select(selectDescription);
      const ImageURI: string = yield select(selectImageURI);
      const Brand: string = yield select(selectBrand);
      const Price: number = yield select(selectPrice);
      const requestHeaders = new Headers();
      requestHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
      requestHeaders.append('authorization', getToken().replace(/['"]+/g, ''));
  
      const urlencoded = new URLSearchParams();   
      urlencoded.append('Name', Name);
      urlencoded.append('Description', Description);
      urlencoded.append('ImageURI', ImageURI);
      urlencoded.append('Sold', false.toString());
      urlencoded.append('Price', Price.toString());
      urlencoded.append('Brand', Brand);
      urlencoded.append('Seller', getUserId());
      
      
  
      const requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        body: urlencoded,
        redirect: 'follow',
      };
  
      const payload = yield call(request, requestURL, requestOptions);
      if (payload) {
        yield put(actions.createProductSuccess());
      }
    } catch (error) {
      yield put(actions.createProductError());
    }
  }
  