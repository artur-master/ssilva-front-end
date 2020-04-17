/**
 *
 * Escritura
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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
import Escrituras from './List';

export function Escritura({ match, selectorProject, dispatch }) {
  const { project } = selectorProject;

  const header = ['Proyectos'];
  if (project.Name) header.push(project.Name);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [r, setR] = useState(false);

  const onConfirm = () => {
    setModalOpen(false);
    setR(true);
  }
  
  if(r)
    return <Redirect to={`/proyectos/${project.ProyectoID}/escritura`} />;

  return (
    <>
      <InitData Project={{ ProyectoID: match.params.id }} />
      <Helmet title={`Promesas - ${project.Name || '...'}`} />
      <PageHeader header={header} />
      <ProjectMeta action="view" project={project} active="escritura" />
      {UserProject.isPM() && (
        <>
          <nav className="search-bar-02 d-flex align-items-center justify-content-end after-expands-1">
            <Button 
              className="m-btn-white icon icon-zz-deed d-flex align-items-center"
              onClick={()=>setModalOpen(true)}
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
                onClick={()=>setModalOpen(false)}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
      {Auth.isGerenteComercial() && (
        <Escrituras 
          ProyectoID={match.params.id} 
          selectorProject={selectorProject} 
          dispatch={dispatch} 
        />
      )}
    </>
  );
}

Escritura.propTypes = {
  match: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect)(Escritura);
