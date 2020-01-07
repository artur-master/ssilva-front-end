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
import {
  Form as ExForm,
  Field as ExField,
  FormGroup,
  Label,
} from 'components/ExForm';
import CheckboxGroup from 'components/ExForm/CheckboxGroup';
import DocumentItem from './DocumentItem';
import PhaseDownloadDocumentsPromesa from './DownloadDocuments';

const SyncMassage = WithLoading();

export function PhaseUploadFirmaDocumentsPromesa({
  selector,
  entity,
  onSubmit,
  onCancel,
}) {
  const initialValues = {
    Condition: entity.Condition || [],
    openComment: false,
    Comment: '',
    Resolution: '',
  };
  return (
    <>
      <Box>
        <BoxHeader>
          <b>FIRMA PROMESA</b>
        </BoxHeader>
        <BoxContent className="p-0">
          <PhaseDownloadDocumentsPromesa
            documents={{
              Cheques: 'a',
              Promesa: 'b',
              Planta: 'c',
            }}
          />
        </BoxContent>
        <BoxFooter>
          <ExForm initialValues={initialValues} onSubmit={onSubmit}>
            {form => (
              <div className="d-flex justify-content-end">
                <Button
                  disabled={selector.loading}
                  onClick={() => form.submitForm()}
                >
                  Aceptar
                </Button>
                <Button
                  disabled={selector.loading}
                  color="white"
                  onClick={onCancel}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </ExForm>
        </BoxFooter>
      </Box>
      <div className="py-3">
        <SyncMassage {...selector} />
      </div>
    </>
  );
}

PhaseUploadFirmaDocumentsPromesa.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PhaseUploadFirmaDocumentsPromesa;
