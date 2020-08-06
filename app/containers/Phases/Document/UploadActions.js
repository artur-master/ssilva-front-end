/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Auth } from 'containers/App/helpers';
import DocumentCondition from '../Conditions';
import { canSendToControl } from 'containers/Reservation/Form/helper';

export function CarpetaDigitalUploadActions({
  entity,
  selector,
  form,
  onSave,
  onCancel,
  onSendControl,
}) {
  const { loading } = selector;
  const [withText, setWithText] = useState({ text: '', open: false });
  const { values } = form;
  const [canUpload, setCanUpload] = useState(false);
  
  const canStC = canSendToControl(entity.Documents);

  useEffect(() => {
    setCanUpload(true);
  }, [values]);

  useEffect(() => {
    setCanUpload(false);
  }, []);

  return (
    <>
      <div className="d-flex py-3 after-expands-2 align-items-center">
        <span className="order-1 font-14-rem">
          <b>RESERVA |</b> Paso 3 de 3
        </span>
        <Button
          disabled={!canUpload ? true : loading}
          className="order-3 m-btn mr-2"
          onClick={() => {
            form.values.Condition.push(...entity.Condition);
            onSave(form.values);
            setCanUpload(false);
          }}
        >
          { entity.ReservaID ? 'Guardar': 'Crear Reserva' }
        </Button>
        {(Auth.isPM() || Auth.isVendor()) && (
          <Button
            onClick={() => {
              form.values.Condition.push(...entity.Condition);
              onSendControl(form.values);
            }}
            className="order-3 m-btn mr-2"
            disabled={!canStC ? true : loading}
          >
            Enviar a Control
          </Button>
        )}
        <Button
          disabled={loading}
          className="order-3 m-btn m-btn-white m-btn-plus mr-2"
          onClick={() => {            
            const { Condition = [] } = form.values;
            Condition.push({ Description: '' });
            form.setFieldValue('Condition', Condition);
          }}
        >
          Agregar Observación
        </Button>
        {!entity.ReservaID && (
          <Button
            disabled={loading}
            className="order-3 m-btn m-btn-white"
            onClick={evt => {
              evt.preventDefault();
              onCancel();
            }}
          >
            Cancelar
          </Button>
        )}
        {entity.ReservaID && Auth.isPM() && (
          <Button
            disabled={loading}
            className="order-3 m-btn m-btn-white"
            onClick={() => {
              setWithText({ ...withText, open: true });
            }}
          >
            Cancelar Reserva
          </Button>
        )}
      </div>
        {(entity && values && entity.Condition.length > 0 || values.Condition.length > 0) && ( 
          <div className="p-0">
            <DocumentCondition form={form} entity={entity} />
          </div>
        )}
      {withText.open && (
        <>
          <div className="mt-3">
            <span className="d-block font-14-rem">
              <b>Comentarios (En caso de Cancelar Reserva)</b>
            </span>
            <div className="pt-2">
              <textarea
                className="w-100 d-block rounded-lg shadow-sm"
                rows="5"
                onChange={evt =>
                  setWithText({ ...withText, text: evt.target.value })
                }
              />
            </div>
          </div>

          <div className="py-3 text-right">
            <Button
              disabled={loading}
              className="m-btn"
              onClick={() => onCancel(withText.text)}
            >
              Cancelar Reserva
            </Button>
          </div>
        </>
      )}
    </>
  );
}

CarpetaDigitalUploadActions.propTypes = {
  form: PropTypes.object,
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onSendControl: PropTypes.func,
};

export default CarpetaDigitalUploadActions;
