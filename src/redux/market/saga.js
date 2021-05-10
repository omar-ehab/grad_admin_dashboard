import { all, takeEvery, put, fork} from 'redux-saga/effects';
import jwtConfig from '@iso/config/jwt.config';
import actions from './actions';
// import SuperFetch from '../../library/helpers/superFetch';


export function* getMarketRequest() {

  yield takeEvery('GET_MARKET_REQUEST', function*({payload}) {
    try {
      const res = yield fetch(`${jwtConfig.fetchUrl}markets/${payload.market_id}`, {
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
          type: actions.GET_MARKET_SUCCESS,
          payload: { market: data.market }
        });
      } else {
        yield put({
          type: actions.GET_MARKET_ERROR,
          payload: {error: "something went wrong"}
        });
      }
    
    } catch(err) {
      console.log(err);
      yield put({
        type: actions.GET_MARKET_ERROR,
        payload: {error: "Please Connect to Internet"}
      });
    }
  });
}

export function* getMarketTransactionsRequest() {

  yield takeEvery('GET_MARKET_TRANSACTIONS_REQUEST', function*({payload}) {
    try {
      const res = yield fetch(`${jwtConfig.fetchUrl}wallets/other/${payload.market_id}/Transaction`, {
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
          type: actions.GET_MARKET_TRANSACTIONS_SUCCESS,
          payload: { transactions: data.transactions }
        });
      } else {
        yield put({
          type: actions.GET_MARKET_TRANSACTIONS_ERROR,
          payload: {error: "something went wrong"}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.GET_STUDENT_TRANSACTIONS_ERROR,
        payload: {error: "Please Connect to Internet"}
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getMarketRequest),
    fork(getMarketTransactionsRequest),
  ]);
}
