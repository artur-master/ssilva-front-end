import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import {
  GET_PROMESA,
  UPLOAD_CONFECCION_PROMESA,
  APPROVE_UPLOAD_CONFECCION_PROMESA,
  CONTROL_PROMESA,
  UPLOAD_FIRMA_DOCUMENTS_PROMESA,
  SEND_PROMESA_TO_IN,
  SIGN_IN,
  LEGALIZE,
  SEND_COPY,
} from './constants';
import {
  getPromesaError,
  getPromesaSuccess,
  uploadConfeccionPromesaError,
  uploadConfeccionPromesaSuccess,
  approveUploadConfeccionPromesaSuccess,
  approveUploadConfeccionPromesaError,
  controlPromesaSuccess,
  controlPromesaError,
  uploadFirmaDocumentsPromesaSuccess,
  uploadFirmaDocumentsPromesaError,
  sendPromesaToInSuccess,
  sendPromesaToInError,
  signInError,
  signInSuccess,
  legalizeSuccess,
  legalizeError,
  sendCopySuccess,
  sendCopyError,
} from './actions';

function* sagaGetPromesa(action) {
  const requestURL = `${API_ROOT}/ventas/promesas/${action.PromesaID}/`;
  try {
    const response = yield call(request, requestURL);
    yield put(getPromesaSuccess(response));
  } catch (error) {
    yield put(getPromesaError(error));
  }
}

function* sagaUploadConfeccionPromesa(action) {
  const data = new FormData();
  Object.keys(action.values).forEach(name => {
    if (action.values[name].name) data.append(name, action.values[name]);
  });
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/promesas-upload-confeccion-promesa/${
        action.PromesaID
      }/`,
      {
        method: 'PATCH',
        body: data,
        headers: {
          'content-type': null,
        },
      },
    );

    yield put(uploadConfeccionPromesaSuccess(response));
  } catch (error) {
    yield put(uploadConfeccionPromesaError(error));
  }
}

function* sagaApproveUploadConfeccionPromesa(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-approve-maqueta/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(approveUploadConfeccionPromesaSuccess(response));
  } catch (error) {
    yield put(approveUploadConfeccionPromesaError(error));
  }
}

function* sagaUploadFirmaDocumentsPromesa(action) {
  const data = new FormData();
  Object.keys(action.values).forEach(name => {
    if (action.values[name].name) data.append(name, action.values[name]);
  });
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/promesas-upload-firma-document/${action.PromesaID}/`,
      {
        method: 'PATCH',
        body: data,
        headers: {
          'content-type': null,
        },
      },
    );

    yield put(uploadFirmaDocumentsPromesaSuccess(response));
  } catch (error) {
    yield put(uploadFirmaDocumentsPromesaError(error));
  }
}

function* sagaApproveControlPromesa(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-approve-control/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(controlPromesaSuccess(response));
  } catch (error) {
    yield put(controlPromesaError(error));
  }
}

function* sagaSendPromesaToIn(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-register-send/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(sendPromesaToInSuccess(response));
  } catch (error) {
    yield put(sendPromesaToInError(error));
  }
}

function* sagaSignIn(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-register-signature/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(signInSuccess(response));
  } catch (error) {
    yield put(signInError(error));
  }
}

function* sagaLegalize(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-legalize/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(legalizeSuccess(response));
  } catch (error) {
    yield put(legalizeError(error));
  }
}

function* sagaSendCopy(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-send-copies/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    yield put(sendCopySuccess(response));
  } catch (error) {
    yield put(sendCopyError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(GET_PROMESA, sagaGetPromesa);
  yield takeLatest(UPLOAD_CONFECCION_PROMESA, sagaUploadConfeccionPromesa);
  yield takeLatest(
    APPROVE_UPLOAD_CONFECCION_PROMESA,
    sagaApproveUploadConfeccionPromesa,
  );
  yield takeLatest(
    UPLOAD_FIRMA_DOCUMENTS_PROMESA,
    sagaUploadFirmaDocumentsPromesa,
  );
  yield takeLatest(CONTROL_PROMESA, sagaApproveControlPromesa);
  yield takeLatest(SEND_PROMESA_TO_IN, sagaSendPromesaToIn);
  yield takeLatest(SIGN_IN, sagaSignIn);
  yield takeLatest(LEGALIZE, sagaLegalize);
  yield takeLatest(SEND_COPY, sagaSendCopy);
}
