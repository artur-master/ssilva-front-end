import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { SAVE_QUOTATION, GET_QUOTATION } from './constants';
import {
  saveQuotationError,
  saveQuotationSuccess,
  getQuotationError,
  getQuotationSuccess,
} from './actions';

function* getQuotation(action) {
  const requestURL = `${API_ROOT}/ventas/cotizaciones/${action.CotizacionID}/`;
  try {
    const response = yield call(request, requestURL);
    yield put(getQuotationSuccess(response));
  } catch (error) {
    yield put(getQuotationError(error));
  }
}
function* saveQuotation(action) {
  const requestURL = action.values.CotizacionID
    ? `${API_ROOT}/ventas/cotizaciones/${action.values.CotizacionID}/`
    : `${API_ROOT}/ventas/cotizaciones/`;
  try {
    const response = yield call(request, requestURL, {
      method: action.values.CotizacionID ? 'PATCH' : 'POST',
      body: JSON.stringify({
        ...action.values,
        Cuotas: action.values.Cuotas.filter(cuota => cuota.Amount),
      }),
    });
    yield put(saveQuotationSuccess(response));
  } catch (error) {
    yield put(saveQuotationError(error));
  }
}

export default function* quotationformSaga() {
  yield takeLatest(SAVE_QUOTATION, saveQuotation);
  yield takeLatest(GET_QUOTATION, getQuotation);
}
