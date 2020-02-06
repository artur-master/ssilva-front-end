/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Field, Form, FormGroup, Label } from 'components/ExForm';
import moment from 'components/moment';
import { PROMESA_STATE } from 'containers/App/constants';

export function PhaseTimelineLegalizePromesa({
  canEdit,
  isPending,
  selector,
  entity,
  onSubmit,
}) {
  return (
    <Form
      initialValues={{
        DateLegalizacionPromesa: entity.DateLegalizacionPromesa || '',
      }}
      onSubmit={onSubmit}
    >
      {() => (
        <div className="mt-4">
          <div className="row m-0 p-0 mb-3">
            <div className="col-lg-6 border-bottom p-0 pb-2 d-flex align-items-center">
              <span className="font-16-rem">
                <strong>Legalizar Promesa</strong>
              </span>
            </div>
          </div>
          <FormGroup>
            {!canEdit && isPending && PROMESA_STATE[5]}
            {(canEdit || !isPending) && (
              <>
                <Label style={{ width: '15em' }} className="pt-1">
                  Legalización de Promesa
                </Label>
                {canEdit && (
                  <>
                    <Field
                      type="datepicker"
                      required
                      name="DateLegalizacionPromesa"
                    />
                    <div className="ml-3">
                      <Button disabled={selector.loading} type="submit">
                        Aceptar
                      </Button>
                    </div>
                  </>
                )}
                {!canEdit &&
                  moment(entity.DateLegalizacionPromesa).format('DD MMM YYYY')}
              </>
            )}
          </FormGroup>
        </div>
      )}
    </Form>
  );
}

PhaseTimelineLegalizePromesa.propTypes = {
  canEdit: PropTypes.bool,
  isPending: PropTypes.bool,
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default PhaseTimelineLegalizePromesa;
