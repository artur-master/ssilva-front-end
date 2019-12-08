import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectOfferEditFormDomain = state => state.offereditform || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Offer
 */

const makeSelectOfferEditForm = () =>
  createSelector(
    selectOfferEditFormDomain,
    substate => substate,
  );

export default makeSelectOfferEditForm;
export { selectOfferEditFormDomain };
