import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { SAVE_OFFER, GET_OFFER } from './constants';
import {
  saveOfferError,
  saveOfferSuccess,
  getOfferError,
  getOfferSuccess,
} from './actions';

function* getOffer(action) {
  const requestURL = `${API_ROOT}/ventas/ofertas/${action.OfertaID}/`;
  try {
    const response = yield call(request, requestURL);
    yield put(getOfferSuccess(response));
  } catch (error) {
    yield put(getOfferError(error));
  }
}

function* saveOffer(action) {
  const requestURL = action.values.OfertaID
    ? `${API_ROOT}/ventas/ofertas/${action.values.OfertaID}/`
    : `${API_ROOT}/ventas/ofertas/`;
  try {
    const response = yield call(request, requestURL, {
      method: action.values.OfertaID ? 'PATCH' : 'POST',
      body: JSON.stringify(action.values),
    });
    yield put(saveOfferSuccess(response));
  } catch (error) {
    yield put(saveOfferError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(SAVE_OFFER, saveOffer);
  yield takeLatest(GET_OFFER, getOffer);
}
