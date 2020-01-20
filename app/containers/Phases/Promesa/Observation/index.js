/**
 *
 * Offer Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'components/Alert';
import { PROMESA_STATE } from 'containers/App/constants';
import { UserProject } from 'containers/Project/helper';

export function PromesaObservation({ entity, onChange }) {
  const { Condition = [] } = entity;
  const isReview =
    entity.PromesaState === PROMESA_STATE[13] && UserProject.isPM();

  if (
    (entity.PromesaState !== PROMESA_STATE[13] &&
      entity.PromesaState !== PROMESA_STATE[14]) ||
    entity.Condition.length < 1 ||
    (!UserProject.isPM() &&
      !UserProject.isVendor() &&
      !UserProject.isInmobiliario())
  )
    return null;

  if (isReview)
    return (
      <>
        {Condition.length > 0 && (
          <Alert type="warning">
            Debes seleccionar las observaciones importantes
          </Alert>
        )}
        {Condition.map((condition, index) => {
          if (condition.IsApprove) return null;
          return (
            <Alert
              onChange={isChecked => {
                Condition[index] = { ...condition, IsImportant: isChecked };
                onChange(Condition);
              }}
              key={condition.ConditionID}
              checked={condition.IsImportant && !condition.IsApprove}
            >
              {condition.Description}
            </Alert>
          );
        })}
      </>
    );
  return Condition.map(condition => (
    <Alert
      type={condition.IsImportant ? 'danger' : 'default'}
      key={condition.ConditionID}
      icon={condition.IsApprove ? 'check' : 'alert'}
    >
      {condition.Description}
    </Alert>
  ));
}

PromesaObservation.propTypes = {
  entity: PropTypes.object,
  onChange: PropTypes.func,
};

export default PromesaObservation;
