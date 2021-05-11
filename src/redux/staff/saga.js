import { all, takeEvery, put, fork, select} from 'redux-saga/effects';
import jwtConfig from '@iso/config/jwt.config';
import actions from './actions';
import SuperFetch from '../../library/helpers/superFetch';


export function* getAllStaffRequest() {

  yield takeEvery('GET_ALL_STAFF_REQUEST', function*() {
    try {
      const res = yield fetch(`${jwtConfig.fetchUrl}staff`, {
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
          type: actions.GET_ALL_STAFF_SUCCESS,
          payload: { memebers: data.staff }
        });
      } else {
        yield put({
          type: actions.GET_ALL_STAFF_ERROR,
          payload: data.error
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.GET_ALL_STAFF_ERROR,
        payload: {message: "Please Connect to Internet"}
      });
    }
  });
}

export function* storeStaffRequest() {

  yield takeEvery('STORE_NEW_STAFF_REQUEST', function*() {
    try {
      const { staff } = yield select();
      const payload = staff.selected_staff_member
      const res = yield SuperFetch.post('staff', payload)

      if(res.success === true) {
        yield put({
          type: actions.STORE_NEW_STAFF_SUCCESS,
          payload: { staff: res.staff }
        });
        yield put({
          type: actions.CLOSE_INSERT_STAFF_MODAL
        });
      } else {
        yield put({
          type: actions.STORE_NEW_STAFF_ERROR,
          payload: {error: res.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.STORE_NEW_STAFF_ERROR,
        payload: {error: "Please Connect to Internet"}
      });
    }
  });
}

export function* editStaffRequest() {

  yield takeEvery('EDIT_STAFF_REQUEST', function*() {
    try {
      const { staff } = yield select();
      const payload = {
        name: staff.selected_staff_member.name,
        email: staff.selected_staff_member.email,
        job_title: staff.selected_staff_member.job_title,
        phone_number: staff.selected_staff_member.phone_number
      };
      const staff_id = staff.selected_staff_id;
      const res = yield SuperFetch.put(`staff/${staff_id}/update`, payload)


      if(res.success === true) {
        yield put({
          type: actions.EDIT_STAFF_SUCCESS,
          payload: { staff: res.staff }
        });
        yield put({
          type: actions.CLOSE_EDIT_STAFF_MODAL
        });
      } else {
        yield put({
          type: actions.EDIT_STAFF_ERROR,
          payload: {error: res.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.EDIT_STAFF_ERROR,
        payload: {error: "Please Connect to Internet"}
      });
    }
  });
}


export default function* rootSaga() {
  yield all([
    fork(getAllStaffRequest),
    fork(storeStaffRequest),
    fork(editStaffRequest)
  ]);
}
