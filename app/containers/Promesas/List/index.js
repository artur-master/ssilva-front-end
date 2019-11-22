/**
 *
 * Offer
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import WithLoading from 'components/WithLoading';
import makeSelectOffers from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchOffers, searchOffers } from './actions';
import List from './List';
import Filter from './Filter';

const ListWithLoading = WithLoading(List);

export function Offers({ project, offers, dispatch }) {
  useInjectReducer({ key: 'offers', reducer });
  useInjectSaga({ key: 'offers', saga });
  useEffect(() => {
    if (project && project.ProyectoID)
      dispatch(fetchOffers(project.ProyectoID));
  }, []);

  return (
    <>
      <Filter
        filter={offers.filter}
        searchOffers={txtSearch => dispatch(searchOffers(txtSearch))}
      />
      <ListWithLoading {...offers} />
    </>
  );
}

Offers.propTypes = {
  project: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  offers: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  offers: makeSelectOffers(),
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

export default compose(withConnect)(Offers);
