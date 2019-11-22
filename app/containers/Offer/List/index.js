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
import { Helmet } from 'react-helmet';
import InitData from 'containers/Common/InitData';
import makeSelectInitProject from 'containers/Project/Init/selectors';
// import PageHeader from 'containers/Common/PageHeader';
import WithLoading from 'components/WithLoading';
import ProjectMeta from 'containers/Common/ProjectMeta/Loadable';
import makeSelectOffers from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchOffers, searchOffers } from './actions';
import List from './List';
import Filter from './Filter';

const ListWithLoading = WithLoading(List);

export function Offers({ match, selectorProject, offers, dispatch }) {
  const { project } = selectorProject;

  useInjectReducer({ key: 'offers', reducer });
  useInjectSaga({ key: 'offers', saga });

  useEffect(() => {
    if (match.params.id) dispatch(fetchOffers(match.params.id));
  }, []);

  return (
    <>
      <InitData Project={{ ProyectoID: match.params.id }} />

      <Helmet title={`Ofertas - ${project.Name || '...'}`} />
      <ProjectMeta action="view" project={project} active="offer" />

      <Filter
        filter={offers.filter}
        searchOffers={(txtSearch, status) =>
          dispatch(searchOffers(txtSearch, status))
        }
      />
      <ListWithLoading {...offers} project={project} dispatch={dispatch} />
    </>
  );
}

Offers.propTypes = {
  match: PropTypes.object,
  selectorProject: PropTypes.object,
  offers: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  offers: makeSelectOffers(),
  selectorProject: makeSelectInitProject(),
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
