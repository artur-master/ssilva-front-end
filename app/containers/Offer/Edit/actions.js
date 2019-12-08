/*
 *
 * Offer actions
 *
 */

import {
  GET_OFFER,
  GET_OFFER_ERROR,
  GET_OFFER_SUCCESS,
  UPDATE_OFFER,
  RESET_CONTAINER,
  CONFIRM,
  CONFIRM_ERROR,
  CONFIRM_SUCCESS,
  APPROVE_IN,
  APPROVE_IN_ERROR,
  APPROVE_IN_SUCCESS,
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

export function getOffer(OfertaID) {
  return {
    type: GET_OFFER,
    OfertaID,
  };
}

export function getOfferError(error) {
  return {
    type: GET_OFFER_ERROR,
    error,
  };
}

export function getOfferSuccess(response) {
  return {
    type: GET_OFFER_SUCCESS,
    response,
  };
}

export function updateOffer(data) {
  return {
    type: UPDATE_OFFER,
    data,
  };
}
