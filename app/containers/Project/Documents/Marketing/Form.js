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
import documents from './documents';
import DocumentItem from '../DocumentItem';
import { canConfirmDocument, canUploadDocument } from '../../helper';

const SyncMessage = WithLoading();
export function MarketingForm({
  action,
  selector,
  selectorProject,
  onSubmit,
  onConfirm,
}) {
  const { project = {} } = selectorProject;
  const { loading, ...restSelector } = selector;
  const canConfirm = canConfirmDocument(project);
  const canUpload =
    canUploadDocument('marketing', project) && action !== 'view';
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

MarketingForm.propTypes = {
  action: PropTypes.string,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  onSubmit: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default MarketingForm;
