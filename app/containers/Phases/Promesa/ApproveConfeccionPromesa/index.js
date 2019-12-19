/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { Form as ExForm } from 'components/ExForm';
import { getPromesa } from 'containers/Project/helper';
import DocumentItem from './DocumentItem';

const SyncMassage = WithLoading();

export function PhaseApproveConfeccionPromesa({
  canUpload,
  selector,
  entity,
  onSubmit,
  onCancel,
}) {
  const { maquetaWord } = getPromesa(entity);
  return (
    <ExForm
      initialValues={{
        DocumentFirmaComprador: entity.DocumentFirmaComprador,
      }}
      onSubmit={onSubmit}
    >
      {form => (
        <>
          <Box>
            <BoxHeader>
              <b>PROMESA</b>
            </BoxHeader>
            <BoxContent>
              <div className="row m-0 p-0">
                <div className="col-lg-6 border-bottom p-0 pb-3 d-flex align-items-center">
                  <Link
                    disabled={!!form.values.DocumentFirmaComprador}
                    className="m-btn m-btn-white m-btn-download"
                    to={maquetaWord.url}
                    target="_blank"
                    download
                  >
                    Descargar Maqueta
                  </Link>
                </div>
              </div>
              <div className="pt-4 pb-4">
                <div className="d-flex align-items-center">
                  <span className="font-14-rem mr-3">
                    {form.values.DocumentFirmaComprador
                      ? 'Promesa'
                      : 'Cargar Promesa'}
                  </span>
                  <DocumentItem canUpload={canUpload} />
                </div>
              </div>
            </BoxContent>
            <BoxFooter>
              {canUpload && (
                <Button
                  disabled={
                    selector.loading ||
                    !(
                      form.values.DocumentFirmaComprador &&
                      form.values.DocumentFirmaComprador.name
                    )
                  }
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
            </BoxFooter>
          </Box>
          <div className="py-3">
            <SyncMassage {...selector} />
          </div>
        </>
      )}
    </ExForm>
  );
}

PhaseApproveConfeccionPromesa.propTypes = {
  entity: PropTypes.object,
  canUpload: PropTypes.bool,
  selector: PropTypes.object,
  form: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PhaseApproveConfeccionPromesa;
