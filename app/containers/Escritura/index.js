/**
 *
 * Escritura
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import InitData from 'containers/Common/InitData';
import { UserProject } from 'containers/Project/helper';
import { Auth } from 'containers/App/helpers';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import Alert from 'components/Alert';
import Button from 'components/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import ProjectMeta from 'containers/Common/ProjectMeta/Loadable';
import PageHeader from 'containers/Common/PageHeader';
import WithLoading from 'components/WithLoading';
const SyncMessage = WithLoading();
import reducer from './Form/reducer';
import saga from './Form/saga';
import { getEscritura, confirmEscritura } from './Form/actions';
import makeSelectEscrituraForm from './Form/selectors';
// import Escrituras from './List';

export function Escritura({ match, selector, selectorProject, dispatch }) {
  const { project } = selectorProject;

  useInjectReducer({ key: 'escrituraform', reducer });
  useInjectSaga({ key: 'escrituraform', saga });

  const header = ['Proyectos'];
  if (project.Name) header.push(project.Name);
  
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (project) dispatch(getEscritura(project.ProyectoID));
  }, [project]);

  if (selector.redirect !== "") {
    return <Redirect to={`/proyectos/${project.ProyectoID}/escritura`} />;
  }

  const blockEscritura = () => {
    if (!project) return <SyncMessage loading />;
    if (UserProject.isPM()) {
      if (selector.error)
        return (
          <Alert type="danger">
            {selector.error.statusText}
          </Alert>
        );
      else
        return (
          <>
            <nav className="search-bar-02 d-flex align-items-center justify-content-end after-expands-1">
              <Button
                className="m-btn-white icon icon-zz-deed d-flex align-items-center"
                disabled={!!selector.escritura}
                onClick={() => setModalOpen(true)}
              >
                Próximo a Escriturar
              </Button>
              <Button
                className="mr-3"
              // onClick={}
              >
                Ver proceso
              </Button>
            </nav>
            <Modal isOpen={modalOpen} size="xl" scrollable>
              <ModalHeader>
                <div className="d-flex">{project.Name}</div>
                <span className="font-18 color-warning">Escriturar</span>
              </ModalHeader>
              <ModalBody className="p-3 bg-light">
                <Alert type="danger">
                  Vas a comenzar el proceso de Escrituraciòn. ¿Quieres continuar?
                </Alert>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onConfirm}>
                  Confirmar
                </Button>
                <Button
                  className="ml-2"
                  color="white"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          </>
        );
    }
    else if (Auth.isGerenteComercial()) {
      if (selector.success) {
        // return (
        //   <Escrituras
        //     ProyectoID={match.params.id}
        //     selectorProject={selectorProject}
        //     dispatch={dispatch}
        //   />
        // )
        return selector.escritura == [] ? 
          <Alert type="danger"> Didn't create Escritura </Alert>:
          <Redirect to={`/proyectos/${project.ProyectoID}/escritura`} />
      }
      else{
        return (
          <Alert type="danger">
            { selector.error.statusText }
          </Alert>
        );
      }
    }
    else {
      return (
        <Alert type="danger">
          You have not access.
        </Alert>
      )
    }
  }

  const onConfirm = () => {
    setModalOpen(false);
    dispatch(confirmEscritura(project.ProyectoID));
  }

  return (
    <>
      <InitData Project={{ ProyectoID: match.params.id }} User />
      <Helmet title={`Promesas - ${project.Name || '...'}`} />
      <PageHeader header={header} />
      <ProjectMeta action="view" project={project} active="escritura" />
      {!selector.loading && blockEscritura()}
    </>
  );
}

Escritura.propTypes = {
  match: PropTypes.object,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selector: makeSelectEscrituraForm(),
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

export default compose(withConnect)(Escritura);
