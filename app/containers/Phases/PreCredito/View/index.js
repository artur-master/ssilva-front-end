/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Button from 'components/Button';
import { isContadoPayment, isCreditPayment } from 'containers/App/helpers';
import Labor from './Labor';
import Codeudor from './Codeudor';
import Patrimony from './Patrimony';
import Renta from './Renta';
import PhasePreCreditoFormModal from '../Form/modal';
import PhaseCredit from '../Credit';
import { calculateRenta, isValidLabor } from '../helper';

const PhasePreCreditoView = ({
  isCollapse,
  canEdit,
  canEditCredit,
  initialValues,
  onSubmit,
}) => {
  const [isOpen, setOpen] = useState(false);
  const isContado = isContadoPayment(initialValues.PayType);
  const isCredit = isCreditPayment(initialValues.PayType);
  const isValid = isValidLabor(initialValues);
  const { moneyErr } = calculateRenta(initialValues);
  return (
    <>
      {isCredit && (
        <Box collapse isOpen={!!initialValues.ReservaID || isCollapse}>
          <BoxHeader
            className={!isValid || moneyErr ? 'background-color-warning' : ''}
          >
            <b>PRE APROBACIÓN DE CRÉDITO</b>
            {!isValid && (
              <span className="font-14-rem order-3 mr-3">
                <i className="icon icon-alert color-warning" />
                <b>Faltan Datos</b>
              </span>
            )}
            {isValid && moneyErr && (
              <span className="font-14-rem order-3 mr-3">
                <i className="icon icon-alert color-warning" />
                <b>La Renta no es Suficiente</b>
              </span>
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
          <BoxContent className="p-0">
            {!isContado && (
              <>
                <Labor values={initialValues} group="Cliente" />
                <Renta group="Cliente" values={initialValues} />
                {initialValues.Codeudor && <Codeudor values={initialValues} />}
              </>
            )}
            <Patrimony values={initialValues} />
            {(initialValues.OfertaID || initialValues.PromesaID) && (
              <PhaseCredit
                canEdit={canEditCredit}
                EntityID={initialValues.OfertaID}
                PayType={initialValues.PayType}
              />
            )}
          </BoxContent>
        </Box>
      )}
      <PhasePreCreditoFormModal
        isOpen={isOpen}
        initialValues={initialValues}
        onHide={() => setOpen(false)}
        onSubmit={values => {
          setOpen(false);
          onSubmit(values);
        }}
      />
    </>
  );
};

PhasePreCreditoView.propTypes = {
  isCollapse: PropTypes.bool,
  canEdit: PropTypes.bool,
  canEditCredit: PropTypes.bool,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};
export default PhasePreCreditoView;
