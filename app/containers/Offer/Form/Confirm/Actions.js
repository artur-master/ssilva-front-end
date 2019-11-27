/**
 *
 * Offer Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
const SyncMessage = WithLoading();
export function OfferConfirmActions({ selector, onCancel, onConfirm }) {
  const { loading } = selector;
  return (
    <>
      <div className="d-flex after-expands-2 align-items-center">
        <Button
          disabled={loading}
          className="order-3 m-btn mr-2"
          onClick={onConfirm}
        >
          Confirmar
        </Button>
        <Button
          disabled={loading}
          onClick={onCancel}
          className="order-3 m-btn mr-2"
          color="white"
        >
          Cancerlar
        </Button>
      </div>
      <SyncMessage {...selector} />
    </>
  );
}

OfferConfirmActions.propTypes = {
  selector: PropTypes.object,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default OfferConfirmActions;
