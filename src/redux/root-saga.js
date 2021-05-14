import { all } from 'redux-saga/effects';
import authSagas from '@iso/redux/auth/saga';
import marketsSaga from '@iso/redux/markets/saga';
import marketSaga from '@iso/redux/market/saga';
import studentsSaga from '@iso/redux/students/saga';
import studentSaga from '@iso/redux/student/saga';
import staffSaga from '@iso/redux/staff/saga';
import doctorsSaga from '@iso/redux/doctors/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    marketsSaga(),
    marketSaga(),
    studentsSaga(),
    studentSaga(),
    staffSaga(),
    doctorsSaga()
  ]);
}
