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
  APROVA_HIPOTECARIOS,
  APROVA_HIPOTECARIOS_ERROR,
  APROVA_HIPOTECARIOS_SUCCESS,
  CHECK_HIPOTECARIOS,
  CHECK_HIPOTECARIOS_ERROR,
  CHECK_HIPOTECARIOS_SUCCESS,
} from './constants';

export function getEscritura(EscrituraID) {
  return {
    type: GET_ESCRITURA,
    EscrituraID,
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

export function notificarCompradores(values, EscrituraID) {
  return {
    type: NOTIFICAR_COMPRADO,
    EscrituraID,
    values,
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

export function aprobaHipotecarios(values, EscrituraID) {
  return {
    type: APROVA_HIPOTECARIOS,
    EscrituraID,
    values,
  };
}
export function aprobaHipotecariosError(error) {
  return {
    type: APROVA_HIPOTECARIOS_ERROR,
    error,
  };
}
export function aprobaHipotecariosSuccess(response) {
  return {
    type:APROVA_HIPOTECARIOS_SUCCESS,
    response,
  };
}

export function checkHipotecarios(values, EscrituraID) {
  return {
    type: CHECK_HIPOTECARIOS,
    EscrituraID,
    values,
  };
}
export function checkHipotecariosError(error) {
  return {
    type: CHECK_HIPOTECARIOS_ERROR,
    error,
  };
}
export function checkHipotecariosSuccess(response) {
  return {
    type:CHECK_HIPOTECARIOS_SUCCESS,
    response,
  };
}