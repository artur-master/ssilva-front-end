import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import {
  SAVE_OFFER,
  GET_OFFER,
  SEND_TO_CONTROL,
  CANCEL_OFFER,
  CONTROL_REVIEW,
} from './constants';
import {
  saveOfferError,
  saveOfferSuccess,
  getOfferError,
  getOfferSuccess,
  sendToControlSuccess,
  sendToControlError,
  cancelOfferError,
  cancelOfferSuccess,
  controlReviewError,
  controlReviewSuccess,
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

function* uploadDocument(documents) {
  const data = new FormData();
  Object.keys(documents)
    .filter(type => documents[type])
    .forEach(name => {
      data.append(name, documents[name]);
    });
  return yield call(request, `${API_ROOT}/ventas/upload-documents/`, {
    method: 'post',
    body: data,
    headers: {
      'content-type': null,
    },
  });
}

function* save(action) {
  const { values, documents = false } = action;
  const requestURL = values.OfertaID
    ? `${API_ROOT}/ventas/ofertas/${values.OfertaID}/`
    : `${API_ROOT}/ventas/ofertas/`;
  const response = yield call(request, requestURL, {
    method: values.OfertaID ? 'PATCH' : 'POST',
    body: JSON.stringify({
      ...action.values,
      Cuotas: action.values.Cuotas.filter(cuota => cuota.Amount),
    }),
  });
  if (documents) {
    const resDocuments = yield call(uploadDocument, documents);
    response.oferta.Documents = resDocuments.documentos;
  }
  return response;
}

function* saveOffer(action) {
  try {
    const response = yield call(save, action);
    yield put(saveOfferSuccess(response));
  } catch (error) {
    yield put(saveOfferError(error));
  }
}

function* sendToControl(action) {
  try {
    const response = yield call(save, action);
    const resSendToControl = yield call(
      request,
      `${API_ROOT}/ventas/ofertas-send-control/${response.oferta.OfertaID}/`,
      {
        method: 'PATCH',
      },
    );
    yield put(sendToControlSuccess(resSendToControl));
  } catch (error) {
    yield put(sendToControlError(error));
  }
}

function* cancelOffer(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/ofertas-cancel/${action.values.OfertaID}/`,
      {
        method: 'PATCH',
        body: JSON.stringify({ Comment: action.values.Comment || '' }),
      },
    );
    yield put(cancelOfferSuccess(response));
  } catch (error) {
    yield put(cancelOfferError(error));
  }
}

function* controlReview(action) {
  const requestURL = `${API_ROOT}/ventas/ofertas-approve-control/${
    action.values.OfertaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    yield put(controlReviewSuccess(response));
  } catch (error) {
    yield put(controlReviewError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(SAVE_OFFER, saveOffer);
  yield takeLatest(SEND_TO_CONTROL, sendToControl);
  yield takeLatest(CONTROL_REVIEW, controlReview);
  yield takeLatest(CANCEL_OFFER, cancelOffer);
  yield takeLatest(GET_OFFER, getOffer);
}
