/**
 *
 * ProjectList
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
import makeSelectProjectList from './selectors';
import reducer from './reducer';
import saga from './saga';
import Filter from './Filter';
import { fetchEntities, filterEntites } from './actions';
import Item from './Item';
import ItemPending from './ItemPending';

const SyncMessage = WithLoading();

export function ProjectListPage({ dispatch, selector }) {
  useInjectReducer({ key: 'projectList', reducer });
  useInjectSaga({ key: 'projectList', saga });

  const { entities, loading } = selector;
  useEffect(() => {
    dispatch(fetchEntities());
  }, []);
  const assignEntities = [];
  const otherEntities = [];
  const creationEntities = [];
  (entities || []).forEach(entity => {
    if (!entity.IsFinished) {
      return creationEntities.push(entity);
    }
    if (UserProject.in(entity)) {
      return assignEntities.push(entity);
    }
    return otherEntities.push(entity);
  });
  return (
    <div>
      <Helmet title="Project list" />
      <PageHeader>Proyectos</PageHeader>
      {!entities && <SyncMessage {...selector} />}
      {entities && !loading && (
        <>
          <Filter onFilter={query => dispatch(filterEntites(query))} />
          <hr />
          <section className="proyect-group row mx-n2">
            <h3 className="title col-12 px-2">Proyectos Asignados</h3>
            {assignEntities.map(project => (
              <Item
                key={project.ProyectoID}
                project={project}
                dispatch={dispatch}
              />
            ))}
          </section>
          <section className="proyect-group row mx-n2">
            <h3 className="title col-12 px-2">Proyectos Empresa</h3>
            {otherEntities.map(project => (
              <Item
                key={project.ProyectoID}
                project={project}
                dispatch={dispatch}
              />
            ))}
          </section>
          <section className="proyect-group row mx-n2">
            <h3 className="title col-12 px-2">Proyectos en Creación</h3>
            {creationEntities.map(project => (
              <ItemPending
                key={project.ProyectoID}
                project={project}
                dispatch={dispatch}
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
}

ProjectListPage.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectProjectList(),
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
)(ProjectListPage);
