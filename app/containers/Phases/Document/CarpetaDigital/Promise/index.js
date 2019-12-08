/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { List } from 'components/List';
import DocumentItem from '../../DocumentItem';

export function Promise({ entity, canReview, onReview }) {
  return (
    <List>
      <DocumentItem
        key="maqueta_promesa_word"
        documentoName="Maqueta Promesa Word"
        documentoType="DocumentMaquetaPromesaWord"
        accept="word"
        Documentos={entity.Documents || {}}
        canReview={canReview}
        onReview={onReview}
      />
      <DocumentItem
        key="maqueta_promesa_pdf"
        documentoName="Maqueta Promesa Pdf"
        documentoType="DocumentMaquetaPromesaPdf"
        accept="pdf"
        Documentos={entity.Documents || {}}
        className="border-top"
        firmado
        canReview={canReview}
        onReview={onReview}
      />
    </List>
  );
}

Promise.propTypes = {
  canReview: PropTypes.bool,
  entity: PropTypes.object,
  onReview: PropTypes.func,
};

export default Promise;
