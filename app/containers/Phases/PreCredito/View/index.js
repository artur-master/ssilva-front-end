/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Button from 'components/Button';
import { Form as ExForm } from 'components/ExForm';
import { isContadoPayment } from 'containers/App/helpers';
import Labor from './Labor';
import Codeudor from './Codeudor';
import Patrimony from './Patrimony';
import Renta from './Renta';
import PhasePreCreditoFormModal from '../Form/modal';
const PhasePreCreditoView = ({
  isCollapse,
  canEdit,
  initialValues,
  onSubmit,
}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ExForm initialValues={initialValues} onSubmit={onSubmit}>
        {form => {
          const { values } = form;
          const isContado = isContadoPayment(values.PayType);
          return (
            <>
              <Box collapse isOpen={values.ReservaID || isCollapse}>
                <BoxHeader>
                  <b>PRE APROBACIÓN DE CRÉDITO</b>
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
                      <Labor values={values} group="Cliente" />
                      <Renta group="Cliente" form={form} />
                      {values.Codeudor && (
                        <Codeudor
                          form={form}
                          removeCodeudor={evt => {
                            evt.preventDefault();
                            form.setFieldValue('Codeudor', null);
                            form.setFieldValue('CodeudorID', null);
                            form.setFieldValue('CoEmpleador', null);
                          }}
                        />
                      )}
                    </>
                  )}
                  <Patrimony form={form} />
                </BoxContent>
              </Box>
            </>
          );
        }}
      </ExForm>
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
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};
export default PhasePreCreditoView;
