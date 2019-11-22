/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

export function CarpetaDigitalReviewActions({
  isReview,
  selector,
  onControlReview,
}) {
  const { loading } = selector;
  const [withText, setWithText] = useState({ text: '', open: false });

  return (
    <>
      {withText.open && (
        <div className="py-3">
          <span className="d-block font-14-rem">
            <b>Comentarios</b>
          </span>
          <div className="pt-2">
            <textarea
              className="w-100 d-block rounded-lg shadow-sm"
              rows="5"
              onChange={evt =>
                setWithText({ ...withText, text: evt.currentTarget.value })
              }
            />
          </div>
        </div>
      )}
      <div className="d-flex py-3 after-expands-2 align-items-center">
        <Button
          className="order-3 m-btn mr-2"
          type="submit"
          disabled={!isReview || loading}
          onClick={() =>
            onControlReview({
              Comment: withText.text.trim(),
              Resolution: true,
            })
          }
        >
          Aprobar
        </Button>
        {!withText.open && (
          <Button
            className="order-3 m-btn m-btn-white mr-2 m-btn-plus"
            disabled={!isReview}
            onClick={() => setWithText({ ...withText, open: true })}
          >
            Agregar Comentarios
          </Button>
        )}
        <Button
          disabled={!isReview || loading}
          className="order-3 m-btn m-btn-white mr-2"
          onClick={() =>
            onControlReview({
              Comment: withText.text.trim(),
              Resolution: false,
            })
          }
        >
          Rechazar
        </Button>
      </div>
    </>
  );
}

CarpetaDigitalReviewActions.propTypes = {
  isReview: PropTypes.bool,
  selector: PropTypes.object,
  onControlReview: PropTypes.func,
};

export default CarpetaDigitalReviewActions;
