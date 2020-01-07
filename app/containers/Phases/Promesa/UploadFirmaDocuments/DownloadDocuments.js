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

export function PhaseDownloadDocumentsPromesa({ documents = {} }) {
  const initialValues = {
    SelectedDocuments: [
      { label: 'Cheques', value: documents.Cheques },
      { label: 'Promesa', value: documents.Promesa },
      { label: 'Planta Inmueble', value: documents.Planta },
    ],
  };
  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
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
