import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import moment from 'components/moment';
import { ESCRITURA_STATE } from 'containers/App/constants';

import { API_ROOT } from 'containers/App/constants';
import {
  GET_ESCRITURA,
  CONFIRM_ESCRITURA,
  APROBA_ESCRITURA,
  CHECK_PROMESA,
} from './constants';

import {
  getEscrituraError,
  getEscrituraSuccess,
  confirmEscrituraError,
  confirmEscrituraSuccess,
  aproveDateEscrituraError,
  aproveDateEscrituraSuccess,
  checkPromesaError,
  checkPromesaSuccess,
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

function* sagaConfirmEscritura(action) {
  const requestURL = `${API_ROOT}/ventas/escritura/`;
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'POST',
        body: JSON.stringify({
          ProyectoID:action.ProyectoID,
          EscrituraState: ESCRITURA_STATE.Recep_Mun,
        }),
      }
    );

    yield put(confirmEscrituraSuccess(response));
  } catch (error) {
    yield put(confirmEscrituraError(error));
  }
}

function* sagaAprobaEscritura(action) {
  const requestURL = `${API_ROOT}/ventas/escritura/${action.EscrituraID}/`;
  try {
    const response = yield call(
      request,
      requestURL,
      {
        method: 'PATCH',
        body: JSON.stringify({
          ...action.values,
          EscrituraState: ESCRITURA_STATE.Fechas_Avisos,
        }),
      }
    );

    yield put(aproveDateEscrituraSuccess(response));
  } catch (error) {
    yield put(aproveDateEscrituraError(error));
  }
}

function* sagaCheckPromesa(action) {
  const data = action.values;
  data.append('EscrituraState', ESCRITURA_STATE.A_Comercial);

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

export default function* projectSaga() {
  yield takeLatest(GET_ESCRITURA, sagaGetEscritura);
  yield takeLatest(CONFIRM_ESCRITURA, sagaConfirmEscritura);
  yield takeLatest(APROBA_ESCRITURA, sagaAprobaEscritura);
  yield takeLatest(CHECK_PROMESA, sagaCheckPromesa);
}
