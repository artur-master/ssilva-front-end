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
import model from '../../model';
import { approveIn } from '../actions';
import OfferInFormObservation from './Observation';
import OfferInFormActions from './Actions';

export function OfferInForm({ project, selector, dispatch }) {
  const entity = selector.offer;
  const initialValues = model({ project, entity });

  return (
    <>
      <OfferInFormObservation entity={selector.offer} />
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient payType={entity.PayType} client={entity.Cliente} />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito initialValues={initialValues} />
      <PhaseDocument entity={initialValues} isCollapse />
      <OfferInFormActions
        selector={selector}
        onCancel={() =>
          dispatch(push(`/proyectos/${project.ProyectoID}/ofertas`))
        }
        onApprove={values => {
          dispatch(
            approveIn({
              OfertaID: selector.offer.OfertaID,
              ...values,
              Comment: values.Comment || '',
              Conditions: entity.Condition.map(condition => ({
                ...condition,
                IsApprove: true,
              })),
            }),
          );
        }}
      />
    </>
  );
}

OfferInForm.propTypes = {
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default OfferInForm;
