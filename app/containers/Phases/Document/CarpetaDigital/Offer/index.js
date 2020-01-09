/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { List } from 'components/List';
import DocumentItem from '../../DocumentItem';

export function Offer({ entity, canUpload, canReview, onReview }) {
  const documents = [
    {
      documentoName: 'Oferta',
      documentoType: 'DocumentOferta',
      autoGenerate: true,
    },
    {
      documentoName: 'Oferta Firmada',
      documentoType: 'DocumentOfertaFirmada',
      firmado: true
    },
  ];
  return (
    <List>
      {documents.map((document, index) => (
        <DocumentItem
          key={document.documentoType}
          {...document}
          required={document.required}
          Documentos={entity.Documents || {}}
          className={index > 0 ? 'border-top' : ''}
          canUpload={canUpload}
          canReview={canReview}
          onReview={onReview}
        />
      ))}
    </List>
  );
}

Offer.propTypes = {
  canUpload: PropTypes.bool,
  canReview: PropTypes.bool,
  entity: PropTypes.object,
  onReview: PropTypes.func,
};

export default Offer;
