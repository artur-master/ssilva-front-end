/**
 *
 * Promesa
 *
 */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectPromesaGarantia from './selectors';
import reducer from './reducer';
import saga from './saga';
import { resetContainer } from './actions';

export function PromesaGarantia({ dispatch }) {
  useInjectReducer({ key: 'promesagarantia', reducer });
  useInjectSaga({ key: 'promesagarantia', saga });
  useEffect(() => () => dispatch(resetContainer()), []);
  return null;
}

PromesaGarantia.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectPromesaGarantia(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PromesaGarantia);
