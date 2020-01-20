/*
 *
 * Promesa reducer
 *
 */
import Fuse from 'fuse.js';
import produce from 'immer';
import {
  FETCH_PROMESAS,
  FETCH_PROMESAS_ERROR,
  FETCH_PROMESAS_SUCCESS,
  SEARCH_PROMESAS,
} from './constants';
import { getReports, initReports } from '../helper';
import { UserProject } from '../../Project/helper';
import { PROMESA_STATE } from '../../App/constants';

export const initialState = {
  loading: false,
  error: false,
  promesas: false,
  reports: initReports(),
  origin_promesas: false,
  filter: { txtSearch: '' },
};
/* eslint-disable default-case, no-param-reassign */
const promesaReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_PROMESAS:
        draft.filter = { ...state.filter, ...action.filter };
        draft.promesas = [...(state.origin_promesas || [])];

        /* eslint-disable-next-line */
        const fuse = new Fuse(draft.promesas, {
          keys: ['Folio', 'ClienteName', 'ClienteLastNames', 'ClienteRut'],
        });

        if (draft.filter.textSearch)
          draft.promesas = fuse.search(draft.filter.textSearch);
        draft.reports = getReports(draft.promesas);

        if (draft.filter.status && draft.filter.status !== 'All') {
          draft.promesas = draft.promesas.filter(
            item => item.PromesaState === draft.filter.status,
          );
        }

        break;
      case FETCH_PROMESAS:
        draft.loading = true;
        draft.error = false;
        break;
      case FETCH_PROMESAS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_PROMESAS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.origin_promesas = action.promesas;
        draft.promesas = draft.origin_promesas;
        draft.reports = getReports(draft.promesas);
        break;
    }
  });

export default promesaReducer;
