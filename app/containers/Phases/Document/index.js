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
import { getDocuments, CodeudorDocuments } from './documents';
import CarpetaDigitalUploadActions from './UploadActions';
import CarpetaDigitalReviewActions from './ReviewActions';
import CarpetaDigitalAproveActions from './AproveActions';

const SyncMessage = WithLoading();

export function PhaseDocument({
  isCollapse = false,
  entity,
  selector,
  canUpload,
  canReview,
  canApprove,
  onSave,
  onSendControl,
  onCancel,
  onControlReview,
  onAproveModification,
  onGarantia,
  onPrint,
  promesa,
}) {
  const documents = getDocuments(entity);
  const co_documents = CodeudorDocuments(entity);

  const initialValues = documents.concat(co_documents).reduce(
    (acc, document) => {
      acc[document.documentoType] = null;
      return acc;
    },
    { Folio: entity.Folio, Condition: [] },
  );
  const [reviews, setReviews] = useState(
    documents.reduce((acc, document) => {
      if (document.documentoType === 'DocumentPagoGarantia' ||
          document.autoGenerate )
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
          {(Auth.isPM() || Auth.isVendor() || Auth.isAC()) && (
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
            canEdit={canUpload}
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
              onSave={(values) => {
                entity.sendControl=false;
                form.submitForm(false);
              }}
              selector={selector}
              form={form}
              onSendControl={(values) => {
                entity.sendControl=true;
                form.submitForm();
                // onSendControl(values)
              }}
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
          {canApprove && (
            <CarpetaDigitalAproveActions
              selector={selector}
              onAproveModification={onAproveModification}
              onCancel={onCancel}
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
  canApprove: PropTypes.bool,
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSave: PropTypes.func, // save reservar
  onSendControl: PropTypes.func, // send control
  onCancel: PropTypes.func, // cancel reservar
  onControlReview: PropTypes.func, // approve/reject
  onAproveModification: PropTypes.func, //approve modification oferta
  onGarantia: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  promesa: PropTypes.bool,
};

export default PhaseDocument;
