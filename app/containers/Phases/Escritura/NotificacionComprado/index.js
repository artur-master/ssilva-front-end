/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';

function NotificacionComprado() {
  return (
    <Box>
      <BoxHeader>
        <b>NOTIFICACIÓN AL COMPRADOR</b>
      </BoxHeader>
      <BoxContent className="p-3">
        <Alert type="warning">
          Debes Notificar al Comprador.
        </Alert>
        <div className="d-block mt-3">
          <Button>
            Confirmo Notificación
          </Button>
          <Button color="white">
            Cancelar
          </Button>
        </div>
      </BoxContent>
    </Box>
  );
}

NotificacionComprado.propTypes = {
  // promesa: PropTypes.object,
};

export default NotificacionComprado;
