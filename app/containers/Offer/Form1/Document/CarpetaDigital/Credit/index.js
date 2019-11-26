/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { List } from 'components/List';
import documents from '../../documents';
import DocumentItem from '../../DocumentItem';
import { canReviewOffer, canUploadOffer } from '../../../helper';

export function Credit({ offer, onReview }) {
  const canUpload = canUploadOffer(offer);
  const canReview = canReviewOffer(offer);
  return (
    <List>
      {documents
        .filter((document, index) => index > 0)
        .map((document, index) => (
          <DocumentItem
            key={document.documentoType}
            {...document}
            Documentos={offer.Documents || {}}
            className={index > 0 ? 'border-top' : ''}
            canUpload={canUpload}
            canReview={canReview}
            onReview={onReview}
          />
        ))}
    </List>
  );
}

Credit.propTypes = {
  offer: PropTypes.object,
  onReview: PropTypes.func,
};

export default Credit;
