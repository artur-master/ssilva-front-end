/**
 *
 * Project
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectPreload } from 'containers/App/selectors';
import makeSelectInitProject from '../Init/selectors';
import reducer from './reducer';
import saga from './saga';
import PolizaForm from './Form';
import PolizaView from './View';
import makeSelectPoliza from './selectors';
import { resetContainer, saveProject, toggleScreen } from './actions';
import { mustUpdate } from './helper';

export function Poliza({
  action = 'view',
  preload,
  selectorProject,
  selector,
  dispatch,
}) {
  useInjectReducer({ key: 'poliza', reducer });
  useInjectSaga({ key: 'poliza', saga });
  const { project = {} } = selectorProject;
  const { UsersProyecto = [] } = project;
  useEffect(() => {
    if (mustUpdate(project)) dispatch(toggleScreen('form', true));
    else dispatch(toggleScreen('view', true));
    return () => dispatch(resetContainer());
  }, [UsersProyecto]);

  const { screen } = selector;

  if (screen === 'view' && selectorProject.project)
    return (
      <PolizaView
        action={action}
        preload={preload}
        selectorProject={selectorProject}
        selector={selector}
        onEdit={() => dispatch(toggleScreen('form', true))}
      />
    );
  if (screen === 'form')
    return (
      <PolizaForm
        onSubmit={values => dispatch(saveProject(values))}
        preload={preload}
        selectorProject={selectorProject}
        selector={selector}
        onReset={() => dispatch(toggleScreen('view', true))}
      />
    );
  return null;
}

Poliza.propTypes = {
  action: PropTypes.string,
  preload: PropTypes.object,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  preload: makeSelectPreload(),
  selectorProject: makeSelectInitProject(),
  selector: makeSelectPoliza(),
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

export default compose(withConnect)(Poliza);
