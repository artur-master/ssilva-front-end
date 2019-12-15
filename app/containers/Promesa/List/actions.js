/*
 *
 * Promesa actions
 *
 */

import {
  FETCH_PROMESAS,
  FETCH_PROMESAS_ERROR,
  FETCH_PROMESAS_SUCCESS,
  SEARCH_PROMESAS,
} from './constants';

export function searchPromesas(filter) {
  return {
    type: SEARCH_PROMESAS,
    filter,
  };
}

export function fetchPromesas(projectId) {
  return {
    type: FETCH_PROMESAS,
    projectId,
  };
}

export function fetchPromesasError(error) {
  return {
    type: FETCH_PROMESAS_ERROR,
    error,
  };
}

export function fetchPromesasSuccess(promesas) {
  return {
    type: FETCH_PROMESAS_SUCCESS,
    promesas,
  };
}
