/*
 *
 * Quotation actions
 *
 */
// import { push } from 'connected-react-router';

import {
  GET_QUOTATION,
  GET_QUOTATION_ERROR,
  GET_QUOTATION_SUCCESS,
  SAVE_QUOTATION,
  SAVE_QUOTATION_ERROR,
  SAVE_QUOTATION_SUCCESS,
  TOGGLE_SCREEN,
  RESET_CONTAINER,
  UPDATE_QUOTATION,
} from './constants';

export function saveQuotation(values, redirect = 'list') {
  return {
    type: SAVE_QUOTATION,
    values: {
      ...values,
      PaymentInstitucionFinanciera:
        values.PayType !== window.preload.paymentUtils[1].PayTypeID
          ? 0
          : values.PaymentInstitucionFinanciera,
    },
    redirect,
  };
}

export function saveQuotationError(error) {
  return {
    type: SAVE_QUOTATION_ERROR,
    error,
  };
}

export function saveQuotationSuccess(response) {
  return {
    type: SAVE_QUOTATION_SUCCESS,
    response,
  };
}

export function getQuotation(CotizacionID) {
  return {
    type: GET_QUOTATION,
    CotizacionID,
  };
}

export function getQuotationError(error) {
  return {
    type: GET_QUOTATION_ERROR,
    error,
  };
}

export function getQuotationSuccess(quotation) {
  return {
    type: GET_QUOTATION_SUCCESS,
    quotation,
  };
}

export function toggleScreen(screen, refresh = false) {
  return {
    type: TOGGLE_SCREEN,
    screen,
    refresh,
  };
}

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function updateQuotation(data) {
  return {
    type: UPDATE_QUOTATION,
    data,
  };
}
