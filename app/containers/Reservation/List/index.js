/**
 *
 * Reservation
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
import WithLoading from 'components/WithLoading';
import Alert from 'components/Alert';
import ProjectMeta from 'containers/Common/ProjectMeta/Loadable';
import makeSelectReservations from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchReservations, searchReservations, queryReservations } from './actions';
import { fetchOffers } from 'containers/Offer/List/actions';
import { requiredData } from '../../Quotation/List/helper'
import makeSelectOffers from 'containers/Offer/List/selectors';
import List from './List';
import Filter from './Filter';

const SyncMessage = WithLoading();

export function Reservations({ match, selectorProject, selector, offers, dispatch }) {
  const { project } = selectorProject;
  useInjectReducer({ key: 'reservations', reducer });
  useInjectSaga({ key: 'reservations', saga });

  useEffect(() => {
    if (match.params.id && !selector.loading){
      dispatch(fetchReservations(match.params.id));
      dispatch(fetchOffers(match.params.id));
    }
  }, []);
  return (
    <>
      <InitData Project={{ ProyectoID: match.params.id }} />

      <Helmet title={`Reservas - ${project.Name || '...'}`} />
      <ProjectMeta action="view" project={project} active="reservation" />
      {selector.loading && <SyncMessage {...selector} />}
      {!selector.loading && selector.reservations && (
        <>
          {!requiredData(project) && (
            <Filter
              project={project}
              selector={selector}
              searchReservations={(txtSearch, status) =>
                dispatch(searchReservations(txtSearch, status))
              }
            />
          )}
          {requiredData(project) && (
            <Alert type="danger" className="mb-0">
              {`Para seguir debes completar los datos del proyecto: `+requiredData(project)}
            </Alert>
          )}
          <List {...selector} project={project}
                onQuery={query => {dispatch(queryReservations(query))}}
                offers={offers.offers} dispatch={dispatch}
          />
        </>
      )}
    </>
  );
}

Reservations.propTypes = {
  match: PropTypes.object,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  offers: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectReservations(),
  selectorProject: makeSelectInitProject(),
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

export default compose(withConnect)(Reservations);
