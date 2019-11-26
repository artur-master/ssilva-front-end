/**
 *
 * Offer Upload Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BoxFooter } from 'components/Box';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
const SyncMessage = WithLoading();

export function CarpetaDigitalReviewActions({
  isReview,
  selector,
  onControlReview,
}) {
  const { loading } = selector;
  const [withText, setWithText] = useState('');
  const [comment, setComment] = useState('');

  return (
    <>
      <BoxFooter className="d-flex after-expands-2 align-items-center">
        <Button
          className="order-3 m-btn mr-2"
          type="submit"
          disabled={!isReview}
          onClick={() => {
            onControlReview(true);
          }}
        >
          Aprobar
        </Button>
        <Button
          className="order-3 m-btn m-btn-white m-btn-plus mr-2"
          disabled={!isReview}
          onClick={() => {
            if (isReview) setWithText('comment');
          }}
        >
          Agregar Comentarios
        </Button>
        <Button
          disabled={!isReview}
          className="order-3 m-btn m-btn-white mr-2"
          onClick={() => {
            onControlReview(false);
          }}
        >
          Rechazar
        </Button>
      </BoxFooter>
      <SyncMessage {...selector} />

      {withText === 'comment' && (
        <>
          <div className="p-3 mt-2">
            <span className="d-block font-14-rem">
              <b>Comentarios</b>
            </span>
            <div className="pt-2">
              <textarea
                className="w-100 d-block rounded-lg shadow-sm"
                rows="5"
                onChange={evt => {
                  setComment(evt.target.value);
                }}
              />
            </div>
          </div>
          <div className="px-3 py-3 text-right">
            <Button
              className="m-btn"
              onClick={() => {
                onControlReview(true, comment);
              }}
              disabled={loading}
            >
              Aprobar con Observaciones
            </Button>
          </div>
        </>
      )}
    </>
  );
}

CarpetaDigitalReviewActions.propTypes = {
  isReview: PropTypes.bool,
  selector: PropTypes.object,
  onControlReview: PropTypes.func,
};

export default CarpetaDigitalReviewActions;
