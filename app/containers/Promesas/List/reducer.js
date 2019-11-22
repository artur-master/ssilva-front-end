/*
 *
 * Offer reducer
 *
 */
import Fuse from 'fuse.js';
import produce from 'immer';
import {
  FETCH_OFFERS,
  FETCH_OFFERS_ERROR,
  FETCH_OFFERS_SUCCESS,
  SEARCH_OFFERS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  offers: false,
  origin_offers: false,
  filter: { txtSearch: '' },
};
/* eslint-disable default-case, no-param-reassign */
const offerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_OFFERS:
        /* eslint-disable-next-line */
        const fuse = new Fuse(draft.origin_offers, {
          keys: [
            'CotizacionID',
            'ClienteID',
            'ClienteID',
            'ClienteLastNames',
            'ClienteRut',
            'Folio',
            'CotizacionState',
            'CotizacionType',
            'Inmuebles.InmuebleType',
            'Inmuebles.Number',
          ],
        });
        draft.filter = action.filter;
        draft.offers = fuse.search(action.filter.txtSearch);
        break;
      case FETCH_OFFERS:
        draft.loading = true;
        draft.error = false;
        break;
      case FETCH_OFFERS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_OFFERS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.offers = action.offers;
        draft.origin_offers = action.offers;
        break;
    }
  });

export default offerReducer;
