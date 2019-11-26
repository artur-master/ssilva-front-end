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
import ProjectPhases from 'containers/Common/ProjectPhases';
import WithLoading from 'components/WithLoading';
import makeSelectOfferForm from './selectors';
import Form from './Form';
import reducer from './reducer';
import saga from './saga';
import { getActionTitle } from './helper';
import { getQuotation, getOffer, resetContainer, updateOffer } from './actions';
import Steps from './Steps';
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
  useEffect(() => {
    if (OfertaID) dispatch(getOffer(OfertaID));
    return () => dispatch(resetContainer());
  }, [location.search]);

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
          <Form project={project} selector={selector} dispatch={dispatch} />
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
