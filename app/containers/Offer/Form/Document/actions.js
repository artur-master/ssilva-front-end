/*
 *
 * Offer actions
 *
 */

import {
  RESET_CONTAINER,
  REVIEW_DOCUMENT,
  REVIEW_DOCUMENT_ERROR,
  REVIEW_DOCUMENT_SUCCESS,
  SAVE_DOCUMENT,
  SAVE_DOCUMENT_ERROR,
  SAVE_DOCUMENT_SUCCESS,
  CANCEL_OFFER,
  CANCEL_OFFER_ERROR,
  CANCEL_OFFER_SUCCESS,
  TOGGLE_SCREEN,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function saveDocument(OfertaID, values, CurrentStep, Comment) {
  return {
    type: SAVE_DOCUMENT,
    values,
    OfertaID,
    CurrentStep,
    Comment,
  };
}

export function saveDocumentError(error) {
  return {
    type: SAVE_DOCUMENT_ERROR,
    error,
  };
}

export function saveDocumentSuccess(response) {
  return {
    type: SAVE_DOCUMENT_SUCCESS,
    response,
  };
}

export function cancelOffer(OfertaID, values, CurrentStep) {
  return {
    type: CANCEL_OFFER,
    values,
    OfertaID,
    CurrentStep,
  };
}

export function cancelOfferError(error) {
  return {
    type: CANCEL_OFFER_ERROR,
    error,
  };
}

export function cancelOfferSuccess(response) {
  return {
    type: CANCEL_OFFER_SUCCESS,
    response,
  };
}

export function reviewDocument(values) {
  return {
    type: REVIEW_DOCUMENT,
    values,
  };
}

export function reviewDocumentError(error) {
  return {
    type: REVIEW_DOCUMENT_ERROR,
    error,
  };
}

export function reviewDocumentSuccess(response) {
  return {
    type: REVIEW_DOCUMENT_SUCCESS,
    response,
  };
}

export function toggleScreen(screen, refresh = false) {
  return {
    type: TOGGLE_SCREEN,
    screen,
    refresh,
  };
}
