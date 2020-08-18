/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Tab from 'components/Tab';
import Alert from 'components/Alert';
import { isCreditPayment } from 'containers/App/helpers';
import Credit from 'containers/Phases/Document/CarpetaDigital/Credit';
import Promise from 'containers/Phases/Document/CarpetaDigital/Promise';
import Offer from 'containers/Phases/Document/CarpetaDigital/Offer';
import Button from 'components/Button';

export function CarpetaDigital({
  isCollapse,
  canEit,
  canReview,
  entity,
  onReview,
}) {
  const download = () =>{
    console.log("PJW");
  }
  const tabs = [
    {
      label: 'PROMESA',
      content: <Promise entity={entity} />,
    },
    {
      label: 'OFERTA',
      content: <Offer canUpload={canEit} entity={entity} />,
    },
  ];

  if(isCreditPayment(entity.PayType)){
    tabs.unshift(
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
      });
  }  

  return (
    <>
      <Box collapse isOpen={isCollapse}>
        <BoxHeader>
          <b>CARPETA DIGITAL</b>
        </BoxHeader>
        <BoxContent>
          <Alert type="warning">
            Debes descargar los documentos a modificar y volver a cargarlos firmados.
          </Alert>
          <div className="position-relative">
            <Button className="m-btn-white m-btn-download m-btn-absolute-right-top" onClick={download}>
              Descargar Documentos
            </Button>
            <Tab
              tabs={tabs}
            />
          </div>
        </BoxContent>
      </Box>
    </>
  );
}

CarpetaDigital.propTypes = {
  isCollapse: PropTypes.bool,
  canEit: PropTypes.bool,
  canReview: PropTypes.bool,
  entity: PropTypes.object,
  onReview: PropTypes.func,
};

export default CarpetaDigital;
