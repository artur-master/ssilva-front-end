/**
 *
 * Escritura
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
import Button from 'components/Button';
import makeSelectPromesas from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchPromesas, searchPromesas, queryPromesas } from './actions';
import List from './List';
import Filter from './Filter';

const SyncMessage = WithLoading();

export function Escrituras({ ProyectoID, selectorProject, selector, dispatch }) {
  const { project } = selectorProject;
  useInjectReducer({ key: 'promesas', reducer });
  useInjectSaga({ key: 'promesas', saga });

  useEffect(() => {
    if (ProyectoID && !selector.loading)
      dispatch(fetchPromesas(ProyectoID));
  }, []);

  // header
  const header = ['Proyectos'];
  if (project.Name) header.push(project.Name);

  return (
    <>
      {<SyncMessage {...selector} />}
      {!selector.loading && selector.promesas && (
        <>
          <h5 className="font-18 d-flex align-items-center justify-content-between">                      
            <Button
                className="mr-3"
                // onClick={}
            >
              Ver proceso
            </Button>
            <Filter
              project={project}
              selector={selector}
              searchPromesas={(txtSearch, status) =>
                dispatch(searchPromesas(txtSearch, status))
              }
            />
          </h5>
          <List {...selector} project={project}
            onQuery={query => {dispatch(queryPromesas(query))}}
            dispatch={dispatch}
          />
        </>
      )}
    </>
  );
}

Escrituras.propTypes = {
  ProyectoID: PropTypes.string,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectPromesas(),
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

export default compose(withConnect)(Escrituras);
