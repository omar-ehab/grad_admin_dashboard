import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken } from '@iso/lib/helpers/utility';
import authHelper from '@iso/lib/helpers/authHelper';
import actions from './actions';

const history = createBrowserHistory();

export function* loginRequest() {

  yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
    const data = yield call(authHelper.login, payload);
    if (data.token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: data.token,
        adminId: data.id
      });
    } else {
      console.clear()
      yield put({ type: actions.LOGIN_ERROR, error_message: data.error.message });
    }
  });
}

export function* loginSuccess() {

  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    if (typeof window !== 'undefined') {
      yield localStorage.setItem('admin_id_token', payload.token);
      yield localStorage.setItem('admin_dashboard_id', payload.adminId);
    }
  });

}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    yield clearToken();
    history.push('/');
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function*() {
    const token = getToken().get('idToken');
    const adminId = getToken().get('adminId');
    if (token && adminId) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        adminId,
        profile: 'Profile',
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
