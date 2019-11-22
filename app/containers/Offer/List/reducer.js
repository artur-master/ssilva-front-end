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
        draft.filter = { ...state.filter, ...action.filter };
        draft.offers = [...(state.origin_offers || [])];
        if (draft.filter.status)
          draft.offers = draft.offers.filter(
            item => item.OfertaState === draft.filter.status,
          );

        /* eslint-disable-next-line */
        const fuse = new Fuse(draft.offers, {
          keys: ['Folio', 'ClienteName', 'ClienteLastNames', 'ClienteRut'],
        });

        if (draft.filter.textSearch)
          draft.offers = fuse.search(draft.filter.textSearch);
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
