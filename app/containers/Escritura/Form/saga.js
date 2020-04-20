import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import moment from 'components/moment';
import { ESCRITURA_STATE } from 'containers/App/constants';

import { API_ROOT } from 'containers/App/constants';
import {
  GET_ESCRITURA,
  CONFIRM_ESCRITURA,
} from './constants';

import {
  getEscrituraError,
  getEscrituraSuccess,
  confirmEscrituraError,
  confirmEscrituraSuccess,
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

export default function* projectSaga() {
  yield takeLatest(GET_ESCRITURA, sagaGetEscritura);
  yield takeLatest(CONFIRM_ESCRITURA, sagaConfirmEscritura);
}
