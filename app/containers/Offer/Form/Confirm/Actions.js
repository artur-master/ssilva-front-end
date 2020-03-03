/**
 *
 * Offer Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { OFERTA_STATE } from 'containers/App/constants';
const SyncMessage = WithLoading();
export function OfferConfirmActions({
  entity,
  selector,
  onCancel,
  onConfirm,
  onEdit,
}) {
  const { loading } = selector;
  return (
    <>
      <div className="d-flex after-expands-2 align-items-center">
        {entity.OfertaState !== OFERTA_STATE[2] && (
          <div className="d-flex align-items-center after-expands-2 font-14-rem order-3">
            <div className="d-flex align-items-center mr-3 ">
              <div className="checkbox-01 checkbox-medium">
                <span>
                  <input
                    type="checkbox"
                    // onChange={evt => {
                    //   // onConfirm('client', evt.currentTarget.checked);
                    // }}
                  />
                </span>
              </div>
              <span>
                <b>Revisé y confirmo Oferta</b>
              </span>
            </div>

            <div className="d-flex align-items-center mr-3 order-3">
              <div className="checkbox-01 checkbox-medium">
                <span>
                  <input
                    type="checkbox"
                    // onChange={evt => {
                    //   // onConfirm('client', evt.currentTarget.checked);
                    // }}
                  />
                </span>
              </div>
              <span>
                <b>Contacté al cliente</b>
              </span>
            </div>

            <Button
              disabled={loading}
              className="order-3 m-btn mr-2"
              onClick={onConfirm}
            >
              Continuar
            </Button>
          </div>
        )}
        {entity.OfertaState === OFERTA_STATE[2] && (
          <Button className="order-3 m-btn  mr-2 m-btn-pen" onClick={onEdit}>
            Modificación
          </Button>
        )}
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
  entity: PropTypes.object,
  selector: PropTypes.object,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onEdit: PropTypes.func,
};

export default OfferConfirmActions;
