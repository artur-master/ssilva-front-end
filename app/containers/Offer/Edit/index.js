/* eslint-disable no-unused-vars */
/**
 *
 * Offer Form
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InitData from 'containers/Common/InitData';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import ProjectPhases from 'containers/Common/ProjectPhases';
import WithLoading from 'components/WithLoading';
import Alert from 'components/Alert';
import Button from 'components/Button';
import makeSelectOfferForm from './selectors';
import Form from './Form';
import reducer from './reducer';
import saga from './saga';
import { getOffer, resetContainer } from './actions';
import Steps from './Steps';
import { canConfirmOffer } from '../helper';
const SyncMessage = WithLoading();
export function OfferEditForm({
  match,
  selectorProject,
  selector,
  dispatch,
  location,
}) {
  useInjectReducer({ key: 'offereditform', reducer });
  useInjectSaga({ key: 'offereditform', saga });
  const query = queryString.parse(location.search);
  const { OfertaID } = query;
  const { project } = selectorProject;
  const { Folio } = selector.offer;

  const canConfirm = canConfirmOffer(selector.offer);

  useEffect(() => {
    if (OfertaID) dispatch(getOffer(OfertaID));
    return () => dispatch(resetContainer());
  }, [location.search]);

  if (selector.redirect) {
    return <Redirect to={`/proyectos/${project.ProyectoID}/ofertas`} />;
  }
  return (
    <>
      <Helmet title={`Oferta - ${project.Name || '...'}`} />
      <PageHeader header={['Proyectos', project.Name || '...']} />
      <InitData
        User
        Client
        Project={{ ProyectoID: match.params.id }}
        Inmueble={{ ProyectoID: match.params.id }}
        InstitucionFinanciera
      />
      {!(project && selector.offer) && <SyncMessage loading />}
      {project && selector.offer && (
        <>
          <ProjectPhases project={project} active="offer" />
          <Steps offer={selector.offer} />
          <Alert type="danger">
            El modificar algunos datos implicará cambios importantes en el
            proceso.
          </Alert>
          <h4 className="font-21 mt-3">{`${project.Name} / ${Folio}`}</h4>
          <h5 className="mb-3 d-flex align-items-center justify-content-between">
            <span className="font-16-rem line-height-1 color-success">
              Modificaciones Oferta
            </span>
            <div className="d-flex">
              <Button className="m-btn-warning-02 m-btn-alert">
                Dar de Baja la Oferta
              </Button>
              <Button>Guardar Cambios</Button>
              <Button
                onClick={() =>
                  dispatch(push(`/proyectos/${project.ProyectoID}/ofertas`))
                }
                color="white"
              >
                Cancelar
              </Button>
            </div>
          </h5>
          <Form project={project} selector={selector} dispatch={dispatch} />
          <div className="d-flex align-items-end">
            <Button className="m-btn-warning-02 m-btn-alert">
              Dar de Baja la Oferta
            </Button>
            <Button>Guardar Cambios</Button>
            <Button
              onClick={() =>
                dispatch(push(`/proyectos/${project.ProyectoID}/ofertas`))
              }
              color="white"
            >
              Cancelar
            </Button>
          </div>
        </>
      )}
    </>
  );
}

OfferEditForm.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectOfferForm(),
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

export default compose(withConnect)(OfferEditForm);
