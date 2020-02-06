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

export function PhaseConfeccionPromesa({
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
        DocumentPromesa: entity.DocumentPromesa,
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
              {canUpload && (
                <div className="row m-0 p-0">
                  <div className="col-lg-6 border-bottom p-0 pb-3 d-flex align-items-center">
                    <a
                      disabled={!!form.values.DocumentPromesa}
                      className="m-btn m-btn-white m-btn-download"
                      href={maquetaWord.url}
                      target="_blank"
                      download
                    >
                      Descargar Maqueta
                    </a>
                  </div>
                </div>
              )}
              <div className="pt-4 pb-4">
                <div className="d-flex align-items-center">
                  <span className="font-14-rem mr-3">
                    {form.values.DocumentPromesa ? 'Promesa' : 'Cargar Promesa'}
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
                      form.values.DocumentPromesa &&
                      form.values.DocumentPromesa.name
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

PhaseConfeccionPromesa.propTypes = {
  entity: PropTypes.object,
  canUpload: PropTypes.bool,
  selector: PropTypes.object,
  form: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PhaseConfeccionPromesa;
