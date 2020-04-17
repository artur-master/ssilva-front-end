/* eslint-disable no-unused-vars */
/**
 *
 * Escritura Form
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
const SyncMessage = WithLoading();
import reducer from './reducer';
import saga from './saga';
import WithLoading from 'components/WithLoading';
import { UserProject } from 'containers/Project/helper';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import makeSelectPromesaForm from './selectors';
import { getPromesa,resetContainer } from './actions';
import Form from './Form';

export function EscrituraForm({ selector, selectorProject, dispatch, location }) {
  const { project = {} } = selectorProject;
  const query = queryString.parse(location.search);
  const { PromesaID } = query;
  useInjectReducer({ key: 'promesaform', reducer });
  useInjectSaga({ key: 'promesaform', saga });

  useEffect(() => {
    if (PromesaID) dispatch(getPromesa(PromesaID));
    // return () => dispatch(resetContainer());
  }, [location.search]);

  // if (selector.redirect) {
  //   return <Redirect to={`/proyectos/${project.ProyectoID}/escrituras`} />;
  // }
  if (!project || !selector.promesa) return <SyncMessage loading />;

  return <Form selector={selector} dispatch={dispatch} />;
}

EscrituraForm.propTypes = {
  location: PropTypes.object,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectPromesaForm(),
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

export default compose(withConnect)(EscrituraForm);
