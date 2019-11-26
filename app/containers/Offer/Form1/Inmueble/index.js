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
import { inmuebleLabel } from 'containers/Common/Inmueble/helper';
import InmuebleForm from './InmuebleForm';
import { canConfirmOffer, canEditOffer } from '../helper';

export function OfferInmuebleForm({ offer, onConfirm, preload, form }) {
  const { values, setFieldValue } = form;
  const [isOpen, setOpen] = useState(false);
  const { total, discount } = calculates(values);
  const canEdit = canEditOffer(offer);
  const canConfirm = canConfirmOffer(offer);
  return (
    <Box collapse isOpen={false}>
      <BoxHeader>
        <b>DATOS INMUEBLE</b>
        {canConfirm && (
          <div className="d-flex align-items-center mr-3 order-3">
            <div className="checkbox-01 checkbox-medium">
              <span>
                <input
                  type="checkbox"
                  onChange={evt => {
                    onConfirm('inmueble', evt.currentTarget.checked);
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
        <table className="table table-responsive-sm table-summary">
          <tbody>
            {values.Inmuebles &&
              values.Inmuebles.map(inmueble => (
                <tr key={inmueble.InmuebleID}>
                  <td className="expand">{inmuebleLabel(inmueble)}</td>
                  <td className="sub-table">
                    <dl>
                      <dt>
                        <b>Valor UF</b>
                      </dt>
                      <dd>
                        <b>
                          <FormattedNumber value={inmueble.Price} />
                        </b>
                      </dd>

                      <dt>Descuentos UF</dt>
                      <dd>
                        <b>
                          <FormattedNumber
                            value={
                              ((inmueble.Discount || 0) / 100) * inmueble.Price
                            }
                          />
                        </b>
                      </dd>
                    </dl>
                  </td>
                </tr>
              ))}

            <tr className="resume">
              <td className="expand" />
              <td className="sub-table">
                <dl>
                  <dt>Valor Total UF</dt>
                  <dd>
                    <b>
                      <FormattedNumber value={total} />
                    </b>
                  </dd>
                  <dt>Total Descuentos UF</dt>
                  <dd>
                    <b>
                      {discount > 0 && `-`}
                      <FormattedNumber value={discount} />
                    </b>
                  </dd>
                  <dt>
                    <b>Valor Final UF</b>
                  </dt>
                  <dd>
                    <b>
                      <FormattedNumber value={total - discount} />
                    </b>
                  </dd>
                </dl>
              </td>
            </tr>
          </tbody>
        </table>
      </BoxContent>
      <InmuebleForm
        onSelectInmuebles={inmuebles => setFieldValue('Inmuebles', inmuebles)}
        preload={preload}
        values={values}
        onHide={() => setOpen(false)}
        isOpen={isOpen}
      />
    </Box>
  );
}

OfferInmuebleForm.propTypes = {
  offer: PropTypes.object,
  form: PropTypes.object,
  preload: PropTypes.object,
  onConfirm: PropTypes.func,
};

export default OfferInmuebleForm;
