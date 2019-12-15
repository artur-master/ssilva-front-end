import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { RECEPCION_GRANTIA } from './constants';
import { recepcionGarantiaError, recepcionGarantiaSuccess } from './actions';

export function* sagaRecepcionGarantian(action) {
  const requestURL = `${API_ROOT}/ventas/promesas-register-guarantee/${
    action.PromesaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify({ Refund: action.refund }),
    });
    yield put(recepcionGarantiaSuccess(action.PromesaID, response));
  } catch (error) {
    yield put(recepcionGarantiaError(action.PromesaID, error));
  }
}

export default function* promesaSaga() {
  yield takeLatest(RECEPCION_GRANTIA, sagaRecepcionGarantian);
}
