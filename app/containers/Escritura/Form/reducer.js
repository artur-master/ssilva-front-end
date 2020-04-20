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
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        draft.escritura = false;
        draft.redirect = '';
        break;
      case GET_ESCRITURA_ERROR:
      case CONFIRM_ESCRITURA_ERROR:
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
    }
  });

export default escrituraReducer;
