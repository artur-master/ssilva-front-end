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
import WithLoading from 'components/WithLoading';
import { UserProject } from 'containers/Project/helper';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import makeSelectOfferForm from './selectors';
import Form from './Form';
import reducer from './reducer';
import saga from './saga';
import { getOffer, resetContainer } from './actions';
import { canApproveModifyOffer, canConfirmOffer, isModified } from '../helper';
import OfferConfirm from './Confirm';
import OfferInForm from './InForm';
import OfferFiForm from './FiForm';
import OfferEditForm from './Edit';
import OfferApproveEditForm from './ApproveEdit';
const SyncMessage = WithLoading();
export function OfferForm({
  selector,
  selectorProject,
  dispatch,
  location,
  action,
}) {
  useInjectReducer({ key: 'offerform', reducer });
  useInjectSaga({ key: 'offerform', saga });
  const query = queryString.parse(location.search);
  const { OfertaID } = query;
  const { project = {} } = selectorProject;

  useEffect(() => {
    if (OfertaID) dispatch(getOffer(OfertaID));
    return () => dispatch(resetContainer());
  }, [location.search]);

  if (selector.redirect) {
    return <Redirect to={`/proyectos/${project.ProyectoID}/ofertas`} />;
  }
  if (!project || !selector.offer) return <SyncMessage loading />;

  if (action === 'edit')
    return <OfferEditForm selector={selector} dispatch={dispatch} />;

  if (isModified(selector.offer))
    return <OfferApproveEditForm selector={selector} dispatch={dispatch} />;

  // Inmobiliario screen
  if (UserProject.isInmobiliario()) {
    return <OfferInForm selector={selector} dispatch={dispatch} />;
  }

  // Finanza screen
  if (UserProject.isFinanza()) {
    return <OfferFiForm selector={selector} dispatch={dispatch} />;
  }

  if (canConfirmOffer(selector.offer))
    return <OfferConfirm selector={selector} dispatch={dispatch} />;

  return <Form selector={selector} dispatch={dispatch} />;
}

OfferForm.propTypes = {
  action: PropTypes.string,
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
