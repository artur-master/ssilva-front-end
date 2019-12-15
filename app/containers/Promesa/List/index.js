/**
 *
 * Promesa
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
import PageHeader from 'containers/Common/PageHeader';
import makeSelectPromesas from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchPromesas, searchPromesas } from './actions';
import List from './List';
import Filter from './Filter';

const SyncMessage = WithLoading();

export function Promesas({ match, selectorProject, selector, dispatch }) {
  const { project } = selectorProject;
  useInjectReducer({ key: 'promesas', reducer });
  useInjectSaga({ key: 'promesas', saga });

  useEffect(() => {
    if (match.params.id) dispatch(fetchPromesas(match.params.id));
  }, []);

  // header
  const header = ['Proyectos'];
  if (project.Name) header.push(project.Name);

  return (
    <>
      <InitData Project={{ ProyectoID: match.params.id }} />
      <Helmet title={`Promesas - ${project.Name || '...'}`} />
      <PageHeader header={header} />
      <ProjectMeta action="view" project={project} active="promesa" />
      {selector.loading && <SyncMessage {...selector} />}
      {!selector.loading && selector.promesas && (
        <>
          <Filter
            project={project}
            selector={selector}
            searchPromesas={(txtSearch, status) =>
              dispatch(searchPromesas(txtSearch, status))
            }
          />
          <List {...selector} project={project} dispatch={dispatch} />
        </>
      )}
    </>
  );
}

Promesas.propTypes = {
  match: PropTypes.object,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectPromesas(),
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

export default compose(withConnect)(Promesas);
