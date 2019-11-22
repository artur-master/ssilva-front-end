/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import PhasePreCreditoForm from './Form';
import PhasePreCreditoView from './View';
const PhasePreCredito = ({
  isConfirmed,
  canEdit,
  step,
  initialValues,
  onContinue,
  dispatch,
}) => {
  if (!initialValues.ReservaID)
    return (
      <PhasePreCreditoForm
        isConfirmed={isConfirmed}
        initialValues={initialValues}
        step={step}
        dispatch={dispatch}
        onSubmit={onContinue}
      />
    );
  return (
    <PhasePreCreditoView
      initialValues={initialValues}
      canEdit={canEdit}
      onSubmit={onContinue}
    />
  );
};

PhasePreCredito.propTypes = {
  isConfirmed: PropTypes.bool,
  canEdit: PropTypes.bool,
  step: PropTypes.number,
  initialValues: PropTypes.object,
  onContinue: PropTypes.func,
  dispatch: PropTypes.func,
};
export default PhasePreCredito;
