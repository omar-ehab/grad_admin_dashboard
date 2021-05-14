import { all, takeEvery, put, fork, select} from 'redux-saga/effects';
import jwtConfig from '@iso/config/jwt.config';
import actions from './actions';
import SuperFetch from '../../library/helpers/superFetch';


export function* getAllDoctorsRequest() {

  yield takeEvery('GET_ALL_DOCTORS_REQUEST', function*() {
    try {
      const res = yield fetch(`${jwtConfig.fetchUrl}doctors`, {
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
          type: actions.GET_ALL_DOCTORS_SUCCESS,
          payload: { doctors: data.doctors }
        });
      } else {
        yield put({
          type: actions.GET_ALL_DOCTORS_ERROR,
          payload: data.error
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.GET_ALL_DOCTORS_ERROR,
        payload: {message: "Please Connect to Internet"}
      });
    }
  });
}

export function* storeDoctorRequest() {

  yield takeEvery('STORE_NEW_DOCTORS_REQUEST', function*() {
    try {
      const { doctors } = yield select();
      const payload = doctors.selected_doctor
      const res = yield SuperFetch.post('doctors', payload)

      if(res.success === true) {
        yield put({
          type: actions.STORE_NEW_DOCTORS_SUCCESS,
          payload: { doctor: res.doctor }
        });
        yield put({
          type: actions.CLOSE_INSERT_DOCTORS_MODAL
        });
      } else {
        yield put({
          type: actions.STORE_NEW_DOCTORS_ERROR,
          payload: {error: res.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.STORE_NEW_DOCTORS_ERROR,
        payload: {error: "Please Connect to Internet"}
      });
    }
  });
}

export function* editDoctorRequest() {

  yield takeEvery('EDIT_DOCTORS_REQUEST', function*() {
    try {
      const { doctors } = yield select();
      const payload = {
        name: doctors.selected_doctor.name,
        email: doctors.selected_doctor.email,
        phone_number: doctors.selected_doctor.phone_number
      };
      const doctor_id = doctors.selected_doctor_id;
      const res = yield SuperFetch.put(`doctors/${doctor_id}/update`, payload)

      if(res.success === true) {
        yield put({
          type: actions.EDIT_DOCTORS_SUCCESS,
          payload: { doctor: res.doctor }
        });
        yield put({
          type: actions.CLOSE_EDIT_DOCTORS_MODAL
        });
      } else {
        yield put({
          type: actions.EDIT_DOCTORS_ERROR,
          payload: {error: res.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.EDIT_DOCTORS_ERROR,
        payload: {error: "Please Connect to Internet"}
      });
    }
  });
}


export default function* rootSaga() {
  yield all([
    fork(getAllDoctorsRequest),
    fork(storeDoctorRequest),
    fork(editDoctorRequest)
  ]);
}
