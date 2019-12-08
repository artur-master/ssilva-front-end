/*
 *
 * Offer actions
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
export function recepcionGarantia(OfertaID) {
  return {
    type: RECEPCION_GRANTIA,
    OfertaID,
  };
}

export function recepcionGarantiaError(OfertaID, error) {
  return {
    type: RECEPCION_GRANTIA_ERROR,
    OfertaID,
    error,
  };
}

export function recepcionGarantiaSuccess(OfertaID, response) {
  return {
    type: RECEPCION_GRANTIA_SUCCESS,
    OfertaID,
    response,
  };
}
