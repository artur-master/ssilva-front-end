/**
 *
 * Offer Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { PROMESA_STATE } from 'containers/App/constants';
import { UserProject } from 'containers/Project/helper';
import PhaseObservation from '../../Observation';

export function PromesaObservation({ entity, onChange }) {
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

  return (
    <PhaseObservation entity={entity} isReview={isReview} onChange={onChange} />
  );
}

PromesaObservation.propTypes = {
  entity: PropTypes.object,
  onChange: PropTypes.func,
};

export default PromesaObservation;
