/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { Form as ExForm } from 'components/ExForm';
import DocumentItem from './DocumentItem';
import PhaseDownloadDocumentsPromesa from './DownloadDocuments';

const SyncMassage = WithLoading();

export function PhaseFirmaDocumentsPromesa({
  selector,
  entity,
  onSubmit,
  onCancel,
  canUpload,
}) {
  const initialValues = {
    DocumentChequesFirma: entity.DocumentChequesFirma || '',
    DocumentPromesaFirma: entity.DocumentPromesaFirma || '',
    DocumentPlantaFirma: entity.DocumentPlantaFirma || '',
  };
  return (
    <>
      <Box>
        <BoxHeader>
          <b>FIRMA PROMESA</b>
        </BoxHeader>
        {canUpload && (
          <BoxContent className="p-0 border-bottom">
            <PhaseDownloadDocumentsPromesa
              documents={{
                Cheques: 'a',
                Promesa: 'b',
                Planta: 'c',
              }}
            />
          </BoxContent>
        )}
        <ExForm initialValues={initialValues} onSubmit={onSubmit}>
          {form => (
            <>
              <BoxContent>
                <div className="row m-0 p-0 mb-4">
                  <div className="col-lg-6 border-bottom p-0 pb-2 d-flex align-items-center">
                    <span className="font-16-rem">
                      <strong>
                        {canUpload
                          ? 'Cargar Documentos Firmados'
                          : 'Documentos Firmados'}
                      </strong>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <DocumentItem
                      name="DocumentChequesFirma"
                      label="Cheques"
                      canUpload={canUpload}
                    />
                  </div>
                  <div className="col-md-6  mb-2">
                    <DocumentItem
                      name="DocumentPromesaFirma"
                      label="Promesa"
                      canUpload={canUpload}
                    />
                  </div>
                  <div className="col-md-6  mb-2">
                    <DocumentItem
                      name="DocumentPlantaFirma"
                      label="Planta"
                      canUpload={canUpload}
                    />
                  </div>
                </div>
              </BoxContent>
              <BoxFooter>
                <div className="d-flex justify-content-end">
                  {canUpload && (
                    <Button
                      disabled={selector.loading}
                      onClick={() => form.submitForm()}
                    >
                      Aceptar
                    </Button>
                  )}
                  <Button
                    disabled={selector.loading}
                    color="white"
                    onClick={onCancel}
                  >
                    Cancelar
                  </Button>
                </div>
              </BoxFooter>
            </>
          )}
        </ExForm>
      </Box>
      <div className="py-3">
        <SyncMassage {...selector} />
      </div>
    </>
  );
}

PhaseFirmaDocumentsPromesa.propTypes = {
  canUpload: PropTypes.bool,
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PhaseFirmaDocumentsPromesa;
