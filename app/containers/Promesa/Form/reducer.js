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
  UPLOAD_CONFECCION_PROMESA,
  UPLOAD_CONFECCION_PROMESA_ERROR,
  UPLOAD_CONFECCION_PROMESA_SUCCESS,
  APPROVE_UPLOAD_CONFECCION_PROMESA,
  APPROVE_UPLOAD_CONFECCION_PROMESA_ERROR,
  APPROVE_UPLOAD_CONFECCION_PROMESA_SUCCESS,
  UPLOAD_FIRMA_DOCUMENTS_PROMESA,
  UPLOAD_FIRMA_DOCUMENTS_PROMESA_ERROR,
  UPLOAD_FIRMA_DOCUMENTS_PROMESA_SUCCESS,
  CONTROL_PROMESA,
  CONTROL_PROMESA_ERROR,
  CONTROL_PROMESA_SUCCESS,
  SEND_PROMESA_TO_IN,
  SEND_PROMESA_TO_IN_ERROR,
  SEND_PROMESA_TO_IN_SUCCESS,
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  LEGALIZE,
  SEND_COPY,
  LEGALIZE_ERROR,
  SEND_COPY_ERROR,
  LEGALIZE_SUCCESS,
  SEND_COPY_SUCCESS,
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
      case UPLOAD_FIRMA_DOCUMENTS_PROMESA:
      case CONTROL_PROMESA:
      case SEND_PROMESA_TO_IN:
      case SIGN_IN:
      case LEGALIZE:
      case SEND_COPY:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.redirect = '';
        break;
      case GET_PROMESA_ERROR:
      case UPLOAD_CONFECCION_PROMESA_ERROR:
      case APPROVE_UPLOAD_CONFECCION_PROMESA_ERROR:
      case UPLOAD_FIRMA_DOCUMENTS_PROMESA_ERROR:
      case CONTROL_PROMESA_ERROR:
      case SEND_PROMESA_TO_IN_ERROR:
      case SIGN_IN_ERROR:
      case LEGALIZE_ERROR:
      case SEND_COPY_ERROR:
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
      case UPLOAD_FIRMA_DOCUMENTS_PROMESA_SUCCESS:
      case CONTROL_PROMESA_SUCCESS:
      case SEND_PROMESA_TO_IN_SUCCESS:
      case SIGN_IN_SUCCESS:
      case LEGALIZE_SUCCESS:
      case SEND_COPY_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = action.response.detail;
        draft.promesa = { ...draft.promesa, ...action.response.promesa };
        break;

      /* remove --> */
      case RESET_CONTAINER:
        return initialState;

      case UPDATE_PROMESA:
        draft.promesa = { ...draft.promesa, ...action.data };
        break;
    }
  });

export default promesaReducer;
