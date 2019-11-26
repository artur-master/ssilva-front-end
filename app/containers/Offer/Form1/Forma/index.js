/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Offer Inmueble Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import Button from 'components/Button';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import { formatNumber } from 'containers/App/helpers';
import FormaDePagoView from 'containers/Phases/FormaDePago/View';
import { canConfirmOffer, canEditOffer } from '../helper';
import FormaForm from './FormaForm';

export function OfferFormaForm({ offer, onConfirm, preload, form }) {
  const [isOpen, setOpen] = useState(false);
  const { values } = form;
  const canEdit = canEditOffer(offer);
  const canConfirm = canConfirmOffer(offer);
  const { total, discount, balance, moneyErr } = calculates(values);
  return (
    <Box collapse isOpen={false}>
      <BoxHeader className={moneyErr ? 'background-color-warning' : ''}>
        <b>FORMA DE PAGO VALOR FINAL UF</b>
        <span className="order-1 mx-4 font-21">
          <b>
            <FormattedNumber value={total - discount} />
          </b>
        </span>
        {moneyErr && (
          <span className="font-14-rem order-3 mr-3">
            <i className="icon icon-alert color-warning" />
            <b>La diferencia es de: {formatNumber(balance)}</b>
          </span>
        )}
        {canConfirm && !moneyErr && (
          <div className="d-flex align-items-center mr-3 order-3">
            <div className="checkbox-01 checkbox-medium">
              <span>
                <input
                  type="checkbox"
                  onChange={evt => {
                    onConfirm('forma', evt.currentTarget.checked);
                  }}
                />
                <label />
              </span>
            </div>
            <span>
              <b>Confirmar</b>
            </span>
          </div>
        )}
        {canEdit && (
          <Button
            color="white"
            className="m-btn-pen order-3"
            onClick={() => setOpen(true)}
          >
            Editar
          </Button>
        )}
      </BoxHeader>
      <BoxContent>
        <FormaDePagoView values={offer} />
      </BoxContent>
      <FormaForm
        preload={preload}
        form={form}
        onHide={() => setOpen(false)}
        isOpen={isOpen}
      />
    </Box>
  );
}

OfferFormaForm.propTypes = {
  offer: PropTypes.object,
  form: PropTypes.object,
  preload: PropTypes.object,
  onConfirm: PropTypes.func,
};

export default OfferFormaForm;
