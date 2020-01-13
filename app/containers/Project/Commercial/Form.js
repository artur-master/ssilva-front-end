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
import { USER_PROYECTO_TYPE } from 'containers/App/constants';
import Alert from 'components/Alert';
import { stringToBoolean } from 'containers/App/helpers';
import model from '../model';
import { getCommercialFields } from '../fields';

const SyncMessage = WithLoading();
export function CommercialForm({
  preload,
  selector,
  selectorProject,
  selectorRealEstate,
  onSubmit,
  onReset,
}) {
  const { project = {} } = selectorProject;
  const { inmobiliarias, constructoras } = selectorRealEstate;
  const { UsersProyecto = [], InmobiliariaID } = project;
  const { loading, ...restSelector } = selector;
  const initialValues = model(preload, project);
  const selectedInmobiliaria = (inmobiliarias || []).find(
    item => item.InmobiliariaID === InmobiliariaID,
  );
  const selectedConstructora = constructoras.find(
    item =>
      selectedInmobiliaria.IsConstructora &&
      item.IsInmobiliaria &&
      item.RazonSocial === selectedInmobiliaria.RazonSocial,
  );
  const Representante = selectedInmobiliaria.UsersInmobiliaria.find(
    item => item.UserInmobiliariaType === 'Representante',
  );
  const Aprobador = selectedInmobiliaria.UsersInmobiliaria.find(
    item => item.UserInmobiliariaType === 'Aprobador',
  );

  const Autorizador = selectedInmobiliaria.UsersInmobiliaria.find(
    item => item.UserInmobiliariaType === 'Autorizador',
  );

  if (
    Representante &&
    !initialValues.UsersProyecto.find(
      item => item.UserProyectoType === 'Representante' && item.UserID,
    )
  )
    initialValues.UsersProyecto = [
      ...initialValues.UsersProyecto.filter(
        item => item.UserProyectoType !== 'Representante',
      ),
      {
        UserID: Representante.UserID,
        UserProyectoType: 'Representante',
      },
    ];

  if (
    Aprobador &&
    !initialValues.UsersProyecto.find(
      item => item.UserProyectoType === 'Aprobador' && item.UserID,
    )
  )
    initialValues.UsersProyecto = [
      ...initialValues.UsersProyecto.filter(
        item => item.UserProyectoType !== 'Aprobador',
      ),
      {
        UserID: Aprobador.UserID,
        UserProyectoType: 'Aprobador',
      },
    ];

  if (
    Autorizador &&
    !initialValues.UsersProyecto.find(
      item => item.UserProyectoType === 'Autorizador' && item.UserID,
    )
  )
    initialValues.UsersProyecto = [
      ...initialValues.UsersProyecto.filter(
        item => item.UserProyectoType !== 'Autorizador',
      ),
      {
        UserID: Representante.UserID,
        UserProyectoType: 'Autorizador',
      },
    ];

  if (!initialValues.ConstructoraID && selectedConstructora) {
    initialValues.ConstructoraID = selectedConstructora.ConstructoraID;
  }
  const fields = getCommercialFields(initialValues, {
    UsersInmobiliaria: selectedInmobiliaria.UsersInmobiliaria,
  });

  return (
    <ExForm initialValues={initialValues} onSubmit={values => onSubmit(values)}>
      {({ submitForm, values }) => {
        const EntregaInmediata = stringToBoolean(values.EntregaInmediata);
        const { Aseguradora } = values;
        return (
          <Box>
            <BoxHeader>
              <b>DATOS COMERCIALES</b>
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
              {EntregaInmediata && !Aseguradora.AseguradoraID && (
                <Alert type="warning" className="mb-0">
                  {`Se le informará al asistente comercial para que complete los datos de la "Póliza"`}
                </Alert>
              )}
              {!EntregaInmediata && Aseguradora.AseguradoraID && (
                <Alert type="danger" className="mb-0">
                  {`La información de "Póliza" será eliminada`}
                </Alert>
              )}
            </BoxContent>
            <BoxFooter>
              <Button
                loading={loading}
                disabled={loading}
                onClick={evt => {
                  evt.preventDefault();
                  submitForm();
                }}
              >
                Aceptar
              </Button>
              {UsersProyecto.find(
                user =>
                  user.UserProyectoType === USER_PROYECTO_TYPE[3] &&
                  user.UserID,
              ) && (
                <Button
                  disabled={loading}
                  type="reset"
                  onClick={onReset}
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

CommercialForm.propTypes = {
  preload: PropTypes.object,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  selectorRealEstate: PropTypes.object,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};

export default CommercialForm;
