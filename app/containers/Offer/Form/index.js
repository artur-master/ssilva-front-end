/* eslint-disable no-unused-vars */
/**
 *
 * Offer Form
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { Auth } from 'containers/App/helpers';
import makeSelectOfferForm from './selectors';
import Form from './Form';
import reducer from './reducer';
import saga from './saga';
import { getOffer, resetContainer } from './actions';
import Steps from './Steps';
import { canConfirmOffer, getActionTitle } from '../helper';
import OfferConfirm from './Confirm';
import OfferInForm from './InForm';
import InSteps from './InForm/Steps';
const SyncMessage = WithLoading();
export function OfferForm({
  match,
  selectorProject,
  selector,
  dispatch,
  location,
}) {
  useInjectReducer({ key: 'offerform', reducer });
  useInjectSaga({ key: 'offerform', saga });
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
        Project={{ ProyectoID: match.params.id }}
        Inmueble={{ ProyectoID: match.params.id }}
        InstitucionFinanciera
      />
      {!(project && selector.offer) && <SyncMessage loading />}
      {project && selector.offer && (
        <>
          {!Auth.isInmobiliario() && (
            <>
              <ProjectPhases project={project} active="offer" />
              <Steps offer={selector.offer} />
            </>
          )}
          {Auth.isInmobiliario() && <InSteps offer={selector.offer} />}
          <h4 className="font-21 mt-3">{`${project.Name} / ${Folio}`}</h4>
          <h5 className="mb-3 d-flex align-items-center justify-content-between">
            <span className="font-16-rem line-height-1 color-success">
              {getActionTitle(selector.offer)}
            </span>
          </h5>
          {canConfirm && (
            <OfferConfirm
              selector={selector}
              project={project}
              dispatch={dispatch}
            />
          )}

          {!canConfirm && !Auth.isInmobiliario() && (
            <>
              <InitData User Client />
              <Form project={project} selector={selector} dispatch={dispatch} />
            </>
          )}

          {!canConfirm && Auth.isInmobiliario() && (
            <OfferInForm
              project={project}
              selector={selector}
              dispatch={dispatch}
            />
          )}
        </>
      )}
    </>
  );
}

OfferForm.propTypes = {
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

export default compose(withConnect)(OfferForm);
