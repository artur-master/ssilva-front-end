/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, BoxContent, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Form as ExForm, Field as ExField, Label } from 'components/ExForm';

function MunicipalReception() {
  const initialValues = {
    Date: '2019-4-17',
  };
  return (
    <Box>
      <ExForm
        initialValues={initialValues}
        onSubmit={values => console.log(values)}
      >
        {form => (
          <>
            <BoxContent className="p-3">
              <Alert type="warning">
                Debes indicar la fecha de presentación de solicitud de recepción final Municipal.
              </Alert>
              <div className="d-flex align-items-center mt-4">
                <Label className="mr-5">Fecha de presentación de solicitud de recepción final Municipal</Label>
                <ExField
                  type="datePicker"
                  name="Date"
                  required
                />
              </div>
            </BoxContent>
            <BoxFooter>
              <Button type="submit">
                Aceptar
              </Button>
              <Button type="reset" color="white">
                Cancelar
              </Button>
            </BoxFooter>
          </>
        )}
      </ExForm>
    </Box>
  );
}

MunicipalReception.propTypes = {
  // promesa: PropTypes.object,
};

export default MunicipalReception;
