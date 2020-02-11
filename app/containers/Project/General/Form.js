/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import { Form as ExForm, Field, FormGroup, Label } from 'components/ExForm';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import model from '../model';
import { getGeneralFields } from '../fields';

const SyncMessage = WithLoading();
export function GeneralForm({ selector, selectorProject, onSubmit, onReset }) {
  const { project = {} } = selectorProject;
  const { loading, success, ...restSelector } = selector;
  const initialValues = model(project);
  return (
    <ExForm initialValues={initialValues} onSubmit={values => onSubmit(values)}>
      {form => {
        const fields = getGeneralFields(form);
        return (
          <Box>
            <BoxHeader>
              <b>DATOS GENERALES</b>
            </BoxHeader>
            <BoxContent>
              <SyncMessage {...restSelector} />
              <div className="row p-0 m-0 color-regular">
                {fields.map(
                  ({ label, name, view, Component = Field, ...attributes }) => (
                    <FormGroup key={name} className="col-md-6 my-2">
                      <Label style={{ width: '13.5em' }}>{label}</Label>
                      <Component
                        name={name}
                        style={{ width: '13.5em' }}
                        {...attributes}
                      />
                    </FormGroup>
                  ),
                )}
              </div>
            </BoxContent>
            <BoxFooter>
              <Button
                loading={loading}
                disabled={loading}
                onClick={evt => {
                  evt.preventDefault();
                  form.submitForm();
                }}
              >
                {project.ProyectoID ? 'Aceptar' : 'Guardar y Continuar'}
              </Button>
              {project.ProyectoID && (
                <Button
                  disabled={loading}
                  onClick={onReset}
                  type="reset"
                  className="font-14-rem shadow-sm m-btn m-btn-white ml-2"
                >
                  Cancelar
                </Button>
              )}
            </BoxFooter>
          </Box>
        );
      }}
    </ExForm>
  );
}

GeneralForm.propTypes = {
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  onSubmit: PropTypes.func,
  onSubmitted: PropTypes.func,
  onReset: PropTypes.func,
};

export default GeneralForm;
