/**
 *
 * Offer Upload Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BoxFooter } from 'components/Box';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import CarpetaDigitalCondition from './Conditions';

const SyncMessage = WithLoading();

export function CarpetaDigitalUploadActions({
  selector,
  offer,
  form,
  onCancel,
}) {
  const { loading } = selector;
  const [withText, setWithText] = useState('');
  const { values, setFieldValue } = form;

  return (
    <>
      <BoxFooter className="d-flex after-expands-2 align-items-center">
        <span className="order-1 font-14-rem">
          <b>RESERVA |</b> Paso 3 de 3
        </span>
        <Button disabled={loading} className="order-3 m-btn mr-2" type="submit">
          Ofertar
        </Button>
        <Button
          disabled={loading}
          className="order-3 m-btn m-btn-white m-btn-plus mr-2"
          onClick={() => {
            setWithText('reserva');
          }}
        >
          Agregar Observación
        </Button>
        <Button
          disabled={loading}
          className="order-3 m-btn m-btn-white mr-2"
          onClick={() => {
            setWithText('cancel');
          }}
        >
          Cancelar Oferta
        </Button>
      </BoxFooter>
      <SyncMessage {...selector} />

      {withText === 'reserva' && (
        <>
          <div className="p-3 mt-2">
            <span className="d-block font-14-rem">
              <b>Nueva Condition</b>
            </span>
            <div className="pt-2">
              <textarea
                className="w-100 d-block rounded-lg shadow-sm"
                rows="5"
                onChange={evt => {
                  setFieldValue('Condition', evt.target.value);
                }}
              />
            </div>
          </div>

          {offer.Condition && (
            <CarpetaDigitalCondition conditions={offer.Condition} />
          )}
          <div className="px-3 py-3 text-right">
            <Button className="m-btn" type="submit" disabled={loading}>
              Ofertar con Observaciones
            </Button>
          </div>
        </>
      )}
      {withText === 'cancel' && (
        <>
          <div className="p-3 mt-2">
            <span className="d-block font-14-rem">
              <b>Comentarios (En caso de Cancelar Oferta)</b>
            </span>
            <div className="pt-2">
              <textarea
                className="w-100 d-block rounded-lg shadow-sm"
                rows="5"
                onChange={evt => {
                  setFieldValue('Comment', evt.target.value);
                }}
              />
            </div>
          </div>

          <div className="px-3 py-3 text-right">
            <Button
              disabled={loading}
              className="m-btn"
              onClick={() => {
                onCancel(values);
              }}
            >
              Cancelar Oferta
            </Button>
          </div>
        </>
      )}
    </>
  );
}

CarpetaDigitalUploadActions.propTypes = {
  form: PropTypes.object,
  selector: PropTypes.object,
  offer: PropTypes.object,
  onCancel: PropTypes.func,
};

export default CarpetaDigitalUploadActions;
