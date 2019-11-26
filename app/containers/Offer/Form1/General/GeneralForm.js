/**
 *
 * Forma Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import moment from 'components/moment';
import {
  Form as ExForm,
  FormGroup,
  Label,
  Field as ExField,
} from 'components/ExForm';

import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import ExClients from 'components/ExForm/ExClients';
import RadioGroup from 'components/ExForm/RadioGroup';

// eslint-disable-next-line no-unused-vars
function GeneralForm({ inputvalues, preload, onHide, isOpen }) {
  const cotizacionTypeIDs = preload.quotationUtils.CotizacionTypes.map(
    ({ Name }) => ({
      label: Name,
      value: Name,
    }),
  );

  const initialValues = {
    ContactMethodTypeID: inputvalues.ContactMethodTypeID || null,
    VendedorID: inputvalues.VendedorID || '',
    Cliente: {
      UserID: (inputvalues.Cliente || {}).UserID || '',
      FindingTypeID: (inputvalues.Cliente || {}).FindingTypeID || null,
      ...(inputvalues.Cliente || {}),
    },
    CotizacionType:
      inputvalues.CotizacionTypeID ||
      preload.quotationUtils.CotizacionTypes[0].Name,
    IsNotInvestment: (inputvalues.IsNotInvestment ? '1' : '0') || '',
    DateFirmaPromesa: moment(
      inputvalues.DateFirmaPromesa || new Date(),
    ).format(),
  };

  return (
    <ExForm initialValues={initialValues}>
      {({ values }) => (
        <Modal isOpen={isOpen} size="xl" scrollable>
          <ModalHeader>Editar Generals</ModalHeader>
          <ModalBody>
            <div className="p-0">
              <div className="p-2 d-flex align-items-center pl-3">
                <RadioGroup
                  required
                  name="CotizacionType"
                  options={cotizacionTypeIDs}
                />
              </div>
              <ul className="row m-0 p-0">
                <FormGroup className="col-md-6 my-2">
                  <Label style={{ width: '10em' }}>Vendedor</Label>
                  <b>{inputvalues.VendedorName}</b>
                </FormGroup>
                <FormGroup className="col-md-6 my-2">
                  <Label style={{ width: '10em' }}>Cliente</Label>
                  <ExClients name="Cliente.UserID" style={{ width: '25em' }} />
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
                  preload.quotationUtils.CotizacionTypes[0].Name && (
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
                        {preload.quotationUtils.FindingTypes.map(
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
                  preload.quotationUtils.CotizacionTypes[1].Name && (
                  <FormGroup className="col-md-6 my-2">
                    <Label style={{ width: '10em' }}>Medio de Contacto</Label>
                    <ExField
                      type="select"
                      name="ContactMethodTypeID"
                      className="flex-fill"
                      required
                    >
                      <option value="">Selecciona...</option>
                      {preload.quotationUtils.ContactMethodTypes.map(
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
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="ml-2"
              color="white"
              onClick={() => onHide(values)}
            >
              Guardar
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </ExForm>
  );
}

GeneralForm.propTypes = {
  isOpen: PropTypes.bool,
  preload: PropTypes.object,
  inputvalues: PropTypes.object,
  onHide: PropTypes.func,
};

export default GeneralForm;
