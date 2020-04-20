/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import moment from 'components/moment';
import { Box, BoxContent, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Form as ExForm, Field as ExField, Label } from 'components/ExForm';
import { Auth } from 'containers/App/helpers';

function MunicipalReception({onSubmit}) {
  const initialValues = {
    SubmissionDate: Auth.isGerenteComercial() ? new Date() : "",
  };

  return (
    <Box>
      <ExForm
        initialValues={initialValues}
        onSubmit={(values)=> onSubmit({
          SubmissionDate:moment(values.SubmissionDate).format('YYYY-MM-DD')
        })}
      >
        {() => (
          <>
            <BoxContent className="p-3">
              <Alert type="warning">
                Debes indicar la fecha de presentación de solicitud de recepción final Municipal.
              </Alert>
              <div className="d-flex align-items-center mt-4">
                <Label className="mr-5">Fecha de presentación de solicitud de recepción final Municipal</Label>
                <ExField
                  type="datePicker"
                  name="SubmissionDate"
                  required
                  disabled={!Auth.isGerenteComercial()}
                />
              </div>
            </BoxContent>
            <BoxFooter>
              <Button type="submit" disabled={!Auth.isGerenteComercial()}>
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
  onSubmit: PropTypes.func,
};

export default MunicipalReception;
