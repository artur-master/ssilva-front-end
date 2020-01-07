/**
 *
 * Quotation
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import FormaDePagoView from 'containers/Phases/FormaDePago/View';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import { Link } from 'react-router-dom';
import DetailView from './Form/DetailView';

export function QuotationView({ quotation, selectorProject }) {
  const { project = {} } = selectorProject;
  const { total, discount } = calculates(quotation);

  return (
    <>
      <h4 className="font-21">{project.Name}</h4>
      <h5 className="mb-3 font-16 d-flex align-items-center justify-content-between">
        <span className="line-height-1">Detalle Cotización</span>
        <span className="font-14 line-height-1">
          {quotation.Folio && <b>FOLIO : {quotation.Folio}</b>}
        </span>
      </h5>

      <DetailView values={quotation} project={project} />
      <Box collapse>
        <BoxHeader>
          <b>FORMA DE PAGO VALOR FINAL UF</b>
          <span className="order-1 mx-4 font-21">
            <b>
              <FormattedNumber value={total - discount} />
            </b>
          </span>
        </BoxHeader>
        <BoxContent>
          <FormaDePagoView values={quotation} />
        </BoxContent>
      </Box>
      <div className="py-3 d-flex align-items-center after-expands-2">
        <Link
          to={`/proyectos/${project.ProyectoID}/reserva/crear?CotizacionID=${
            quotation.CotizacionID
          }`}
          className="font-14-rem shadow-sm m-btn order-3"
        >
          Reserva
        </Link>
        <Link
          to={`/proyectos/${project.ProyectoID}/cotizaciones`}
          className="font-14-rem  shadow-sm m-btn m-btn-white ml-2 order-3"
        >
          Cancelar
        </Link>
      </div>
    </>
  );
}

QuotationView.propTypes = {
  quotation: PropTypes.object,
  selectorProject: PropTypes.object,
};

export default QuotationView;
