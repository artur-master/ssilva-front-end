/**
 *
 * Promesa Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'components/Alert';
import { isAprobacionInmobiliariaState } from '../../helper';

export function PromesaInFormObservation({ entity }) {
  const { Condition = [] } = entity;
  return (
    <>
      {Condition.find(condition => condition.IsImportant) &&
        (!isAprobacionInmobiliariaState(entity) && (
          <Alert type="warning">
            Revisar todas las condiciones importantes para aprobar promesa
          </Alert>
        ))}
      {Condition.map(condition => (
        <Alert
          type={condition.IsImportant ? 'danger' : 'default'}
          key={condition.ConditionID}
          icon="alert"
        >
          {condition.Description}
        </Alert>
      ))}
    </>
  );
}

PromesaInFormObservation.propTypes = {
  entity: PropTypes.object,
};

export default PromesaInFormObservation;
