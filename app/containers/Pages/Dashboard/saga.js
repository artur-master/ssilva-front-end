/*
 *
 * Dashboard saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_ENTITIES, FETCH_LOGS } from './constants';
import { fetchEntitiesError, fetchEntitiesSuccess, fetchLogsSuccess, fetchLogsError } from './actions';

function* fetchEntities() {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos/`;
  try {
    const response = yield call(request, requestURL);
    yield put(fetchEntitiesSuccess(response));
  } catch (error) {
    yield put(fetchEntitiesError(error));
  }
}

function* fetchLogs() {
  const requestURL = `${API_ROOT}/ventas/logs-dashboard/`;
  try {
    const response = yield call(request, requestURL);
    yield put(fetchLogsSuccess(response));
  } catch (error) {
    yield put(fetchLogsError(error));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(FETCH_ENTITIES, fetchEntities);
  yield takeLatest(FETCH_LOGS, fetchLogs);
}
