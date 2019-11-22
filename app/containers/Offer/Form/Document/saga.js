import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { REVIEW_DOCUMENT, SAVE_DOCUMENT, CANCEL_OFFER } from './constants';
import {
  reviewDocumentError,
  reviewDocumentSuccess,
  saveDocumentError,
  saveDocumentSuccess,
  cancelOfferError,
  cancelOfferSuccess,
} from './actions';
import { updateOffer } from '../actions';

function* sagaSaveDocument(action) {
  try {
    // eslint-disable-next-line no-unused-vars
    const [resdoc, ressendontrol] = yield all([
      call(request, `${API_ROOT}/ventas/upload-documents/`, {
        method: 'post',
        body: action.values,
        headers: {
          'content-type': null,
        },
      }),
      call(
        request,
        `${API_ROOT}/ventas/reservas-send-control/${action.OfertaID}/`,
        {
          method: 'PATCH',
          body: JSON.stringify({ Comment: action.Comment || '' }),
        },
      ),
    ]);
    yield put(saveDocumentSuccess(ressendontrol));
    yield put(updateOffer(ressendontrol.reserva));
  } catch (error) {
    yield put(saveDocumentError(error));
  }
}

function* sagaCancelOffer(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/reservas-cancel/${action.OfertaID}/`,
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

function* sagaReview(action) {
  const requestURL = `${API_ROOT}/ventas/reservas-approve-control/${
    action.values.OfertaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    yield put(reviewDocumentSuccess(response));
    yield put(updateOffer(response.reserva));
  } catch (error) {
    yield put(reviewDocumentError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(SAVE_DOCUMENT, sagaSaveDocument);
  yield takeLatest(REVIEW_DOCUMENT, sagaReview);
  yield takeLatest(CANCEL_OFFER, sagaCancelOffer);
}
