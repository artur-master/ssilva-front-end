/*
 *
 * Reservation reducer
 *
 */
import Fuse from 'fuse.js';
import produce from 'immer';
import {
  FETCH_RESERVATIONS,
  FETCH_RESERVATIONS_ERROR,
  FETCH_RESERVATIONS_SUCCESS,
  SEARCH_RESERVATIONS,
} from './constants';
import { getReports, initReports } from './helper';

export const initialState = {
  loading: false,
  error: false,
  reservations: false,
  reports: initReports(),
  origin_reservations: false,
  filter: { txtSearch: '' },
};
/* eslint-disable default-case, no-param-reassign */
const reservationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_RESERVATIONS:
        draft.filter = { ...state.filter, ...action.filter };
        draft.reservations = [...(state.origin_reservations || [])];

        /* eslint-disable-next-line */
        const fuse = new Fuse(draft.reservations, {
          keys: ['Folio', 'ClienteName', 'ClienteLastNames', 'ClienteRut'],
        });

        if (draft.filter.textSearch)
          draft.reservations = fuse.search(draft.filter.textSearch);
        draft.reports = getReports(draft.reservations);

        if (draft.filter.status && draft.filter.status !== 'All')
          draft.reservations = draft.reservations.filter(
            item => item.ReservaState === draft.filter.status,
          );

        break;
      case FETCH_RESERVATIONS:
        draft.loading = true;
        draft.error = false;
        break;
      case FETCH_RESERVATIONS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_RESERVATIONS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.origin_reservations = action.reservations.map(reservation => {
          let ReservaStateLabel = reservation.ReservaState;
          let ReservaStateColor = '';
          switch (reservation.ReservaState) {
            case 'Oferta':
              ReservaStateColor = 'badge-info';
              ReservaStateLabel = 'Reservas';
              break;
            case 'Pendiente información':
              ReservaStateColor = 'badge-success';
              ReservaStateLabel = 'En Proceso';
              break;
            case 'Pendiente control':
              ReservaStateColor = 'badge-caution';
              ReservaStateLabel = 'En Control';
              break;
            case 'Rechazada':
              ReservaStateColor = 'badge-danger';
              break;
            case 'Cancelada':
              ReservaStateColor = 'badge-warning';
              break;
            default:
              ReservaStateColor = 'badge-caution';
              break;
          }
          return {
            ...reservation,
            ReservaStateLabel,
            ReservaStateColor,
          };
        });
        draft.reservations = draft.origin_reservations;
        draft.reports = getReports(draft.reservations);
        break;
    }
  });

export default reservationReducer;
