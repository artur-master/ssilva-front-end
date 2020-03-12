/**
 *
 * Project
 *
 */
import React, { useState } from 'react';

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
    acc[document.documentoType] =
      (project.Documentos[document.documentoType]) ?
        project.Documentos[document.documentoType].state : null;
    // acc[document] = null;
    return acc;
  }, {});
  const [isChanged, setIsChanged] = useState(false);
  const onSeleted = () => {
    setIsChanged(true);
  }
  const onReset = () => {
    setIsChanged(false);
  }

  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        let len = 0;
        const keys = Object.keys(values);
        if (canConfirm) {
          const data = {};
          for (let key of keys) {
            if (initialValues[key] !== values[key])
              data[key] = values[key];
              len++;
          }
          if (len > 0) onConfirm(data);
        }
        else {
          const data = new FormData();
          for (let key of keys) {
            if (values[key] && values[key] !== "to_confirm") {
              data.append(key, values[key]);
              len++;
            }
          }
          if (len > 0) onSubmit(data);
        }
        setIsChanged(false);
        /* Commented by Artur - start */
        // Object.keys(values).forEach(
        //   /* eslint-disable-next-line */
        //   type => values[type] || delete values[type],
        // );

        // const data = new FormData();
        // Object.keys(values).forEach(name => {
        //   data.append(name, values[name]);
        // });        
        // onSubmit(data);
        /* Commented by Artur - end */
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
                onConfirm={onSeleted}
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
              <Button loading={loading} disabled={!isChanged} type="submit">
                Aceptar
              </Button>
              <Button
                disabled={loading}
                type="reset"
                onClick={onReset}
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
