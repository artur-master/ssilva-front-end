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
  UPDATE_OFFER,
  RESET_CONTAINER,
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
      case GET_OFFER:
      case SAVE_OFFER:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case GET_OFFER_ERROR:
      case SAVE_OFFER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case SAVE_OFFER_SUCCESS:
        draft.loading = false;
        draft.error = false;
        // draft.screen = 'view';
        draft.success = action.response.detail;
        draft.offer = {
          ...action.response.reserva,
          Empleador: action.response.reserva.Cliente.Empleador,
          CoEmpleador: (action.response.reserva.Codeudor || {}).Empleador,
          percent: calculates(action.response).percent,
          convert: calculates(action.response).convert,
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
