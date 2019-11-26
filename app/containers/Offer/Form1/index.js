/* eslint-disable no-unused-vars */
/**
 *
 * Offer Form
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { makeSelectPreload } from 'containers/App/selectors';
import ProjectPhases from 'containers/Common/ProjectPhases';
import WithLoading from 'components/WithLoading';
import makeSelectOfferForm from './selectors';
import OfferDocForm from './Document';
import Form from './Form';
import reducer from './reducer';
import saga from './saga';
import { currentResevationStep, getActionTitle } from './helper';
import { saveOffer, getOffer, resetContainer } from './actions';
import Steps from './Steps';
const SyncMessage = WithLoading();
export function OfferForm({
  match,
  preload,
  selectorProject,
  selector,
  dispatch,
  location,
}) {
  useInjectReducer({ key: 'offerform', reducer });
  useInjectSaga({ key: 'offerform', saga });
  const parsed = queryString.parse(location.search);
  useEffect(() => {
    dispatch(resetContainer());
    dispatch(getOffer(parsed.OfertaID));
  }, []);
  const { project } = selectorProject;
  const { Folio } = selector.offer;

  const currentStep = currentResevationStep(selector.offer);

  return (
    <>
      <Helmet title={`Oferta - ${project.Name || '...'}`} />
      <PageHeader header={['Proyectos', project.Name || '...']} />
      <InitData
        User
        Project={{ ProyectoID: match.params.id }}
        Client
        Inmueble={{ ProyectoID: match.params.id }}
      />
      {!(project && selector.offer) && <SyncMessage loading />}
      {project && selector.offer && (
        <>
          <ProjectPhases project={project} active="offer" />
          <Steps offer={selector.offer} />
          <h4 className="font-21 mt-3">{`${project.Name} / ${Folio}`}</h4>
          <h5 className="mb-3 d-flex align-items-center justify-content-between">
            <span className="font-16-rem line-height-1 color-success">
              {getActionTitle(selector.offer)}
            </span>
          </h5>
          <Form
            preload={preload}
            project={project}
            selector={selector}
            dispatch={dispatch}
            onSubmit={values => {
              dispatch(
                saveOffer({
                  ...values,
                  PayType: (
                    (preload.paymentUtils || []).find(
                      payment =>
                        payment.PayTypeID === values.PayType ||
                        payment.Name === values.PayType,
                    ) || {}
                  ).Name,
                }),
              );
            }}
          />

          {currentStep > 1 && (
            <OfferDocForm
              offer={selector.offer}
              project={project}
              currentStep={currentStep}
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
  preload: PropTypes.object,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  preload: makeSelectPreload(),
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
