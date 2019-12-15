/*
 *
 * Promesa actions
 *
 */

import {
  RESET_CONTAINER,
  RECEPCION_GRANTIA,
  RECEPCION_GRANTIA_ERROR,
  RECEPCION_GRANTIA_SUCCESS,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}
export function recepcionGarantia(PromesaID, refund = false) {
  return {
    type: RECEPCION_GRANTIA,
    PromesaID,
    refund,
  };
}

export function recepcionGarantiaError(PromesaID, error) {
  return {
    type: RECEPCION_GRANTIA_ERROR,
    PromesaID,
    error,
  };
}

export function recepcionGarantiaSuccess(PromesaID, response) {
  return {
    type: RECEPCION_GRANTIA_SUCCESS,
    PromesaID,
    response,
  };
}
