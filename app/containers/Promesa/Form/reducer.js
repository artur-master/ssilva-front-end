/*
 *
 * Promesa reducer
 *
 */
import produce from 'immer';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import {
  GET_PROMESA,
  GET_PROMESA_ERROR,
  GET_PROMESA_SUCCESS,
  UPDATE_PROMESA,
  RESET_CONTAINER,
  CONFIRM,
  CONFIRM_ERROR,
  CONFIRM_SUCCESS,
  APPROVE_IN,
  APPROVE_IN_ERROR,
  APPROVE_IN_SUCCESS,
  APPROVE_CONFECCION_PROMESA,
  APPROVE_CONFECCION_PROMESA_ERROR,
  APPROVE_CONFECCION_PROMESA_SUCCESS,
  DELETE_PROMESA,
  DELETE_PROMESA_ERROR,
  DELETE_PROMESA_SUCCESS,
  SAVE_PROMESA,
  SAVE_PROMESA_ERROR,
  SAVE_PROMESA_SUCCESS,
  APPROVE_MODIFY,
  APPROVE_MODIFY_ERROR,
  APPROVE_MODIFY_SUCCESS,
  UPLOAD_CONFECCION_PROMESA,
  UPLOAD_CONFECCION_PROMESA_ERROR,
  UPLOAD_CONFECCION_PROMESA_SUCCESS,
  APPROVE_UPLOAD_CONFECCION_PROMESA,
  APPROVE_UPLOAD_CONFECCION_PROMESA_ERROR,
  APPROVE_UPLOAD_CONFECCION_PROMESA_SUCCESS,
  APPROVE_CONTROL_PROMESA,
  APPROVE_CONTROL_PROMESA_ERROR,
  APPROVE_CONTROL_PROMESA_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  promesa: false,
  redirect: '',
};

/* eslint-disable default-case, no-param-reassign */
const promesaReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case GET_PROMESA:
      case UPLOAD_CONFECCION_PROMESA:
      case APPROVE_UPLOAD_CONFECCION_PROMESA:
      case APPROVE_CONTROL_PROMESA:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.redirect = '';
        break;
      case GET_PROMESA_ERROR:
      case UPLOAD_CONFECCION_PROMESA_ERROR:
      case APPROVE_UPLOAD_CONFECCION_PROMESA_ERROR:
      case APPROVE_CONTROL_PROMESA_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        draft.redirect = '';
        break;
      case GET_PROMESA_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.promesa = {
          ...action.response,
          Empleador: action.response.Cliente.Empleador,
          CoEmpleador: (action.response.Codeudor || {}).Empleador,
          percent: calculates(action.response).percent,
          convert: calculates(action.response).convert,
        };
        break;
      case UPLOAD_CONFECCION_PROMESA_SUCCESS:
      case APPROVE_UPLOAD_CONFECCION_PROMESA_SUCCESS:
      case APPROVE_CONTROL_PROMESA_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.promesa = { ...draft.promesa, ...action.response.promesa };
        break;


      /* remove --> */
      case RESET_CONTAINER:
        return initialState;

      case CONFIRM:
      case APPROVE_IN:
      case APPROVE_CONFECCION_PROMESA:
      case DELETE_PROMESA:
      case SAVE_PROMESA:
      case APPROVE_MODIFY:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.redirect = '';
        break;

      case CONFIRM_ERROR:
      case APPROVE_IN_ERROR:
      case APPROVE_CONFECCION_PROMESA_ERROR:
      case DELETE_PROMESA_ERROR:
      case SAVE_PROMESA_ERROR:
      case APPROVE_MODIFY_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        draft.redirect = '';
        break;
      case CONFIRM_SUCCESS:
      case APPROVE_IN_SUCCESS:
      case APPROVE_CONFECCION_PROMESA_SUCCESS:
      case DELETE_PROMESA_SUCCESS:
      case SAVE_PROMESA_SUCCESS:
      case APPROVE_MODIFY_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.redirect = 'list';
        break;

      case UPDATE_PROMESA:
        draft.promesa = { ...draft.promesa, ...action.data };
        break;
    }
  });

export default promesaReducer;
