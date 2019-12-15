/*
 *
 * Promesa reducer
 *
 */
import produce from 'immer';
import {
  RESET_CONTAINER,
  RECEPCION_GRANTIA,
  RECEPCION_GRANTIA_ERROR,
  RECEPCION_GRANTIA_SUCCESS,
} from './constants';

export const initialState = {
  loading: {},
  error: {},
  success: {},
};
/* eslint-disable default-case, no-param-reassign */
const promesaGarantiaReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_CONTAINER:
        return initialState;
      case RECEPCION_GRANTIA:
        draft.loading[action.PromesaID] = true;
        draft.error[action.PromesaID] = false;
        draft.success[action.PromesaID] = false;
        break;
      case RECEPCION_GRANTIA_ERROR:
        draft.loading[action.PromesaID] = false;
        draft.error[action.PromesaID] = action.error;
        break;
      case RECEPCION_GRANTIA_SUCCESS:
        draft.loading[action.PromesaID] = false;
        draft.error[action.PromesaID] = false;
        draft.success[action.PromesaID] = action.response.detail;
        break;
    }
  });

export default promesaGarantiaReducer;
