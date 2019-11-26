/**
 *
 * Offer Upload Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Tab from 'components/Tab';
import Button from 'components/Button';
import Alert from 'components/Alert';
import documents from '../documents';
import Credit from './Credit';
import Promise from './Promise';
import Offer from './Offer';
import CarpetaDigitalUploadActions from './UploadActions';
import { canReviewOffer, canUploadOffer } from '../../helper';
import CarpetaDigitalReviewActions from './ReviewActions';

export function CarpetaDigital({
  selector,
  offer,
  form,
  onCancel,
  onControlReview,
}) {
  const canUpload = canUploadOffer(offer);
  const canReview = canReviewOffer(offer);
  const [reviews, setReviews] = useState(
    documents.reduce((acc, document) => {
      if (document.documentoType === 'DocumentPagoGarantia')
        acc[document.documentoType] = true;
      else acc[document.documentoType] = false;
      return acc;
    }, {}),
  );

  const isReview = !Object.keys(reviews).find(
    documentoType => !reviews[documentoType],
  );

  return (
    <>
      <Box collapse>
        <BoxHeader>
          <b>CARPETA DIGITAL</b>
        </BoxHeader>
        <BoxContent>
          {canUpload && (
            <div className="p-3">
              <div className="row m-0">
                <div className="col border-bottom p-0">
                  <span className="font-16-rem color-regular pb-2 d-block">
                    <strong>Carga de Documentos</strong>
                  </span>
                </div>
                <div className="col-auto p-0 d-flex align-items-center">
                  <span className="font-14-rem color-em mr-2">
                    <em>
                      Debes Imprimir los documentos, firmarlos y cargarlos al
                      sistema:
                    </em>
                  </span>
                  <Button className="font-14-rem no-whitespace m-btn m-btn-white m-btn-printer">
                    Imprimir Documentos
                  </Button>
                </div>
              </div>
            </div>
          )}
          {canReview && !isReview && (
            <Alert type="warning">
              Debes revisar los documentos y si es sujeto a crédito
            </Alert>
          )}
          <Tab
            tabs={[
              {
                label: 'CRÉDITO',
                content: (
                  <Credit
                    selector={selector}
                    offer={offer}
                    onReview={(documentoType, review) =>
                      setReviews({ ...reviews, [documentoType]: review })
                    }
                  />
                ),
              },
              {
                label: 'PROMESA',
                content: <Promise />,
              },
              {
                label: 'OFERTA',
                content: <Offer />,
              },
            ]}
          />
        </BoxContent>
        {canUpload && (
          <CarpetaDigitalUploadActions
            onCancel={onCancel}
            offer={offer}
            selector={selector}
            form={form}
          />
        )}
        {canReview && (
          <CarpetaDigitalReviewActions
            isReview={isReview}
            onCancel={onCancel}
            selector={selector}
            onControlReview={onControlReview}
          />
        )}
      </Box>
    </>
  );
}

CarpetaDigital.propTypes = {
  form: PropTypes.object,
  selector: PropTypes.object,
  offer: PropTypes.object,
  onCancel: PropTypes.func,
  onControlReview: PropTypes.func,
};

export default CarpetaDigital;
