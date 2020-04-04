/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import DocumentCondition from '../Conditions';

export function CarpetaDigitalReviewActions({
  isReview,
  selector,
  onControlReview,
  form,
  entity,
}) {
  const { loading } = selector;
  const [withText, setWithText] = useState({ text: '', open: false });

  return (
    withText.open ? (
      <>
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
        <div className="d-flex py-3 after-expands-2 align-items-center">
          <Button
            disabled={loading}
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
          <Button
            disabled={loading}
            className="order-3 m-btn m-btn-white mr-2"
            onClick={() => setWithText({ text: '', open: false })}
          >
            Cancelar
          </Button>
        </div>
        {(entity && form.values && entity.Condition.length > 0 || form.values.Condition.length > 0) && ( 
          <div className="p-0">
            <DocumentCondition form={form} entity={entity} />
          </div>
         )}
      </>) : (
      <>
        <div className="d-flex py-3 after-expands-2 align-items-center">
          <Button
            className="order-3 m-btn mr-2"
            disabled={!isReview}
            onClick={() =>
              onControlReview({
                Comment: withText.text.trim(),
                Resolution: true,
              })
            }
          >
            Aprobar
          </Button>
            <Button
              disabled={loading}
              className="order-3 m-btn m-btn-white mr-2"
              onClick={() => setWithText({ text: '', open: true })}
            >
              Rechazar
          </Button>
        </div>
        {(entity && form.values && entity.Condition.length > 0 || form.values.Condition.length > 0) && ( 
          <div className="p-0">
            <DocumentCondition form={form} entity={entity} />
          </div>
         )}
          </>
        )
  );
}

CarpetaDigitalReviewActions.propTypes = {
  isReview: PropTypes.bool,
  selector: PropTypes.object,
  onControlReview: PropTypes.func,
  entity: PropTypes.object,
  form: PropTypes.object,
};

export default CarpetaDigitalReviewActions;
