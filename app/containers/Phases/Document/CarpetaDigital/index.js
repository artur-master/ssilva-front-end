/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Tab from 'components/Tab';
import Button from 'components/Button';
import Alert from 'components/Alert';
import Credit from './Credit';
import Promise from './Promise';
import Offer from './Offer';
import { Codeudor } from './Codeudor';

export function CarpetaDigital({
  isCollapse,
  canEit,
  canReview,
  entity,
  isReview,
  onReview,
  onPrint,
  form,
}) {
  const { values } = form;
  const [canPrint, setCanPrint] = useState(true);

  useEffect(() => {
    setCanPrint( true );
  }, [values]);
  
  useEffect(() => {
    setCanPrint( !(entity.ReservaID) );
  }, []);

  useEffect(() => {
    if(entity.ReservaID)  setCanPrint( false );
  }, [entity]);
  const tabs = [
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
    // {
    //   label: 'PROMESA',
    //   content: <Promise entity={entity} />,
    // },
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
  ];
  const codeudor_document = 
  {
    label: 'Codeudor',
    content: (
      <Codeudor
        canUpload={canEit}
        canReview={canReview}
        entity={entity}
        onReview={onReview}
      />
    ),
  };
  if(entity.Codeudor)
    tabs.push(codeudor_document)
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
                  <Button className="font-14-rem no-whitespace m-btn m-btn-white m-btn-printer"
                    disabled={ false } 
                    onClick={()=>{
                      onPrint();
                    }}
                  >
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
            tabs={tabs}
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
