/*
 *
 * Inmueble reducer
 *
 */
import produce from 'immer';
import {
  FETCH_ENTITIES,
  FETCH_ENTITIES_ERROR,
  FETCH_ENTITIES_SUCCESS,
  MATCH_RESTRICTION,
  RESET_SELECT,
  SELECT_ENTITY,
  SUCESS_UPLOAD,
  UPLOAD_BLUEPRINT,
  ERROR_UPLOAD,
} from './constants';
import { matchRestrictions } from './helper';

export const initialState = {
  loading: false,
  error: false,
  entities: false,
  selected: [],
};

/* eslint-disable default-case, no-param-reassign */
const inmuebleReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SELECT_ENTITY:
        draft.selected = draft.selected.filter(
          item => item.InmuebleID !== action.entity.InmuebleID,
        );
        if (action.IsSelected) {
          draft.selected.push(action.entity);
          if (!action.focusChange)
            (action.entity.Restrictions || [])
              .filter(
                restriction => restriction.InmuebleInmuebleType === 'Required',
              )
              .forEach(subitem => draft.selected.push(subitem.Inmueble));
        } else if (!action.focusChange) {
          const required = (action.entity.Restrictions || []).reduce(
            (acc, restriction) => {
              if (restriction.InmuebleInmuebleType === 'Required')
                acc.push(restriction.InmuebleBID);
              return acc;
            },
            [],
          );
          if (required.length > 0) {
            draft.selected = draft.selected.filter(
              item => !required.includes(item.InmuebleID),
            );
          }
        }
        break;
      case RESET_SELECT:
        draft.selected = action.selected; // reset selected
        // match origin selected to Inmueble object
        if (draft.entities)
          draft.selected = draft.selected.reduce((acc, item) => {
            const findSelected = draft.entities.find(
              entity => entity.InmuebleID === item.InmuebleID,
            );
            if (findSelected) acc.push(findSelected);
            return acc;
          }, []);
        draft.loading = false;
        draft.error = false;
        draft.success = false;
        break;
      case FETCH_ENTITIES:
        draft.loading = true;
        draft.error = false;
        draft.success = false;
        break;
      case FETCH_ENTITIES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.success = false;
        break;
      case FETCH_ENTITIES_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.entities = action.response.inmuebles[0].Inmuebles;
        draft.entities = matchRestrictions({
          inmuebles: action.response.inmuebles[0].Inmuebles,
          restrictions: action.response.restrictions,
        });
        // match origin selected to Inmueble object
        draft.selected = draft.selected.reduce((acc, item) => {
          const findSelected = draft.entities.find(
            entity => entity.InmuebleID === item.InmuebleID,
          );
          if (findSelected) acc.push(findSelected);
          return acc;
        }, []);
        break;
      case MATCH_RESTRICTION:
        draft.entities = matchRestrictions({
          inmuebles: state.entities,
          restrictions: action.restrictions,
        });
        break;
    case UPLOAD_BLUEPRINT:
      draft.loading = true;
      draft.error = false;
      draft.success = false;
      break;
    case SUCESS_UPLOAD:
        draft.loading = true;
        draft.error = false;
        draft.success = true;
      break;
    case ERROR_UPLOAD:
        draft.loading = false;
        draft.error = true;
        draft.success = false;
      break;
    }
  });

export default inmuebleReducer;
