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

function MunicipalReception({ canEdit = false, initialValues, onSubmit }) {
  // if (entity == false)
  //   entity = {
  //     SubmissionDate: Auth.isGerenteComercial() ? new Date() : "",
  //   };

  return (
    <Box>
      <ExForm
        initialValues={initialValues}
        onSubmit={(values) => onSubmit({
          SubmissionDate: moment(values.SubmissionDate).format('YYYY-MM-DD')
        })}
      >
        {form => (
          <>
            <BoxContent className="p-3">
              {canEdit &&
                <Alert type="warning">
                  Debes indicar la fecha de presentación de solicitud de recepción final Municipal.
                </Alert>
              }
              <div className="d-flex align-items-center my-2">
                <Label className="mr-5">Fecha de presentación de solicitud de recepción final Municipal</Label>
                {canEdit ?
                  <ExField
                    type="datePicker"
                    name="SubmissionDate"
                    required
                    disabled={!Auth.isGerenteComercial()}
                  /> :
                  <span className="font-14-rem color-regular">
                    {moment(form.values.SubmissionDate).format('DD MMM YYYY')}
                  </span>
                }
              </div>
            </BoxContent>
            {canEdit &&
              <BoxFooter>
                <Button type="submit" disabled={!Auth.isGerenteComercial()}>
                  Aceptar
                </Button>
                <Button type="reset" color="white">
                  Cancelar
                </Button>
              </BoxFooter>
            }
          </>
        )}
      </ExForm>
    </Box>
  );
}

MunicipalReception.propTypes = {
  canEdit: PropTypes.bool,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default MunicipalReception;