import { all, takeEvery, put, fork} from 'redux-saga/effects';
import jwtConfig from '@iso/config/jwt.config';
import actions from './actions';

export function* getLabsRequest(){
  yield takeEvery(actions.GET_LABS_REQUEST, function*({payload}){

    try{
      const res = yield fetch(`${jwtConfig.fetchUrl}labs`, {
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
          type: actions.GET_LABS_SUCCESS,
          payload: { labs: data.labs }
        });
      } else {
        yield put({
          type: actions.GET_LABS_ERROR,
          payload: {error: "something went wrong"}
        });
      }
    } catch(err){
      console.log(err);
      yield put({
        type: actions.GET_LABS_ERROR,
        payload: {error: "Please Connect to Internet"}
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getLabsRequest),
  ]);
}