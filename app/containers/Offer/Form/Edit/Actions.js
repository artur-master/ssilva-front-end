/**
 *
 * Reservation Doc Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import DeleteConfirm from './DeleteConfirm';
import { isValidData } from '../../helper';

const SyncMessage = WithLoading();

export function OfferEditActions({ selector, onCancel, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="py-3 d-flex justify-content-end">
        <Button
          disabled={selector.loading}
          className="m-btn-warning-02 m-btn-alert"
          onClick={() => setIsOpen(true)}
        >
          Dar de Baja la Oferta
        </Button>
        <Button disabled={selector.loading}>Guardar Cambios</Button>
        <Button onClick={onCancel} color="white">
          Cancelar
        </Button>
      </div>
      <div className="mt-3">
        <SyncMessage {...selector} />
      </div>
      <DeleteConfirm
        isOpen={isOpen}
        onHide={() => setIsOpen(false)}
        onConfirm={() => {
          setIsOpen(false);
          onDelete();
        }}
        selector={selector}
      />
    </>
  );
}

OfferEditActions.propTypes = {
  selector: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

export default OfferEditActions;
