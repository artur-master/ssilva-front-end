/**
 *
 * Promesa Form
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
import { APROBACION_INMOBILIARIA_STATE } from 'containers/App/constants';
import model from '../../model';
import { approveIn } from '../actions';
import PromesaInFormObservation from './Observation';
import PromesaInFormActions from './Actions';
import InSteps from './Steps';

export function PromesaInForm({ selector, dispatch }) {
  const initialValues = model({
    project: window.project,
    entity: selector.promesa,
  });

  return (
    <>
      <InSteps promesa={selector.promesa} />
      <h4 className="font-21 mt-3">{`${window.project.Name} / ${
        selector.promesa.Folio
      }`}</h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success">
          {selector.promesa.AprobacionInmobiliariaState}
        </span>
      </h5>
      <PromesaInFormObservation entity={selector.promesa} />
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient
        payType={selector.promesa.PayType}
        client={selector.promesa.Cliente}
      />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito initialValues={initialValues} />
      <PhaseDocument entity={initialValues} isCollapse />
      {selector.promesa.AprobacionInmobiliariaState ===
        APROBACION_INMOBILIARIA_STATE[1] && (
        <PromesaInFormActions
          selector={selector}
          onCancel={() =>
            dispatch(push(`/proyectos/${window.project.ProyectoID}/promesas`))
          }
          onApprove={values => {
            dispatch(
              approveIn({
                PromesaID: selector.promesa.PromesaID,
                ...values,
                Comment: values.Comment || '',
                Conditions: selector.promesa.Condition.map(condition => ({
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

PromesaInForm.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default PromesaInForm;
