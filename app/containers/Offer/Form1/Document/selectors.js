import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectDocumentDomain = state => state.res_document || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Project
 */

const makeSelectDocument = () =>
  createSelector(
    selectDocumentDomain,
    substate => substate,
  );

export default makeSelectDocument;
export { selectDocumentDomain };
