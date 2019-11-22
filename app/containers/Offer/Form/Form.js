/**
 *
 * Offer Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form as ExForm } from 'components/ExForm';
import OfferFormaForm from './Forma';
import OfferInmuebleForm from './Inmueble';
import model from '../model';
import PreCredito from './PreCredito';
import OfferGeneralForm from './General';
import OfferClientForm from './Client';

export function Form({ project, preload, selector, onSubmit, dispatch }) {
  const { offer = {} } = selector;
  const [step, setStep] = useState(1);
  const [confirmes, setConfirmes] = useState({
    general: false,
    client: false,
    inmueble: false,
    forma: false,
  });
  const initialValues = model({ project, offer, preload });
  const canConfirm = !offer.OfertaID;
  const handleConfirm = (data, confirm) => {
    setConfirmes({
      ...confirmes,
      [data]: confirm,
    });
  };
  return (
    <>
      <OfferGeneralForm
        onConfirm={handleConfirm}
        preload={preload}
        offer={offer || {}}
      />
      <OfferClientForm
        onConfirm={handleConfirm}
        preload={preload}
        client={offer.Cliente}
        offer={offer}
      />
      <ExForm
        initialValues={initialValues}
        onSubmit={values =>
          step === 2 || values.OfertaID ? onSubmit(values) : setStep(step + 1)
        }
      >
        {form => (
          <>
            <OfferInmuebleForm
              onConfirm={handleConfirm}
              offer={offer}
              preload={preload}
              form={form}
            />

            <OfferFormaForm
              canConfirm={canConfirm}
              onConfirm={handleConfirm}
              offer={offer}
              preload={preload}
              form={form}
            />
            <PreCredito
              offer={offer}
              isConfirmed={
                !Object.keys(confirmes).find(confirm => !confirmes[confirm])
              }
              form={form}
              step={step}
              selector={selector}
              dispatch={dispatch}
            />
          </>
        )}
      </ExForm>
    </>
  );
}

Form.propTypes = {
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  selector: PropTypes.object,
  preload: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};

export default Form;
