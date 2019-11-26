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
import ProjectMeta from 'containers/Common/ProjectMeta/Loadable';
import makeSelectReservations from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchReservations, searchReservations } from './actions';
import List from './List';
import Filter from './Filter';

const SyncMessage = WithLoading();

export function Reservations({ match, selectorProject, selector, dispatch }) {
  const { project } = selectorProject;
  useInjectReducer({ key: 'reservations', reducer });
  useInjectSaga({ key: 'reservations', saga });

  useEffect(() => {
    if (match.params.id) dispatch(fetchReservations(match.params.id));
  }, []);
  return (
    <>
      <InitData Project={{ ProyectoID: match.params.id }} />

      <Helmet title={`Reservas - ${project.Name || '...'}`} />
      <ProjectMeta action="view" project={project} active="reservation" />
      {selector.loading && <SyncMessage {...selector} />}
      {!selector.loading && selector.reservations && (
        <>
          <Filter
            project={project}
            selector={selector}
            searchReservations={(txtSearch, status) =>
              dispatch(searchReservations(txtSearch, status))
            }
          />
          <List {...selector} project={project} dispatch={dispatch} />
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
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectReservations(),
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

export default compose(withConnect)(Reservations);
