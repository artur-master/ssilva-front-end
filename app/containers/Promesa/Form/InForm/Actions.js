/**
 *
 * Promesa Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { isAprobacionInmobiliariaState } from '../../helper';
const SyncMessage = WithLoading();
export function PromesaInFormActions({ selector, onCancel, onApprove }) {
  const { loading, promesa } = selector;
  const [Comment, setComment] = useState('');
  if (isAprobacionInmobiliariaState(promesa))
    return (
      <div className="d-flex after-expands-2 align-items-center">
        <Button
          disabled={loading}
          onClick={onCancel}
          className="order-3 m-btn"
          color="white"
        >
          Cerca
        </Button>
      </div>
    );

  return (
    <>
      <div className="d-flex after-expands-2 align-items-center">
        <Button
          disabled={loading}
          className="order-3 m-btn mr-2"
          onClick={() =>
            onApprove({
              Resolution: true,
            })
          }
        >
          Aprobar
        </Button>
        <Button
          disabled={loading}
          onClick={() =>
            onApprove({
              Resolution: false,
            })
          }
          className="order-3 m-btn"
          color="white"
        >
          Rechazar
        </Button>
      </div>
      <div className="mt-3">
        <span className="d-block font-14-rem">
          <b>Observaciones (En caso de Rechazo)</b>
        </span>
        <div className="pt-2">
          <textarea
            className="w-100 d-block rounded-lg shadow-sm"
            rows="5"
            onChange={evt => setComment(evt.target.value)}
          />
        </div>
      </div>
      <div className="d-flex after-expands-2 align-items-center">
        <Button
          disabled={loading}
          onClick={() =>
            onApprove({
              Resolution: false,
              Comment,
            })
          }
          className="order-3 m-btn mt-3"
        >
          Rechazar
        </Button>
      </div>
      <SyncMessage {...selector} />
    </>
  );
}

PromesaInFormActions.propTypes = {
  selector: PropTypes.object,
  onCancel: PropTypes.func,
  onApprove: PropTypes.func,
};

export default PromesaInFormActions;
