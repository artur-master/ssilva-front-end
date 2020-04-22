/*
 *
 * Promesa reducer
 *
 */
import produce from 'immer';
import {
  GET_ESCRITURA,
  GET_ESCRITURA_ERROR,
  GET_ESCRITURA_SUCCESS,
  CONFIRM_ESCRITURA,
  CONFIRM_ESCRITURA_ERROR,
  CONFIRM_ESCRITURA_SUCCESS,
  APROBA_ESCRITURA,
  APROBA_ESCRITURA_ERROR,
  APROBA_ESCRITURA_SUCCESS,
  CHECK_PROMESA,
  CHECK_PROMESA_ERROR,
  CHECK_PROMESA_SUCCESS,
  NOTIFICAR_COMPRADO,
  NOTIFICAR_COMPRADO_ERROR,
  NOTIFICAR_COMPRADO_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  success: false,
  escritura: false,
  redirect: '',
};

/* eslint-disable default-case, no-param-reassign */
const escrituraReducer = (state = initialState, action) =>
  /* eslint-disable-next-line */
  produce(state, draft => {
    switch (action.type) {
      case GET_ESCRITURA:
      case CONFIRM_ESCRITURA:
      case APROBA_ESCRITURA:
      case CHECK_PROMESA:
      case NOTIFICAR_COMPRADO:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.escritura = false;
        draft.redirect = '';
        break;
      case GET_ESCRITURA_ERROR:
      case CONFIRM_ESCRITURA_ERROR:
      case APROBA_ESCRITURA_ERROR:
      case CHECK_PROMESA_ERROR:
      case NOTIFICAR_COMPRADO_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        draft.redirect = '';
        break;
      case GET_ESCRITURA_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = true;
        draft.redirect = '';      
        draft.escritura = action.response.length>0?action.response[0]:false;
        break;
      case CONFIRM_ESCRITURA_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = true;        
        draft.escritura = action.response[0];
        draft.redirect = 'list';
        break;      
      case APROBA_ESCRITURA_SUCCESS:
      case CHECK_PROMESA_SUCCESS:
      case NOTIFICAR_COMPRADO_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.success = true;        
        draft.escritura = action.response.escritura;
        draft.redirect = '';
        break;
    }
  });

export default escrituraReducer;
