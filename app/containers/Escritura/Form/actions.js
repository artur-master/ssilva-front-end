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