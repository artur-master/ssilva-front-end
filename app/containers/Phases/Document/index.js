/**
 *
 * Reservation Doc Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form as ExForm } from 'components/ExForm';
import WithLoading from 'components/WithLoading';
import { Auth } from 'containers/App/helpers';
import Garantia from './Garantia';
import CarpetaDigital from './CarpetaDigital';
import { getDocuments } from './documents';
import CarpetaDigitalUploadActions from './UploadActions';
import CarpetaDigitalReviewActions from './ReviewActions';

const SyncMessage = WithLoading();

export function PhaseDocument({
  isCollapse = false,
  entity,
  selector,
  canUpload,
  canReview,
  onSave,
  onSendControl,
  onCancel,
  onControlReview,
  onGarantia,
  onPrint,
  promesa,
}) {
  const documents = getDocuments(entity);
  const initialValues = documents.reduce(
    (acc, document) => {
      acc[document.documentoType] = null;
      return acc;
    },
    { Folio: entity.Folio, Condition: [] },
  );
  const [reviews, setReviews] = useState(
    documents.reduce((acc, document) => {
      if (document.documentoType === 'DocumentPagoGarantia')
        acc[document.documentoType] = true;
      else acc[document.documentoType] = false;
      return acc;
    }, {}),
  );

  const isReview = !Object.keys(reviews).find(
    documentoType => !reviews[documentoType] && entity.Documents[documentoType],
  );

  return (
    <ExForm initialValues={initialValues} onSubmit={onSave}>
      {form => (
        <>
          {(Auth.isPM() || Auth.isVendor()) && (
            <Garantia
              isCollapse={isCollapse}
              entity={entity}
              canUpload={canUpload}
              onGarantia={onGarantia}
              onCancel={onCancel}
              promesa={promesa}
            />
          )}
          <CarpetaDigital
            isCollapse={isCollapse}
            entity={entity}
            form={form}
            isReview={isReview}
            canEit={canUpload}
            canReview={canReview}
            onReview={(documentoType, review) =>
              setReviews({ ...reviews, [documentoType]: review })
            }
            onPrint={onPrint}
          />
          {canUpload && (
            <CarpetaDigitalUploadActions
              entity={entity}
              onCancel={onCancel}
              // onSave={() => onSave(form.values)}
              selector={selector}
              form={form}
              onSendControl={() => onSendControl(form.values)}
            />
          )}
          {canReview && (
            <CarpetaDigitalReviewActions
              form={form}
              isReview={isReview}
              selector={selector}
              entity={entity}
              onControlReview={onControlReview}
            />
          )}
          <div className="mt-3">
            <SyncMessage {...selector} />
          </div>
        </>
      )}
    </ExForm>
  );
}

PhaseDocument.propTypes = {
  isCollapse: PropTypes.bool,
  canUpload: PropTypes.bool,
  canReview: PropTypes.bool,
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSave: PropTypes.func, // save reservar
  onSendControl: PropTypes.func, // send control
  onCancel: PropTypes.func, // cancel reservar
  onControlReview: PropTypes.func, // approve/reject
  onGarantia: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  promesa: PropTypes.bool,
};

export default PhaseDocument;
