/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import RadioGroup from 'components/ExForm/RadioGroup';
import DocumentItem from '../DocumentItem';

export function Garantia({ entity, canUpload }) {
  return (
    <Box collapse isOpen>
      <BoxHeader>
        <b>PAGO DE GARANTÍA</b>
      </BoxHeader>
      <BoxContent>
        <div className="row m-0 w-50 border-bottom pb-2 d-none">
          <RadioGroup
            className="d-flex align-items-center col-auto p-0"
            name="Pay"
            options={[
              { label: 'Transferencia', value: 0 },
              { label: 'Cheque', value: 1 },
            ]}
          />
        </div>
        <DocumentItem
          documentoName="Transferencia/Cheque"
          documentoType="DocumentPagoGarantia"
          required
          Documentos={entity.Documents || {}}
          canUpload={canUpload}
          description="Debes subir el comprobante de transferencia/cheque"
        />
      </BoxContent>
    </Box>
  );
}

Garantia.propTypes = {
  canUpload: PropTypes.bool,
  entity: PropTypes.object,
};

export default Garantia;
