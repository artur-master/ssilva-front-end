/*
 *
 * Dashboard actions
 *
 */

import {
  FETCH_ENTITIES,
  FETCH_ENTITIES_ERROR,
  FETCH_ENTITIES_SUCCESS,
  FETCH_LOGS,
  FETCH_LOGS_ERROR,
  FETCH_LOGS_SUCCESS,
} from './constants';

export function fetchEntities() {
  return {
    type: FETCH_ENTITIES,
  };
}

export function fetchEntitiesError(error) {
  return {
    type: FETCH_ENTITIES_ERROR,
    error,
  };
}

export function fetchEntitiesSuccess(entities) {
  return {
    type: FETCH_ENTITIES_SUCCESS,
    entities,
  };
}

export function fetchLogs() {
  return {
    type: FETCH_LOGS,
  };
}

export function fetchLogsError(error) {
  return {
    type: FETCH_LOGS_ERROR,
    error,
  };
}

export function fetchLogsSuccess(response) {
  return {
    type: FETCH_LOGS_SUCCESS,
    response,
  };
}