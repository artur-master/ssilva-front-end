/**
 *
 * Client Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form as ExForm, FormGroup, Label } from 'components/ExForm';
import ExField from 'components/ExForm/ExField';
import Button from 'components/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import WithLoading from 'components/WithLoading';
import { getContactType } from 'containers/App/helpers';
import ContactsElement from 'containers/Common/Client/Form/ContactsElement';
import Alert from 'components/Alert';

const SyncMessage = WithLoading();

function ClientForm({ selector, preload, onHide, onSubmit }) {
  const { loading, client = {}, ...restSelector } = selector;
  const { clientUtils, contactTypes } = preload;
  const phoneContactType = getContactType('phone');

  const initialValues = {
    Name: client.Name || '',
    LastNames: client.LastNames || '',
    ComunaID: client.ComunaID || '',
    Extra: { AgeRank: '', SalaryRank: '', ...(client.Extra || {}) },
    Address: client.Address || '',
    Rut: client.Rut || '',
    Contact: client.Contact || [{ ...phoneContactType, Value: '' }],
    CivilStatus: client.CivilStatus || '',
    ContractMarriageType: client.ContractMarriageType || '',
    Genre: client.Genre || '',
    Nationality: client.Nationality || '',
    IsDefinitiveResidence: client.IsDefinitiveResidence || true,
    Carga: client.Carga || '',
    Position: client.Position || '',
    Antiquity: client.Antiquity || '',
    TotalPatrimony: client.TotalPatrimony || '',
    IsCompany: client.IsCompany || 0,
    Ocupation: client.Ocupation || '',
  };
  return (
    <ExForm initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, submitForm }) => (
        <Modal isOpen={selector.screen === 'form'} size="xl" scrollable>
          {client && client.UserID && !client.Name && (
            <SyncMessage {...restSelector} loading={loading} />
          )}
          {!(client && client.UserID && !client.Name) && (
            <>
              <ModalHeader>
                {client.UserID ? 'Editar cliente' : 'Agregar cliente'}
              </ModalHeader>
              <ModalBody>
                <SyncMessage {...restSelector} />
                <div className="p-3 background-color-tab d-flex align-items-center">
                  <b>{values.IsCompany ? 'Empresa' : 'Persona Natural'}</b>
                </div>

                <div className="p-3 px-4 border-top">
                  <div className="row justify-content-between">
                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>RUT</Label>
                        <ExField
                          className="flex-fill"
                          name="Rut"
                          required
                          disabled={client && client.UserID}
                        />
                      </FormGroup>
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Edad</Label>
                        <ExField
                          type="select"
                          name="Extra.AgeRank"
                          className="flex-fill"
                          required
                        >
                          <option value="">Selecciona...</option>
                          {clientUtils.Ages.map(age => (
                            <option key={age} value={age}>
                              {age}
                            </option>
                          ))}
                        </ExField>
                      </FormGroup>
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Dirección</Label>
                        <ExField
                          className="flex-fill"
                          name="Address"
                          required
                        />
                      </FormGroup>
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Profesión</Label>
                        <ExField
                          className="flex-fill"
                          name="Ocupation"
                          required
                        />
                      </FormGroup>
                    </div>

                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Nombre</Label>
                        <ExField className="flex-fill" name="Name" required />
                      </FormGroup>

                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Apellidos</Label>
                        <ExField
                          className="flex-fill"
                          name="LastNames"
                          required
                        />
                      </FormGroup>
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Comunas</Label>
                        <Field
                          type="comunas"
                          className="flex-fill"
                          name="ComunaID"
                          required
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="font-14-rem color-main mt-4">
                    <b>MEDIOS DE CONTACTO</b>
                  </div>

                  <ContactsElement
                    contactTypes={contactTypes}
                    values={values}
                    required
                  />
                </div>
                <div className="p-3 mt-4 border-top">
                  <Alert type="warning">
                    Debes completar los datos faltantes
                  </Alert>

                  <div className="row justify-content-between">
                    <span className="col-lg-12 mt-3 font-14-rem color-main">
                      <b>¿CUÁL ES SU ESTADO CIVIL?</b>
                    </span>
                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Estado civil</Label>
                        <ExField
                          type="select"
                          name="CivilStatus"
                          className="flex-fill"
                          required
                        >
                          <option value="">Selecciona...</option>
                          {clientUtils.CivilStatus.map(civilStatus => (
                            <option key={civilStatus} value={civilStatus}>
                              {civilStatus}
                            </option>
                          ))}
                        </ExField>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>
                          Tipo de matrimonio
                        </Label>
                        <ExField
                          type="select"
                          name="ContractMarriageType"
                          className="flex-fill"
                          required
                        >
                          <option value="">Selecciona...</option>
                          {clientUtils.ContractMarriageTypes.map(
                            contractMarriageTypes => (
                              <option
                                key={contractMarriageTypes}
                                value={contractMarriageTypes}
                              >
                                {contractMarriageTypes}
                              </option>
                            ),
                          )}
                        </ExField>
                      </FormGroup>
                    </div>
                    <span className="col-lg-12 mt-3 font-14-rem color-main">
                      <b>¿TIENE HIJOS?</b>
                    </span>
                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Cargas</Label>
                        <ExField
                          className="flex-fill"
                          name="Carga"
                          required
                          max={32767}
                          type="number"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Género</Label>
                        <ExField
                          type="select"
                          name="Genre"
                          className="flex-fill"
                          required
                        >
                          <option value="">Selecciona...</option>
                          {clientUtils.Genres.map(genres => (
                            <option key={genres} value={genres}>
                              {genres}
                            </option>
                          ))}
                        </ExField>
                      </FormGroup>
                    </div>
                    <span className="col-lg-12 mt-3 font-14-rem color-main">
                      <b>¿CUÁL ES SU NACIONALIDAD?</b>
                    </span>
                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Nacionalidad</Label>
                        <ExField
                          type="select"
                          name="Nationality"
                          className="flex-fill"
                          required
                        >
                          <option value="">Selecciona...</option>
                          {clientUtils.Nationalities.map(nationalities => (
                            <option key={nationalities} value={nationalities}>
                              {nationalities}
                            </option>
                          ))}
                        </ExField>
                      </FormGroup>
                    </div>
                    <div className="col-md-6" />
                    <span className="col-lg-12 mt-3 font-14-rem color-main">
                      <b>¿TIENE RESIDENCIA DEFINITIVA?</b>
                    </span>
                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>
                          Residencia Definitiva
                        </Label>
                        <ExField
                          type="select"
                          name="IsDefinitiveResidence"
                          className="flex-fill"
                          required
                        >
                          <option value="">Selecciona...</option>
                          {clientUtils.Nationality_type.map(nationalityType => (
                            <option
                              key={nationalityType}
                              value={nationalityType === 'Chilena'}
                            >
                              {nationalityType}
                            </option>
                          ))}
                        </ExField>
                      </FormGroup>
                    </div>
                    <div className="col-md-6" />
                    <span className="col-lg-12 mt-3 font-14-rem color-main">
                      <b>¿EN QUÉ TRABAJA?</b>
                    </span>
                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Cargo</Label>
                        <ExField
                          className="flex-fill"
                          name="Position"
                          required
                        />
                      </FormGroup>
                    </div>
                    <span className="col-lg-12 mt-3 font-14-rem color-main">
                      <b>OTROS</b>
                    </span>
                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Rango salarial</Label>
                        <ExField
                          type="select"
                          name="Extra.SalaryRank"
                          className="flex-fill"
                          required
                        >
                          <option value="">Selecciona...</option>
                          {clientUtils.Salaries.map(salaries => (
                            <option key={salaries} value={salaries}>
                              {salaries}
                            </option>
                          ))}
                        </ExField>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Antiquity</Label>
                        <ExField
                          type="select"
                          name="Antiquity"
                          className="flex-fill"
                          required
                        >
                          <option value="">Selecciona...</option>
                          {clientUtils.Antiquities.map(antiquities => (
                            <option key={antiquities} value={antiquities}>
                              {antiquities}
                            </option>
                          ))}
                        </ExField>
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup className="mt-3">
                        <Label style={{ width: '10em' }}>Patrimonio</Label>
                        <ExField
                          type="number"
                          className="flex-fill"
                          name="TotalPatrimony"
                          required
                          max={2147483647}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  loading={loading}
                  type="submit"
                  onClick={evt => {
                    evt.preventDefault();
                    submitForm();
                  }}
                >
                  Guardar
                </Button>
                <Button
                  disabled={loading}
                  type="reset"
                  className="ml-2"
                  color="white"
                  onClick={onHide}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </Modal>
      )}
    </ExForm>
  );
}

ClientForm.propTypes = {
  preload: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
};

export default ClientForm;
