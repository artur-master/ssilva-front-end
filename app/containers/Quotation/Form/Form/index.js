/**
 *
 * Quotation
 *
 */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form as ExForm } from 'components/ExForm';
import WithLoading from 'components/WithLoading';
import DetailForm from './DetailForm';
import DetailView from './DetailView';
import QuotaForm from './Quota';
import model from '../../model';
import { updateQuotation } from '../actions';

const SyncMessage = WithLoading();

export function PhaseCreationForm({
  selector,
  selectorProject,
  onSubmit,
  onCancel,
  dispatch,
}) {
  const { project = {} } = selectorProject;
  const { quotation = {}, ...restSelector } = selector;
  const [step, setStep] = useState(1);

  const initialValues = model({ project, entity: quotation });

  let directAfterSubmitted = 'list';

  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        if (step === 2) onSubmit(values, directAfterSubmitted);
        else {
          dispatch(updateQuotation(values));
          setStep(2);
        }
      }}
      validationSchema={{
        Inmuebles: Yup.array().required('Debe seleccionar inmuebles'),
      }}
    >
      {form => {
        const { submitForm, values } = form;
        return (
          <>
            <h4 className="font-21">{project.Name}</h4>
            <h5 className="mb-3 font-16 d-flex align-items-center justify-content-between">
              <span className="line-height-1">Nueva Cotización</span>
              <span className="font-14 line-height-1">
                {quotation.Folio && <b>FOLIO : {quotation.Folio}</b>}
              </span>
            </h5>

            <SyncMessage {...restSelector} />
            <div className={step === 2 ? 'd-none' : ''}>
              <DetailForm
                onCancel={onCancel}
                onContinue={submitForm}
                form={form}
              />
            </div>
            {step === 2 && (
              <>
                <DetailView values={values} project={project} />
                <QuotaForm
                  form={form}
                  onCancel={onCancel}
                  goReserva={() => {
                    directAfterSubmitted = 'reserva';
                    submitForm();
                  }}
                />
              </>
            )}
          </>
        );
      }}
    </ExForm>
  );
}

PhaseCreationForm.propTypes = {
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  dispatch: PropTypes.func,
};

export default PhaseCreationForm;
