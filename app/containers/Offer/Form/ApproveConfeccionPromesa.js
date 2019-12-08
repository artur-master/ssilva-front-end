/**
 *
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

export function ApproveConfeccionPromesa({ selector, onControl, onEdit }) {
  const { loading } = selector;

  return (
    <div className="d-flex after-expands-2 align-items-center">
      <Button
        disabled={loading}
        className="order-3 m-btn m-btn-white mr-2 m-btn-pen"
        onClick={onEdit}
      >
        Modificación
      </Button>
      <Button
        className="order-3 m-btn"
        type="submit"
        disabled={loading}
        onClick={() =>
          onControl({
            Comment: '',
            Resolution: true,
          })
        }
      >
        Aprobar
      </Button>
    </div>
  );
}

ApproveConfeccionPromesa.propTypes = {
  selector: PropTypes.object,
  onControl: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ApproveConfeccionPromesa;
