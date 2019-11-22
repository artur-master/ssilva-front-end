/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { BoxFooter } from 'components/Box';
import { Form as ExForm } from 'components/ExForm';
import Button from 'components/Button';
import { List } from 'components/List';
import WithLoading from 'components/WithLoading';
import { PROYECTO_DOCUMENT_STATE } from 'containers/App/constants';
import Alert from 'components/Alert';
import documents from './documents';
import DocumentItem from '../DocumentItem';
import { canConfirmDocument, canUploadDocument } from '../../helper';

const SyncMessage = WithLoading();
export function LegalForm({
  action,
  selector,
  selectorProject,
  onSubmit,
  onConfirm,
}) {
  const { project = {} } = selectorProject;
  const { loading, ...restSelector } = selector;
  const canConfirm = canConfirmDocument(project);
  const canUpload = canUploadDocument('legal', project) && action !== 'view';
  const initialValues = documents.reduce((acc, document) => {
    acc[document] = null;
    return acc;
  }, {});
  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        Object.keys(values).forEach(
          /* eslint-disable-next-line */
          type => values[type] || delete values[type],
        );
        if (Object.keys(values).length < 1) return;
        const data = new FormData();
        Object.keys(values).forEach(name => {
          data.append(name, values[name]);
        });
        onSubmit(data);
      }}
    >
      {() => (
        <>
          <SyncMessage {...restSelector} />
          <List>
            {documents.map((document, index) => (
              <DocumentItem
                key={document.documentoType}
                {...document}
                Documentos={project.Documentos}
                className={index > 0 ? 'border-top' : ''}
                canUpload={canUpload}
                canConfirm={canConfirm}
                onConfirm={onConfirm}
                loading={loading}
              />
            ))}
          </List>
          {Object.keys(project.Documentos).find(
            docType =>
              project.Documentos[docType] &&
              project.Documentos[docType].no_existed,
          ) &&
            (project.BorradorPromesaState === PROYECTO_DOCUMENT_STATE[0] && (
              <Alert type="warning" className="d-none">
                Se requerira la autorizacion inmediata del Gerente Comercial por
                falta del contrato de corretaje
              </Alert>
            ))}
          {canUpload && (
            <BoxFooter inside>
              <Button loading={loading} type="submit">
                Aceptar
              </Button>
              <Button
                disabled={loading}
                type="reset"
                // onClick={onReset}
                className="ml-2"
                color="white"
              >
                Cancelar
              </Button>
            </BoxFooter>
          )}
        </>
      )}
    </ExForm>
  );
}

LegalForm.propTypes = {
  action: PropTypes.string,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  onSubmit: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default LegalForm;
