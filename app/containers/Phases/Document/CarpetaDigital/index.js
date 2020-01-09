/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Tab from 'components/Tab';
import Button from 'components/Button';
import Alert from 'components/Alert';
import Credit from './Credit';
import Promise from './Promise';
import Offer from './Offer';

export function CarpetaDigital({
  isCollapse,
  canEit,
  canReview,
  entity,
  isReview,
  onReview,
}) {
  return (
    <>
      <Box collapse isOpen={isCollapse}>
        <BoxHeader>
          <b>CARPETA DIGITAL</b>
        </BoxHeader>
        <BoxContent>
          {canEit && (
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
                    canUpload={canEit}
                    canReview={canReview}
                    entity={entity}
                    onReview={onReview}
                  />
                ),
              },
              {
                label: 'PROMESA',
                content: <Promise entity={entity} />,
              },
              {
                label: 'OFERTA',
                content: (
                  <Offer
                    canUpload={canEit}
                    canReview={canReview}
                    entity={entity}
                    onReview={onReview}
                  />
                ),
              },
            ]}
          />
        </BoxContent>
      </Box>
    </>
  );
}

CarpetaDigital.propTypes = {
  isCollapse: PropTypes.bool,
  isReview: PropTypes.bool,
  canEit: PropTypes.bool,
  canReview: PropTypes.bool,
  entity: PropTypes.object,
  onReview: PropTypes.func,
};

export default CarpetaDigital;
