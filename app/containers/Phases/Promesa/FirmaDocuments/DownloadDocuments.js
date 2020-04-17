/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Form as ExForm } from 'components/ExForm';
import CheckboxGroup from 'components/ExForm/CheckboxGroup';
import { documentDownload } from 'containers/Promesa/helper'

export function PhaseDownloadDocumentsPromesa({ documents = {} }) {
  const initialValues = {
    SelectedDocuments: [
      { label: 'Cheques', value: 'ChequesDocument', dvalue: documents.Cheques || 'a'},
      { label: 'Promesa', value: 'PromesaDocument', dvalue: documents.Promesa || 'b'},
      { label: 'Planta Inmueble', value: 'documentPlanta', dvalue: documents.Planta|| 'c'},
    ],
  };
  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => documentDownload(values.SelectedDocuments)}
    >
      {() => (
        <>
          <div className="p-3">
            <div className="row m-0 p-0">
              <div className="col-lg-6 border-bottom p-0 pb-2 d-flex align-items-center">
                <span className="font-16-rem">
                  <strong>Descargar Documentos</strong>
                </span>
              </div>
            </div>
            <div className="pt-3 d-flex align-items-center">
              <CheckboxGroup
                name="SelectedDocuments"
                options={initialValues.SelectedDocuments}
              />
              <Button className="m-btn-white m-btn-download mx-2" type="submit">
                Descargar Seleccionados
              </Button>
            </div>
          </div>
        </>
      )}
    </ExForm>
  );
}

PhaseDownloadDocumentsPromesa.propTypes = {
  documents: PropTypes.object,
};

export default PhaseDownloadDocumentsPromesa;
