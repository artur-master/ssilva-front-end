/**
 *
 * Dashboard
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import WithLoading from 'components/WithLoading';
import { UserProject } from 'containers/Project/helper';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchEntities } from './actions';
import MainContent from './Main';
import ActionPending from './Action';

const SyncMessage = WithLoading();

export function DashboardPage({ dispatch, selector }) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const { loading } = selector;

  useEffect(() => {
    if (!loading) dispatch(fetchEntities());
  }, []);
 
  return (
    <div className="mt-4">
      <Helmet title="Dashboard" />
      {/* <PageHeader actions={['aa']}>Dashboard</PageHeader> */}
      {/* {!entities && <SyncMessage {...selector} />} */}
      <ActionPending dispatch={dispatch} selector={selector} />
      <MainContent dispatch={dispatch} selector={selector} />
    </div>
  );
}

DashboardPage.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectDashboard(),
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

export default compose(
  withConnect,
  memo,
)(DashboardPage);
