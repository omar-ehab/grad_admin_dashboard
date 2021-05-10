import { all, takeEvery, put, fork, select} from 'redux-saga/effects';
import jwtConfig from '@iso/config/jwt.config';
import actions from './actions';
import SuperFetch from '../../library/helpers/superFetch';
// import axios from 'axios';


export function* getAllStudentsRequest() {

  yield takeEvery('GET_ALL_STUDENTS_REQUEST', function*() {
    try {
      const res = yield fetch(`${jwtConfig.fetchUrl}students`, {
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
          type: actions.GET_ALL_STUDENTS_SUCCESS,
          payload: { students: data.students }
        });
      } else {
        yield put({
          type: actions.GET_ALL_STUDENTS_ERROR,
          payload: {message: data.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.GET_ALL_STUDENTS_ERROR,
        payload: {message: "Please Connect to Internet"}
      });
    }
  });
}

export function* storeStudentRequest() {

  yield takeEvery('STORE_NEW_STUDENT_REQUEST', function*() {
    try {
      const { students } = yield select();
      const payload = students.selected_student
      const res = yield SuperFetch.post('students', payload)

      if(res.success === true) {
        yield put({
          type: actions.STORE_NEW_STUDENT_SUCCESS,
          payload: { student: res.student }
        });
        yield put({
          type: actions.CLOSE_INSERT_STUDENT_MODAL
        });
      } else {
        yield put({
          type: actions.STORE_NEW_STUDENT_ERROR,
          payload: {error: res.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.STORE_NEW_STUDENT_ERROR,
        payload: {error: "Please Connect to Internet"}
      });
    }
  });
}

export function* editStudentRequest() {

  yield takeEvery('EDIT_STUDENT_REQUEST', function*() {
    try {
      const { students } = yield select();
      const payload = {
        name: students.selected_student.name,
        email: students.selected_student.email,
        birth_date: students.selected_student.birth_date,
        student_phone_number: students.selected_student.mobile,
        parent_phone_number: students.selected_student.parent_mobile
      };
      const student_id = students.selected_student_id;
      const res = yield SuperFetch.put(`students/${student_id}/update`, payload)
      // const res = yield axios.put(`${jwtConfig.fetchUrl}students/${student_id}/update`, payload)


      if(res.success === true) {
        yield put({
          type: actions.EDIT_STUDENT_SUCCESS,
          payload: { student: res.student }
        });
        yield put({
          type: actions.CLOSE_EDIT_STUDENT_MODAL
        });
      } else {
        yield put({
          type: actions.EDIT_STUDENT_ERROR,
          payload: {error: res.error}
        });
      }
    
    } catch(err) {
      yield put({
        type: actions.EDIT_STUDENT_ERROR,
        payload: {error: "Please Connect to Internet"}
      });
    }
  });
}




export default function* rootSaga() {
  yield all([
    fork(getAllStudentsRequest),
    fork(storeStudentRequest),
    fork(editStudentRequest),
  ]);
}
