/*
 *
 * Project reducer
 *
 */
import produce from 'immer';
import {
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
  RESET_CONTAINER,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  screen: 'view',
};

/* eslint-disable default-case, no-param-reassign */
const marketingReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case SAVE_DOCUMENT:
      case CANCEL_OFFER:
      case REVIEW_DOCUMENT:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case CANCEL_OFFER_ERROR:
      case REVIEW_DOCUMENT_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case SAVE_DOCUMENT_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = action.error; // Fix for redirect
        break;
      case SAVE_DOCUMENT_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        break;
      case CANCEL_OFFER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = 'Cancel';
        break;
      case REVIEW_DOCUMENT_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = 'Exitosa';
        break;
      case TOGGLE_SCREEN:
        if (action.refresh) {
          return {
            ...initialState,
            screen: action.screen,
          };
        }
        draft.screen = action.screen;
        break;
    }
  });

export default marketingReducer;
