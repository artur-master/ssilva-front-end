/**
 *
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

export function FormActions({ onCancel, onWithdraw, canWithdraw=false }) {
  return (
    <div className="d-flex after-expands-2 align-items-center">
      {canWithdraw && (
        <Button className="order-3 m-btn-warning-02 d-inline" onClick={onWithdraw}>
          Desistimiento
        </Button>
      )}
      <Button
        className="order-3 m-btn m-btn-white"
        type="submit"
        onClick={onCancel}
      >
        Cancelar
      </Button>
    </div>
  );
}

FormActions.propTypes = {
  onCancel: PropTypes.func,
  canWithdraw: PropTypes.bool,
  onWithdraw: PropTypes.func,
};

export default FormActions;
