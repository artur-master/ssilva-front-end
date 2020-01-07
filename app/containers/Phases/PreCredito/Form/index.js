/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Button from 'components/Button';
import { Form as ExForm } from 'components/ExForm';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import { isContadoPayment } from 'containers/App/helpers';
import Labor from './Labor';
import Codeudor from './Codeudor';
import Patrimony from './Patrimony';
import Renta from './Renta';
import Summary from './Summary';
import { calculateRenta } from '../helper';
const PhasePreCreditoForm = ({
  isConfirmed,
  step,
  initialValues,
  onSubmit,
  dispatch,
}) => (
  <ExForm initialValues={initialValues} onSubmit={onSubmit}>
    {form => {
      const { values, submitForm } = form;
      const isContado = isContadoPayment(values.PayType);
      let moneyErr = false;
      if (!isContado) {
        const { SumRenta } = calculateRenta(values);
        const { total, discount } = calculates(values);
        moneyErr = Math.floor(total - discount) >= SumRenta;
      }
      return (
        <>
          <Box collapse isOpen={!values.ReservaID}>
            <BoxHeader>
              <b>PRE APROBACIÓN DE CRÉDITO</b>
            </BoxHeader>
            <BoxContent>
              <div className="container-content bg-white pl-3 pr-3 pb-3">
                {!isContado && (
                  <>
                    <article className="person-record pt-3">
                      <Labor values={values} group="Cliente" />
                      <Renta group="Cliente" form={form} />
                    </article>
                    {values.Codeudor && (
                      <Codeudor
                        form={form}
                        removeCodeudor={evt => {
                          evt.preventDefault();
                          form.setFieldValue('Codeudor', null);
                          form.setFieldValue('CodeudorID', null);
                          form.setFieldValue('CoEmpleador', null);
                        }}
                      />
                    )}
                  </>
                )}
                {(step > 1 || values.ReservaID) && <Patrimony form={form} />}
              </div>
            </BoxContent>
            {values.Codeudor && <Summary form={form} />}
          </Box>
          {step < 3 && (
            <div className="p-3 d-flex align-items-center after-expands-2">
              <span className="order-1 font-14-rem">
                <b>RESERVA </b>| Paso {step} de 3
              </span>
              <Button
                disabled={moneyErr || !isConfirmed}
                className="order-3"
                onClick={evt => {
                  evt.preventDefault();
                  submitForm();
                }}
              >
                {`${
                  step === 2 ? 'Continuar' : 'Continuar y Agregar Patrimonio'
                }`}
              </Button>

              <Button
                onClick={evt => {
                  evt.preventDefault();
                  dispatch(
                    push(`/proyectos/${values.ProyectoID}/cotizaciones`),
                  );
                }}
                className="order-3"
                color="white"
              >
                Cancelar
              </Button>
            </div>
          )}
        </>
      );
    }}
  </ExForm>
);

PhasePreCreditoForm.propTypes = {
  isCollapse: PropTypes.bool,
  isConfirmed: PropTypes.bool,
  step: PropTypes.number,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func,
};
export default PhasePreCreditoForm;
