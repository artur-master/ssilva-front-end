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
  UPDATE_OFFER,
  RESET_CONTAINER,
  CONFIRM,
  CONFIRM_ERROR,
  CONFIRM_SUCCESS,
  APPROVE_IN,
  APPROVE_IN_ERROR,
  APPROVE_IN_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  offer: false,
  redirect: '',
};

/* eslint-disable default-case, no-param-reassign */
const offerReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case GET_OFFER:
      case CONFIRM:
      case APPROVE_IN:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.redirect = '';
        break;
      case GET_OFFER_ERROR:
      case CONFIRM_ERROR:
      case APPROVE_IN_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        draft.redirect = '';
        break;
      case CONFIRM_SUCCESS:
      case APPROVE_IN_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.redirect = 'list';
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
