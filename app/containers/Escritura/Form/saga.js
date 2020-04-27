import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
// import moment from 'components/moment';
import { ESCRITURA_STATE } from 'containers/App/constants';

import { API_ROOT } from 'containers/App/constants';
import {
  GET_ESCRITURA,
  UPDATE_ESCRITURA,
  CHECK_PROMESA,
  NOTIFICAR_COMPRADO,
} from './constants';

import {
  getEscrituraError,
  getEscrituraSuccess,
  updateEscrituraError,
  updateEscrituraSuccess,
  checkPromesaError,
  checkPromesaSuccess,
  notificarCompradoresError,
  notificarCompradoresSuccess,
} from './actions';

function* sagaGetEscritura(action) {
  const requestURL = `${API_ROOT}/ventas/escritura/?q=${action.ProyectoID}`;
  try {
    const response = yield call(request, requestURL);
    yield put(getEscrituraSuccess(response));
  } catch (error) {
    yield put(getEscrituraError(error));
  }
}

function* sagaUpdateEscritura(action) {
  const requestURL = `${API_ROOT}/ventas/escritura-proyecto/${action.ProyectoID}/`;
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'PATCH',
        body: action.values,
        headers: {
          'content-type': null,
        },
      }
    );

    yield put(updateEscrituraSuccess(response));
  } catch (error) {
    yield put(updateEscrituraError(error));
  }
}

function* sagaCheckPromesa(action) {
  const data = action.values;
  data.append('EscrituraState', ESCRITURA_STATE.Fechas_Avisos_ES);

  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/escritura/${action.EscrituraID}/`,
      {
        method: 'PATCH',
        body: data,
        headers: {
          'content-type': null,
        },
      }
    );

    yield put(checkPromesaSuccess(response));
  } catch (error) {
    yield put(checkPromesaError(error));
  }
}

function* sagaNotificarCompradores(action) {
  const requestURL = `${API_ROOT}/ventas/escritura/${action.EscrituraID}/`;
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'PATCH',
        body: JSON.stringify({
          ProyectoID:action.ProyectoID,
          EscrituraState: ESCRITURA_STATE.Apr_Creditos_I,
        }),
      }
    );

    yield put(notificarCompradoresSuccess(response));
  } catch (error) {
    yield put(notificarCompradoresError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(GET_ESCRITURA, sagaGetEscritura);
  yield takeLatest(UPDATE_ESCRITURA, sagaUpdateEscritura);
  yield takeLatest(CHECK_PROMESA, sagaCheckPromesa);
  yield takeLatest(NOTIFICAR_COMPRADO, sagaNotificarCompradores);
}
