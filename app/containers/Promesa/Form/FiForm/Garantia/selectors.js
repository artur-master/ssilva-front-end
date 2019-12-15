import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the promesa state domain
 */

const selectPromesaGarantiaDomain = state => state.promesagarantia || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Promesa
 */

const makeSelectPromesaGarantia = () =>
  createSelector(
    selectPromesaGarantiaDomain,
    substate => substate,
  );

export default makeSelectPromesaGarantia;
export { selectPromesaGarantiaDomain };
