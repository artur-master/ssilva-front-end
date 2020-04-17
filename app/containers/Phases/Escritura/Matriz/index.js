/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Form as ExForm, Field as ExField, Label, FormGroup } from 'components/ExForm';

function Matriz() {
  return (
    <ExForm
      // initialValues={initialValues}
      onSubmit={values => console.log(values)}
    >
    {form => (
      <Box>
        <BoxHeader>
          <b>MATRIZ DE ESCRITURA</b>
        </BoxHeader>
        <BoxContent className="p-3">
          <Alert type="warning">
            Debes confirmar el envío de la Matriz de Escritura.
          </Alert>
          <div className="mt-4">         
            <Button>
              Matriz de Escritura Enviada
            </Button>
          </div>
        </BoxContent>
      </Box>
    )}
    </ExForm>
  );
}

Matriz.propTypes = {
  // promesa: PropTypes.object,
};

export default Matriz;
