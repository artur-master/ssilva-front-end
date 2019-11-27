/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import PhasePreCreditoForm from './Form';
import PhasePreCreditoView from './View';
const PhasePreCredito = ({
  isCollapse,
  isConfirmed,
  canEdit,
  step,
  initialValues,
  onContinue,
  dispatch,
  showScreen,
}) => {
  if (showScreen === 'form')
    return (
      <PhasePreCreditoForm
        isCollapse={isCollapse}
        isConfirmed={isConfirmed}
        initialValues={initialValues}
        step={step}
        dispatch={dispatch}
        onSubmit={onContinue}
      />
    );
  return (
    <PhasePreCreditoView
      isCollapse={isCollapse}
      initialValues={initialValues}
      canEdit={canEdit}
      onSubmit={onContinue}
    />
  );
};

PhasePreCredito.propTypes = {
  isCollapse: PropTypes.bool,
  isConfirmed: PropTypes.bool,
  showScreen: PropTypes.string,
  canEdit: PropTypes.bool,
  step: PropTypes.number,
  initialValues: PropTypes.object,
  onContinue: PropTypes.func,
  dispatch: PropTypes.func,
};
export default PhasePreCredito;
