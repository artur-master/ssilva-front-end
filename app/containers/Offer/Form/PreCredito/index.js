/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import WithLoading from 'components/WithLoading';
import Labor from './Labor';
import Codeudor from './Codeudor';
import RentaSummary from './RentaSummary';
import Patrimony from './Patrimony';
import Renta from './Renta';
import Summary from './Summary';
import { calculateRenta, canEditOffer } from '../helper';
const SyncMessage = WithLoading();
const PreCredito = ({ offer, isConfirmed, step, form, selector, dispatch }) => {
  const canEdit = canEditOffer(offer);
  const { loading, ...restSelector } = selector;
  const { values, setFieldValue, submitForm } = form;
  const { SumRenta } = calculateRenta(values);
  const { total, discount } = calculates(values);
  const moneyErr = Math.floor(total - discount) >= SumRenta;
  return (
    <>
      <Box collapse isOpen={!values.OfertaID}>
        <BoxHeader>
          <b>PRE APROBACIÓN DE CRÉDITO</b>
        </BoxHeader>
        <BoxContent>
          <div className="container-content bg-white pl-3 pr-3 pb-3">
            <article className="person-record pt-3">
              <Labor values={values} group="Cliente" />
              <Renta group="Cliente" />
            </article>
            <RentaSummary
              form={form}
              addCodeudor={evt => {
                evt.preventDefault();
                setFieldValue('Codeudor', {
                  Extra: {
                    Values: {
                      Honoraries: '',
                    },
                    Independent: false,
                  },
                });
              }}
              canAddCodeudor={!values.Codeudor && !values.Cliente.IsCompany}
            />
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
            {(step > 1 || values.OfertaID) && <Patrimony form={form} />}
          </div>
        </BoxContent>
        {values.Codeudor && <Summary form={form} />}
        {!values.OfertaID && (
          <BoxFooter>
            <div className="p-2 d-flex align-items-center after-expands-2">
              <span className="order-1 font-14-rem">
                <b>RESERVA </b>| Paso {step} de 3
              </span>
              <Button
                disabled={moneyErr || !isConfirmed}
                loading={loading}
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
                disabled={loading}
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
          </BoxFooter>
        )}
      </Box>
      {canEdit && values.OfertaID && (
        <div className="p-2 mt-2 d-flex align-items-center after-expands-2">
          <Button
            disabled={moneyErr}
            loading={loading}
            className="order-3"
            onClick={evt => {
              evt.preventDefault();
              submitForm();
            }}
          >
            Guarda
          </Button>
        </div>
      )}
      <SyncMessage {...restSelector} />
    </>
  );
};

PreCredito.propTypes = {
  offer: PropTypes.object,
  isConfirmed: PropTypes.bool,
  step: PropTypes.number,
  form: PropTypes.object,
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};
export default PreCredito;
