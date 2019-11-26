/*
 *
 * Offer reducer
 *
 */
import produce from 'immer';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import {
  GET_OFFER,
  GET_OFFER_ERROR,
  GET_OFFER_SUCCESS,
  SAVE_OFFER,
  SAVE_OFFER_ERROR,
  SAVE_OFFER_SUCCESS,
  GET_QUOTATION,
  GET_QUOTATION_ERROR,
  GET_QUOTATION_SUCCESS,
  UPDATE_OFFER,
  RESET_CONTAINER,
  SEND_TO_CONTROL,
  SEND_TO_CONTROL_ERROR,
  SEND_TO_CONTROL_SUCCESS,
  CANCEL_OFFER,
  CANCEL_OFFER_ERROR,
  CANCEL_OFFER_SUCCESS,
  CONTROL_REVIEW,
  CONTROL_REVIEW_ERROR,
  CONTROL_REVIEW_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  offer: false,
  // screen: 'view',
};

/* eslint-disable default-case, no-param-reassign */
const offerReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case GET_QUOTATION:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.offer = false;
        break;
      case GET_OFFER:
      case SAVE_OFFER:
      case SEND_TO_CONTROL:
      case CONTROL_REVIEW:
      case CANCEL_OFFER:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case GET_QUOTATION_ERROR:
      case GET_OFFER_ERROR:
      case SAVE_OFFER_ERROR:
      case SEND_TO_CONTROL_ERROR:
      case CONTROL_REVIEW_ERROR:
      case CANCEL_OFFER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case GET_QUOTATION_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.offer = {
          ...action.response.quotation,
          Cliente: action.response.client,
          Empleador: action.response.client.Empleador,
          ...draft.offer,
          percent: calculates(action.response.quotation).percent,
          convert: calculates(action.response.quotation).convert,
        };
        break;
      case SAVE_OFFER_SUCCESS:
      case SEND_TO_CONTROL_SUCCESS:
      case CANCEL_OFFER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        // draft.screen = 'view';
        draft.success = action.response.detail;
        draft.offer = {
          ...action.response.oferta,
          Empleador: action.response.oferta.Cliente.Empleador,
          CoEmpleador: (action.response.oferta.Codeudor || {}).Empleador,
          percent: calculates(action.response).percent,
          convert: calculates(action.response).convert,
        };
        break;
      case CONTROL_REVIEW_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.offer = {
          ...state.offer,
          ...action.response.oferta,
        };
        break;
      case GET_OFFER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        // draft.screen = 'edit';
        draft.offer = {
          ...action.response,
          Empleador: action.response.Cliente.Empleador,
          CoEmpleador: (action.response.Codeudor || {}).Empleador,
          percent: calculates(action.response).percent,
          convert: calculates(action.response).convert,
        };
        break;
      case UPDATE_OFFER:
        draft.offer = { ...draft.offer, ...action.data };
        break;
    }
  });

export default offerReducer;
