/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { getFileName } from 'containers/App/helpers';

const SyncMassage = WithLoading();

export function PhaseReviewNegociacionPromesa({
  selector,
  entity,
  onSubmit,
  onCancel,
}) {
  return (
    <>
      <Box>
        <BoxHeader>
          <b>PROMESA</b>
        </BoxHeader>
        <BoxContent>
          <div className="d-flex align-items-center">
            <span className="font-14-rem mr-3">Promesa</span>
            <span className="font-14-rem mx-2">
              {getFileName(entity.DocumentPromesa)}
            </span>
            <Link
              to={entity.DocumentPromesa}
              target="_blank"
              download
              className="font-14-rem mx-2 btn-arrow"
            >
              <b>Ver Promesa</b>
            </Link>
          </div>
        </BoxContent>
        <BoxFooter>
          <Button disabled={selector.loading} onClick={onSubmit}>
            Enviar Observaciones a Inmobiliaria
          </Button>
          <Button disabled={selector.loading} color="white" onClick={onCancel}>
            Cancelar
          </Button>
        </BoxFooter>
      </Box>
      <div className="py-3">
        <SyncMassage {...selector} />
      </div>
    </>
  );
}

PhaseReviewNegociacionPromesa.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PhaseReviewNegociacionPromesa;
