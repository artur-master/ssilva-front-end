/**
 *
 * Forma Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import {
  FormGroup,
  Label,
  Field as ExField,
  Form as ExForm,
} from 'components/ExForm';

import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import RadioGroup from 'components/ExForm/RadioGroup';
import { clientFullname } from 'containers/Common/Client/helper';
import { userFullname } from 'containers/Common/User/helper';

// eslint-disable-next-line no-unused-vars
function PhaseGeneralForm({ initialValues, onHide, onUpdate, isOpen }) {
  const cotizacionTypeIDs = window.preload.quotationUtils.CotizacionTypes.map(
    ({ Name }) => ({
      label: Name,
      value: Name,
    }),
  );
  return (
    <Modal isOpen={isOpen} size="xl" scrollable>
      <ModalHeader>Editar Generals</ModalHeader>
      <ExForm initialValues={initialValues} onSubmit={onUpdate}>
        {({ values, submitForm }) => (
          <>
            <ModalBody className="p-3">
              {!initialValues.CotizacionType && (
                <div className="p-2 d-flex align-items-center pl-3">
                  <RadioGroup
                    name="CotizacionType"
                    options={cotizacionTypeIDs}
                  />
                </div>
              )}
              <ul className="row m-0 p-0">
                <FormGroup className="col-md-6 my-2">
                  <Label style={{ width: '10em' }}>Vendedor</Label>
                  <b>{userFullname(values.Vendedor)}</b>
                </FormGroup>
                <FormGroup className="col-md-6 my-2">
                  <Label style={{ width: '10em' }}>Cliente</Label>
                  <b>{clientFullname(values.Cliente)}</b>
                </FormGroup>
                <FormGroup className="col-md-6 my-2">
                  <Label style={{ width: '10em' }}>Fecha</Label>
                  <ExField
                    name="DateFirmaPromesa"
                    style={{ width: '21em' }}
                    type="datepicker"
                  />
                </FormGroup>

                {values.CotizacionType ===
                  window.preload.quotationUtils.CotizacionTypes[0].Name && (
                  <>
                    <FormGroup className="col-md-6 my-2">
                      <Label style={{ width: '10em' }}>
                        Interés del Cliente
                      </Label>
                      <ExField
                        type="select"
                        name="IsNotInvestment"
                        className="flex-fill"
                        required
                      >
                        <option value="">Selecciona...</option>
                        <option value="1">Vivienda</option>
                        <option value="0">Inversión</option>
                      </ExField>
                    </FormGroup>
                    <FormGroup className="col-md-6 my-2">
                      <Label style={{ width: '10em' }}>Cómo se Enteró</Label>
                      <ExField
                        type="select"
                        name="Cliente.FindingTypeID"
                        className="flex-fill"
                        required
                      >
                        <option value="">Selecciona...</option>
                        {window.preload.quotationUtils.FindingTypes.map(
                          findingtype => (
                            <option
                              key={findingtype.FindingTypeID}
                              value={findingtype.FindingTypeID}
                            >
                              {findingtype.Name}
                            </option>
                          ),
                        )}
                      </ExField>
                    </FormGroup>
                  </>
                )}
                {values.CotizacionType ===
                  window.preload.quotationUtils.CotizacionTypes[1].Name && (
                  <FormGroup className="col-md-6 my-2">
                    <Label style={{ width: '10em' }}>Medio de Contacto</Label>
                    <ExField
                      type="select"
                      name="ContactMethodTypeID"
                      className="flex-fill"
                      required
                    >
                      <option value="">Selecciona...</option>
                      {window.preload.quotationUtils.ContactMethodTypes.map(
                        contacttype => (
                          <option
                            key={contacttype.ContactMethodTypeID}
                            value={contacttype.ContactMethodTypeID}
                          >
                            {contacttype.Name}
                          </option>
                        ),
                      )}
                    </ExField>
                  </FormGroup>
                )}
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button className="ml-2" onClick={submitForm}>
                Guardar
              </Button>
              <Button className="ml-2" color="white" onClick={onHide}>
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ExForm>
    </Modal>
  );
}

PhaseGeneralForm.propTypes = {
  isOpen: PropTypes.bool,
  initialValues: PropTypes.object,
  onHide: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default PhaseGeneralForm;
