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
  CONFIRM,
  CONFIRM_ERROR,
  CONFIRM_SUCCESS,
  APPROVE_IN,
  APPROVE_IN_ERROR,
  APPROVE_IN_SUCCESS,
  APPROVE_CONFECCION_PROMESA,
  APPROVE_CONFECCION_PROMESA_ERROR,
  APPROVE_CONFECCION_PROMESA_SUCCESS,
  DELETE_PROMESA,
  DELETE_PROMESA_ERROR,
  DELETE_PROMESA_SUCCESS,
  SAVE_PROMESA,
  SAVE_PROMESA_ERROR,
  SAVE_PROMESA_SUCCESS,
  APPROVE_MODIFY,
  APPROVE_MODIFY_ERROR,
  APPROVE_MODIFY_SUCCESS,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function confirmToClient(values) {
  return {
    type: CONFIRM,
    values,
  };
}

export function confirmError(error) {
  return {
    type: CONFIRM_ERROR,
    error,
  };
}

export function confirmSuccess(response) {
  return {
    type: CONFIRM_SUCCESS,
    response,
  };
}

export function approveIn(values) {
  return {
    type: APPROVE_IN,
    values,
  };
}

export function approveInError(error) {
  return {
    type: APPROVE_IN_ERROR,
    error,
  };
}

export function approveInSuccess(response) {
  return {
    type: APPROVE_IN_SUCCESS,
    response,
  };
}

export function approveConfeccionPromesa(values) {
  return {
    type: APPROVE_CONFECCION_PROMESA,
    values,
  };
}

export function approveConfeccionPromesaError(error) {
  return {
    type: APPROVE_CONFECCION_PROMESA_ERROR,
    error,
  };
}

export function approveConfeccionPromesaSuccess(response) {
  return {
    type: APPROVE_CONFECCION_PROMESA_SUCCESS,
    response,
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

export function updatePromesa(data) {
  return {
    type: UPDATE_PROMESA,
    data,
  };
}

export function deletePromesa(values) {
  return {
    type: DELETE_PROMESA,
    values,
  };
}

export function deletePromesaError(error) {
  return {
    type: DELETE_PROMESA_ERROR,
    error,
  };
}

export function deletePromesaSuccess(response) {
  return {
    type: DELETE_PROMESA_SUCCESS,
    response,
  };
}

export function savePromesa(values, documents = false) {
  return {
    type: SAVE_PROMESA,
    values,
    documents,
  };
}

export function savePromesaError(error) {
  return {
    type: SAVE_PROMESA_ERROR,
    error,
  };
}

export function savePromesaSuccess(response) {
  return {
    type: SAVE_PROMESA_SUCCESS,
    response,
  };
}

export function approveModifyPromesa(values) {
  return {
    type: APPROVE_MODIFY,
    values,
  };
}

export function approveModifyPromesaError(error) {
  return {
    type: APPROVE_MODIFY_ERROR,
    error,
  };
}

export function approveModifyPromesaSuccess(response) {
  return {
    type: APPROVE_MODIFY_SUCCESS,
    response,
  };
}
