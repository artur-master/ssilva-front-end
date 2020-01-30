/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'components/ExForm';
import { PROMESA_STATE } from 'containers/App/constants';

export function PhaseTimelineFacturaPromesa({ isPending }) {
  return (
    <div className="mt-4">
      <div className="row m-0 p-0 mb-3">
        <div className="col-lg-6 border-bottom p-0 pb-2 d-flex align-items-center">
          <span className="font-16-rem">
            <strong>Generar Factura (FI)</strong>
          </span>
        </div>
      </div>
      <FormGroup>
        {isPending && PROMESA_STATE[3]}
        {!isPending && 'Factura'}
      </FormGroup>
    </div>
  );
}

PhaseTimelineFacturaPromesa.propTypes = {
  canEdit: PropTypes.bool,
  isPending: PropTypes.bool,
  entity: PropTypes.object,
};

export default PhaseTimelineFacturaPromesa;
