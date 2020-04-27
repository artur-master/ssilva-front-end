/*
 *
 * Promesa actions
 *
 */

import {
  GET_ESCRITURA,
  GET_ESCRITURA_ERROR,
  GET_ESCRITURA_SUCCESS,
  UPDATE_ESCRITURA,
  UPDATE_ESCRITURA_ERROR,
  UPDATE_ESCRITURA_SUCCESS,
  CHECK_PROMESA,
  CHECK_PROMESA_ERROR,
  CHECK_PROMESA_SUCCESS,
  NOTIFICAR_COMPRADO,
  NOTIFICAR_COMPRADO_ERROR,
  NOTIFICAR_COMPRADO_SUCCESS,
} from './constants';

export function getEscritura(ProyectoID) {
  return {
    type: GET_ESCRITURA,
    ProyectoID,
  };
}
export function getEscrituraError(error) {
  return {
    type: GET_ESCRITURA_ERROR,
    error,
  };
}
export function getEscrituraSuccess(response) {
  return {
    type:GET_ESCRITURA_SUCCESS,
    response,
  };
}

export function updateEscritura(values, ProyectoID) {
  return {
    type: UPDATE_ESCRITURA,
    ProyectoID,
    values,
  };
}
export function updateEscrituraError(error) {
  return {
    type: UPDATE_ESCRITURA_ERROR,
    error,
  };
}
export function updateEscrituraSuccess(response) {
  return {
    type:UPDATE_ESCRITURA_SUCCESS,
    response,
  };
}

export function checkPromesa(values, EscrituraID) {
  return {
    type: CHECK_PROMESA,
    EscrituraID,
    values,
  };
}
export function checkPromesaError(error) {
  return {
    type: CHECK_PROMESA_ERROR,
    error,
  };
}
export function checkPromesaSuccess(response) {
  return {
    type:CHECK_PROMESA_SUCCESS,
    response,
  };
}

export function notificarCompradores(EscrituraID) {
  return {
    type: NOTIFICAR_COMPRADO,
    EscrituraID,
  };
}
export function notificarCompradoresError(error) {
  return {
    type: NOTIFICAR_COMPRADO_ERROR,
    error,
  };
}
export function notificarCompradoresSuccess(response) {
  return {
    type:NOTIFICAR_COMPRADO_SUCCESS,
    response,
  };
}