/**
 *
 * Offer Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import PhaseGeneral from 'containers/Phases/General';
import PhaseClient from 'containers/Phases/Client';
import PhaseInmueble from 'containers/Phases/Inmueble';
import PhaseFormaDePago from 'containers/Phases/FormaDePago';
import PhasePreCredito from 'containers/Phases/PreCredito';
import PhaseDocument from 'containers/Phases/Document';
import { push } from 'connected-react-router';
import { Auth } from 'containers/App/helpers';
import model from '../../model';
import { approveIn } from '../actions';
import OfferInFormObservation from './Observation';
import OfferInFormActions from './Actions';
import InSteps from './Steps';

export function OfferInForm({ selector, dispatch }) {
  const initialValues = model({
    project: window.project,
    entity: selector.offer,
  });

  return (
    <>
      <InSteps offer={selector.offer} />
      <h4 className="font-21 mt-3">{`${window.project.Name} / ${
        selector.offer.Folio
      }`}</h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success">
          {selector.offer.AprobacionInmobiliariaState}
        </span>
      </h5>
      <OfferInFormObservation entity={selector.offer} />
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient
        payType={selector.offer.PayType}
        client={selector.offer.Cliente}
      />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito initialValues={initialValues} />
      <PhaseDocument entity={initialValues} isCollapse />
      {!selector.offer.AprobacionInmobiliaria[Auth.get('user_id')] && (
        <OfferInFormActions
          selector={selector}
          onCancel={() =>
            dispatch(push(`/proyectos/${window.project.ProyectoID}/ofertas`))
          }
          onApprove={values => {
            dispatch(
              approveIn({
                OfertaID: selector.offer.OfertaID,
                ...values,
                Comment: values.Comment || '',
                Conditions: selector.offer.Condition.map(condition => ({
                  ...condition,
                  IsApprove: true,
                })),
              }),
            );
          }}
        />
      )}
    </>
  );
}

OfferInForm.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default OfferInForm;
