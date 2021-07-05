import { all, takeEvery, put, fork, select} from 'redux-saga/effects';
import jwtConfig from '@iso/config/jwt.config';
import actions from './actions';
import SuperFetch from '../../library/helpers/superFetch';


export function* getAllMarketsRequest() {

  yield takeEvery('GET_ALL_MARKETS_REQUEST', function*() {
    try {
      const res = yield fetch(`${jwtConfig.fetchUrl}markets`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('admin_id_token') || undefined,
        }
      });

      const data = yield res.json();
      if(data.success === true){
        yield put({
          type: actions.GET_ALL_MARKETS_SUCCESS,
          payload: { markets: data.markets }
        });
      } else {
        yield put({
          type: actions.GET_ALL_MARKETS_ERROR,
          payload: data.error
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.GET_ALL_MARKETS_ERROR,
        payload: {message: "Please Connect to Internet"}
      });
    }
  });
}

export function* storeMarketRequest() {

  yield takeEvery('STORE_NEW_MARKET_REQUEST', function*() {
    try {
      const { markets } = yield select();
      const payload = {name: markets.selected_market.market_name}
      payload.createdBy = localStorage.getItem('admin_dashboard_id');
      const res = yield SuperFetch.post('markets', payload)

      if(res.success === true) {
        yield put({
          type: actions.STORE_NEW_MARKET_SUCCESS,
          payload: { market: res.market }
        });
        yield put({
          type: actions.CLOSE_INSERT_MARKET_MODAL
        });
      } else {
        yield put({
          type: actions.STORE_NEW_MARKET_ERROR,
          payload: {error: res.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.STORE_NEW_MARKET_ERROR,
        payload: {error: "Please Connect to Internet"}
      });
    }
  });
}

export function* editMarketRequest() {

  yield takeEvery('EDIT_MARKET_REQUEST', function*() {
    try {
      const { markets } = yield select();
      const payload = {
        name: markets.selected_market.market_name
      };
      const market_id = markets.selected_market_id;
      const res = yield SuperFetch.put(`markets/${market_id}/update`, payload)


      if(res.success === true) {
        yield put({
          type: actions.EDIT_MARKET_SUCCESS,
          payload: { market: res.market }
        });
        yield put({
          type: actions.CLOSE_EDIT_MARKET_MODAL
        });
      } else {
        yield put({
          type: actions.EDIT_MARKET_ERROR,
          payload: {error: res.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.EDIT_MARKET_ERROR,
        payload: {error: "Please Connect to Internet"}
      });
    }
  });
}


export default function* rootSaga() {
  yield all([
    fork(getAllMarketsRequest),
    fork(storeMarketRequest),
    fork(editMarketRequest)
  ]);
}
