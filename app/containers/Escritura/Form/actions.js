/*
 *
 * Promesa actions
 *
 */

import {
  GET_ESCRITURA,
  GET_ESCRITURA_ERROR,
  GET_ESCRITURA_SUCCESS,
  CONFIRM_ESCRITURA,
  CONFIRM_ESCRITURA_ERROR,
  CONFIRM_ESCRITURA_SUCCESS,
  APROBA_ESCRITURA,
  APROBA_ESCRITURA_ERROR,
  APROBA_ESCRITURA_SUCCESS,
  CHECK_PROMESA,
  CHECK_PROMESA_ERROR,
  CHECK_PROMESA_SUCCESS,
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

export function confirmEscritura(ProyectoID) {
  return {
    type: CONFIRM_ESCRITURA,
    ProyectoID,
  };
}
export function confirmEscrituraError(error) {
  return {
    type: CONFIRM_ESCRITURA_ERROR,
    error,
  };
}
export function confirmEscrituraSuccess(response) {
  return {
    type:CONFIRM_ESCRITURA_SUCCESS,
    response,
  };
}

export function aproveDateEscritura(values, EscrituraID) {
  return {
    type: APROBA_ESCRITURA,
    EscrituraID,
    values,
  };
}
export function aproveDateEscrituraError(error) {
  return {
    type: APROBA_ESCRITURA_ERROR,
    error,
  };
}
export function aproveDateEscrituraSuccess(response) {
  return {
    type:APROBA_ESCRITURA_SUCCESS,
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