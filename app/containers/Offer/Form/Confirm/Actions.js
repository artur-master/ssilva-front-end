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
import DocumentCondition from 'containers/Phases/Conditions';

const SyncMessage = WithLoading();
export function OfferConfirmActions({
  entity,
  selector,
  onCancel,
  onConfirm,
  onEdit,
  onDelete,
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
                  {/* eslint-disable-next-line */}
                  <label />
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
                  {/* eslint-disable-next-line */}
                  <label />
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
        <Button
          disabled={loading}
          className="order-3 m-btn m-btn-white m-btn-plus mr-2"
          // onClick={() => {            
          //   const { Condition = [] } = form.values;
          //   Condition.push({ Description: '' });
          //   form.setFieldValue('Condition', Condition);
          // }}
        >
          Agregar Observación
        </Button>
        <Button
          disabled={loading}
          onClick={onDelete}
          className="order-3 m-btn"
          color="white"
        >
          Rechazar
        </Button>
      </div>
      {(entity && entity.Condition.length > 0) && ( 
        <div className="p-0">
          <DocumentCondition entity={entity} />
        </div>
      )}
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
  onDelete: PropTypes.func,
};

export default OfferConfirmActions;
