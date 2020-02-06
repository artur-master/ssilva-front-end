/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, Label, Field} from 'components/ExForm';
import {PROMESA_STATE} from 'containers/App/constants';
import Button from "components/Button";

export function PhaseTimelineFacturaPromesa({
  canEdit,
  isPending,
  selector,
  entity,
  onSubmit,
}) {
  return (
    <Form
      initialValues={{ DateEnvio: entity.DateEnvio || '' }}
      onSubmit={onSubmit}
    >
      {() => (
        <div className="mt-4">
          <div className="row m-0 p-0 mb-3">
            <div className="col-lg-6 border-bottom p-0 pb-2 d-flex align-items-center">
              <span className="font-16-rem">
                <strong>Generar Factura</strong>
              </span>
            </div>
          </div>
          <FormGroup>
            {!canEdit && isPending && PROMESA_STATE[3]}
            {(canEdit || !isPending) && (
              <FormGroup>
                <Label style={{width: '15em'}} className="pt-1">
              Fecha Envio Factura
                </Label>
                {canEdit && (
              <>
                <Field type="datepicker" required name="DateEnvio"/>
                <div className="ml-3">
                  <Button disabled={selector.loading} type="submit">
                    Aceptar
                  </Button>
                </div>
              </>
                )}
              </FormGroup>
            )}
          </FormGroup>
        </div>
      )}
    </Form>
  );
}

PhaseTimelineFacturaPromesa.propTypes = {
  canEdit: PropTypes.bool,
  isPending: PropTypes.bool,
  selector: PropTypes.object,
  entity: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default PhaseTimelineFacturaPromesa;
