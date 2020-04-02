import { call, put, all, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import FileSaver from 'file-saver';
import moment from 'moment';
import {
  SAVE_RESERVATION,
  GET_RESERVATION,
  GET_QUOTATION,
  SEND_TO_CONTROL,
  CANCEL_RESERVATION,
  CONTROL_REVIEW,
  PRINT_DOCUMENTS,
} from './constants';
import {
  saveReservationError,
  saveReservationSuccess,
  getReservationError,
  getReservationSuccess,
  getQuotationError,
  getQuotationSuccess,
  sendToControlSuccess,
  sendToControlError,
  cancelReservationError,
  cancelReservationSuccess,
  controlReviewError,
  controlReviewSuccess,
  printDocumentsError,
  printDocumentsSuccess,
} from './actions';

function* getQuotation(action) {
  try {
    const quotation = yield call(
      request,
      `${API_ROOT}/ventas/cotizaciones/${action.CotizacionID}/`,
    );
    const client = yield call(
      request,
      `${API_ROOT}/ventas/clientes/${quotation.ClienteID}/`,
    );
    yield put(
      getQuotationSuccess({
        quotation,
        client,
      }),
    );
  } catch (error) {
    yield put(getQuotationError(error));
  }
}

function* getReservation(action) {
  const requestURL = `${API_ROOT}/ventas/reservas/${action.ReservaID}/`;
  try {
    const response = yield call(request, requestURL);
    yield put(getReservationSuccess(response));
  } catch (error) {
    yield put(getReservationError(error));
  }
}

export function* sagaUploadVentasDocument(documents) {
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
  const requestURL = values.ReservaID
    ? `${API_ROOT}/ventas/reservas/${values.ReservaID}/`
    : `${API_ROOT}/ventas/reservas/`;
  const response = yield call(request, requestURL, {
    method: values.ReservaID ? 'PATCH' : 'POST',
    body: JSON.stringify({
      ...action.values,
      Cuotas: action.values.Cuotas.filter(cuota => cuota.Amount),
    }),
  });
  if (documents) {
    const resDocuments = yield call(sagaUploadVentasDocument, documents);
    response.reserva.Documents = resDocuments.Documentos;
  }
  return response;
}

function* saveReservation(action) {
  try {
    const response = yield call(save, action);
    yield put(saveReservationSuccess(response));
  } catch (error) {
    yield put(saveReservationError(error));
  }
}

function* sendToControl(action) {
  try {
    const response = yield call(save, action);
    const resSendToControl = yield call(
      request,
      `${API_ROOT}/ventas/reservas-send-control/${response.reserva.ReservaID}/`,
      {
        method: 'PATCH',
      },
    );
    yield put(sendToControlSuccess(resSendToControl));
  } catch (error) {
    yield put(sendToControlError(error));
  }
}

function* cancelReservation(action) {
  try {
    const response = yield call(
      request,
      `${API_ROOT}/ventas/reservas-cancel/${action.values.ReservaID}/`,
      {
        method: 'PATCH',
        body: JSON.stringify({ Comment: action.values.Comment || '' }),
      },
    );
    yield put(cancelReservationSuccess(response));
  } catch (error) {
    yield put(cancelReservationError(error));
  }
}

function* controlReview(action) {
  const requestURL = `${API_ROOT}/ventas/reservas-approve-control/${
    action.values.ReservaID
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

const downloadFile = async (url, fileName) => {
  console.log(url)
  if(url !== '')
    FileSaver.saveAs( url,fileName );
}

function* generateCheque(cheque) {
  const requestURL = `${API_ROOT}/ventas/generate-check/`;
  const response = yield call(request, requestURL, {
    method: 'POST',
    body: JSON.stringify(cheque),
  });
  FileSaver.saveAs(
    response,
    `cheque-${moment(cheque.Date).format('YYYY_MM_DD')}.pdf`,
  );
  return response;
}

function* printDocuments(action) {
  try {
    const response = yield call(save, action);
    downloadFile(response.reserva.Documents.DocumentCotizacion, 'cotización.pdf')
    downloadFile(response.reserva.Documents.DocumentOferta, 'oferta.pdf')
    downloadFile(response.reserva.Documents.DocumentFichaPreAprobacion, 'ficha pre aprobación.pdf')
    downloadFile(response.reserva.Documents.DocumentSimulador, 'simulador de crédito.pdf')

    const genCheques = [];
    const cheques = action.values.printCuotas;
    for (let i = 0; i < cheques.length; i += 1) {
      genCheques.push(yield call(generateCheque, cheques[i]));
    }
    const chequesFiles = yield all(genCheques);

    yield put(printDocumentsSuccess({...response, ...chequesFiles}));
    
  } catch (error) {
    yield put(printDocumentsError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(SAVE_RESERVATION, saveReservation);
  yield takeLatest(SEND_TO_CONTROL, sendToControl);
  yield takeLatest(CONTROL_REVIEW, controlReview);
  yield takeLatest(CANCEL_RESERVATION, cancelReservation);
  yield takeLatest(GET_RESERVATION, getReservation);
  yield takeLatest(GET_QUOTATION, getQuotation);
  yield takeLatest(PRINT_DOCUMENTS, printDocuments);
}
