import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { GET_OFFER, CONFIRM, APPROVE_IN } from './constants';
import {
  approveInError,
  approveInSuccess,
  confirmError,
  confirmSuccess,
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

function* sagaConfirm(action) {
  const requestURL = `${API_ROOT}/ventas/ofertas-send-control/${
    action.values.OfertaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    yield put(confirmSuccess(response));
  } catch (error) {
    yield put(confirmError(error));
  }
}

function* sagaApproveIn(action) {
  const requestURL = `${API_ROOT}/ventas/ofertas-inmobiliarias-approve-control/${
    action.values.OfertaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    yield put(approveInSuccess(response));
  } catch (error) {
    yield put(approveInError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(CONFIRM, sagaConfirm);
  yield takeLatest(APPROVE_IN, sagaApproveIn);
  yield takeLatest(GET_OFFER, getOffer);
}
