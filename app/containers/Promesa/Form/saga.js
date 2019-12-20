import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { sagaUploadVentasDocument } from 'containers/Reservation/Form/saga';
import {
  GET_PROMESA,
  UPLOAD_CONFECCION_PROMESA,
  APPROVE_IN,
  APPROVE_CONFECCION_PROMESA,
  DELETE_PROMESA,
  SAVE_PROMESA,
  APPROVE_MODIFY,
  APPROVE_UPLOAD_CONFECCION_PROMESA,
  APPROVE_CONTROL_PROMESA,
} from './constants';
import {
  getPromesaError,
  getPromesaSuccess,
  uploadConfeccionPromesaError,
  uploadConfeccionPromesaSuccess,
  deletePromesaSuccess,
  deletePromesaError,
  savePromesaSuccess,
  savePromesaError,
  approveInError,
  approveInSuccess,
  approveConfeccionPromesaError,
  approveConfeccionPromesaSuccess,
  approveUploadConfeccionPromesaSuccess,
  approveUploadConfeccionPromesaError,
  approveControlPromesaSuccess,
  approveControlPromesaError,
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
    data.append(name, action.values[name]);
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
    yield put(approveControlPromesaSuccess(response));
  } catch (error) {
    yield put(approveControlPromesaError(error));
  }
}

/* remove --> */

function* sagaApproveIn(action) {
  const requestURL = `${API_ROOT}/ventas/promesas-inmobiliarias-approve-control/${
    action.values.PromesaID
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

function* sagaApproveLegal(action) {
  const requestURL = `${API_ROOT}/ventas/promesas-approve-confeccion-promesa/${
    action.values.PromesaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    yield put(approveConfeccionPromesaSuccess(response));
  } catch (error) {
    yield put(approveConfeccionPromesaError(error));
  }
}

function* sagaDeletePromesa(action) {
  const requestURL = `${API_ROOT}/ventas/promesas-cancel/${
    action.values.PromesaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
    });
    yield put(deletePromesaSuccess(response));
  } catch (error) {
    yield put(deletePromesaError(error));
  }
}

function* sagaSavePromesa(action) {
  try {
    const { values, documents = false } = action;
    const requestURL = `${API_ROOT}/ventas/promesas/${values.PromesaID}/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    if (documents) {
      const resDocuments = yield call(sagaUploadVentasDocument, documents);
      response.promesa.Documents = resDocuments.documentos;
    }
    yield put(savePromesaSuccess(response));
  } catch (error) {
    yield put(savePromesaError(error));
  }
}

function* sagaApproveModifyPromesa(action) {
  try {
    const { values } = action;
    const requestURL = `${API_ROOT}/ventas/promesas-approve-modificar/${
      values.PromesaID
    }/`;
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action.values),
    });
    if (values.isSendToIN) {
      yield call(
        request,
        `${API_ROOT}/ventas/promesas-send-control/${action.values.PromesaID}/`,
        {
          method: 'PATCH',
          body: JSON.stringify({ Conditions: [] }),
        },
      );
    }
    yield put(savePromesaSuccess(response));
  } catch (error) {
    yield put(savePromesaError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(GET_PROMESA, sagaGetPromesa);
  yield takeLatest(UPLOAD_CONFECCION_PROMESA, sagaUploadConfeccionPromesa);
  yield takeLatest(
    APPROVE_UPLOAD_CONFECCION_PROMESA,
    sagaApproveUploadConfeccionPromesa,
  );
  yield takeLatest(APPROVE_CONTROL_PROMESA, sagaApproveControlPromesa);

  /* remove */
  yield takeLatest(APPROVE_IN, sagaApproveIn);
  yield takeLatest(APPROVE_CONFECCION_PROMESA, sagaApproveLegal);
  yield takeLatest(DELETE_PROMESA, sagaDeletePromesa);
  yield takeLatest(SAVE_PROMESA, sagaSavePromesa);
  yield takeLatest(APPROVE_MODIFY, sagaApproveModifyPromesa);
}
