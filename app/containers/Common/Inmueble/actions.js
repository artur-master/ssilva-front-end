/*
 *
 * Inmueble actions
 *
 */

import {
  FETCH_ENTITIES,
  FETCH_ENTITIES_ERROR,
  FETCH_ENTITIES_SUCCESS,
  MATCH_RESTRICTION,
  RESET_SELECT,
  SELECT_ENTITY,
} from './constants';

export function selectEntity(entity, IsSelected, focusChange = false) {
  return {
    type: SELECT_ENTITY,
    entity,
    IsSelected,
    focusChange,
  };
}

export function resetSelected(selected = [], focusChange = false) {
  return {
    type: RESET_SELECT,
    selected,
    focusChange,
  };
}

export function fetchEntities(ProyectoID) {
  return {
    type: FETCH_ENTITIES,
    ProyectoID,
  };
}

export function fetchEntitiesError(error) {
  return {
    type: FETCH_ENTITIES_ERROR,
    error,
  };
}

export function fetchEntitiesSuccess(response) {
  return {
    type: FETCH_ENTITIES_SUCCESS,
    response,
  };
}

export function matchRestriction(restrictions) {
  return {
    type: MATCH_RESTRICTION,
    restrictions,
  };
}
