/*
 *
 * Promesa actions
 *
 */

import {
  GET_PROMESA,
  GET_PROMESA_ERROR,
  GET_PROMESA_SUCCESS,
  UPDATE_PROMESA,
  RESET_CONTAINER,
  UPLOAD_CONFECCION_PROMESA,
  UPLOAD_CONFECCION_PROMESA_ERROR,
  UPLOAD_CONFECCION_PROMESA_SUCCESS,
  APPROVE_UPLOAD_CONFECCION_PROMESA_ERROR,
  APPROVE_UPLOAD_CONFECCION_PROMESA_SUCCESS,
  APPROVE_UPLOAD_CONFECCION_PROMESA,
  UPLOAD_FIRMA_DOCUMENTS_PROMESA,
  UPLOAD_FIRMA_DOCUMENTS_PROMESA_ERROR,
  UPLOAD_FIRMA_DOCUMENTS_PROMESA_SUCCESS,
  CONTROL_PROMESA,
  CONTROL_PROMESA_ERROR,
  CONTROL_PROMESA_SUCCESS,
  SEND_PROMESA_TO_IN,
  SEND_PROMESA_TO_IN_ERROR,
  SEND_PROMESA_TO_IN_SUCCESS,
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  LEGALIZE,
  LEGALIZE_ERROR,
  LEGALIZE_SUCCESS,
  SEND_COPY,
  SEND_COPY_ERROR,
  SEND_COPY_SUCCESS,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function getPromesa(PromesaID) {
  return {
    type: GET_PROMESA,
    PromesaID,
  };
}

export function getPromesaError(error) {
  return {
    type: GET_PROMESA_ERROR,
    error,
  };
}

export function getPromesaSuccess(response) {
  return {
    type: GET_PROMESA_SUCCESS,
    response,
  };
}

export function uploadConfeccionPromesa(PromesaID, values) {
  return {
    type: UPLOAD_CONFECCION_PROMESA,
    PromesaID,
    values,
  };
}

export function uploadConfeccionPromesaError(error) {
  return {
    type: UPLOAD_CONFECCION_PROMESA_ERROR,
    error,
  };
}

export function uploadConfeccionPromesaSuccess(response) {
  return {
    type: UPLOAD_CONFECCION_PROMESA_SUCCESS,
    response,
  };
}

export function approveUploadConfeccionPromesa(values) {
  return {
    type: APPROVE_UPLOAD_CONFECCION_PROMESA,
    values,
  };
}

export function approveUploadConfeccionPromesaError(error) {
  return {
    type: APPROVE_UPLOAD_CONFECCION_PROMESA_ERROR,
    error,
  };
}

export function approveUploadConfeccionPromesaSuccess(response) {
  return {
    type: APPROVE_UPLOAD_CONFECCION_PROMESA_SUCCESS,
    response,
  };
}

export function uploadFirmaDocumentsPromesa(PromesaID, values) {
  return {
    type: UPLOAD_FIRMA_DOCUMENTS_PROMESA,
    PromesaID,
    values,
  };
}

export function uploadFirmaDocumentsPromesaError(error) {
  return {
    type: UPLOAD_FIRMA_DOCUMENTS_PROMESA_ERROR,
    error,
  };
}

export function uploadFirmaDocumentsPromesaSuccess(response) {
  return {
    type: UPLOAD_FIRMA_DOCUMENTS_PROMESA_SUCCESS,
    response,
  };
}

export function controlPromesa(values) {
  return {
    type: CONTROL_PROMESA,
    values,
  };
}

export function controlPromesaError(error) {
  return {
    type: CONTROL_PROMESA_ERROR,
    error,
  };
}

export function controlPromesaSuccess(response) {
  return {
    type: CONTROL_PROMESA_SUCCESS,
    response,
  };
}

export function sendPromesaToIn(values) {
  return {
    type: SEND_PROMESA_TO_IN,
    values,
  };
}

export function sendPromesaToInError(error) {
  return {
    type: SEND_PROMESA_TO_IN_ERROR,
    error,
  };
}

export function sendPromesaToInSuccess(response) {
  return {
    type: SEND_PROMESA_TO_IN_SUCCESS,
    response,
  };
}

export function signIn(values) {
  return {
    type: SIGN_IN,
    values,
  };
}

export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    error,
  };
}

export function signInSuccess(response) {
  return {
    type: SIGN_IN_SUCCESS,
    response,
  };
}

export function legalize(values) {
  return {
    type: LEGALIZE,
    values,
  };
}

export function legalizeError(error) {
  return {
    type: LEGALIZE_ERROR,
    error,
  };
}

export function legalizeSuccess(response) {
  return {
    type: LEGALIZE_SUCCESS,
    response,
  };
}

export function sendCopy(values) {
  return {
    type: SEND_COPY,
    values,
  };
}

export function sendCopyError(error) {
  return {
    type: SEND_COPY_ERROR,
    error,
  };
}

export function sendCopySuccess(response) {
  return {
    type: SEND_COPY_SUCCESS,
    response,
  };
}

/* remove ---> */
export function updatePromesa(values) {
  return {
    type: UPDATE_PROMESA,
    values,
  };
}
