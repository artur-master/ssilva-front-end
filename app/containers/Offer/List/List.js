/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import Thead from 'components/Table/Thead';
import Item from './Item';

const List = ({ project, offers, promesas, onQuery, query, dispatch }) => (
  <Box className="mt-3 pb-3">
    {offers && promesas && offers.length < 1 && promesas.length < 1 && <Empty tag="h2" />}
    {((offers && offers.length > 0 ) || (promesas && promesas.length >0)) && (
      <table className="table table-responsive-sm table-fixed table-sm border-bottom">
        <Thead
          ths={[
            { field: 'OfertaID', label: 'Oferta', sortable: true },
            { field: 'Inmuebles', label: 'Inmuebles', className: 'pl-3' },
            { field: 'Cliente', label: 'Cliente', sortable: true },
            { field: 'Date', label: 'Fecha', sortable: true },
            {
              field: 'AprobacionInmobiliariaState',
              label: 'Responsible',
              sortable: true,
            },
            {
              field: 'OfertaState',
              label: 'OfertaState',
              className: 'text-right pr-3',
              sortable: true,
            },
            { field: '', label: '' },
          ]}
          onQuery={onQuery}
          query={query}
        />
        <tbody>
          {offers &&
            offers.map(offer => (
              <Item
                key={offer.OfertaID}
                offer={offer}
                project={project}
                promesa={
                  promesas.length &&
                  (promesas || []).find(
                    promesa => offer.Folio === promesa.Folio,
                  )
                }
                dispatch={dispatch}
              />
            ))}
          {promesas.length &&
            promesas.map(promesa => (
              <Item
                key={promesa.PromesaID}
                project={project}
                promesa={promesas}
                dispatch={dispatch}
                offer={promesa}
              />
            ))}
        </tbody>
      </table>
    )}
  </Box>
);

List.propTypes = {
  offers: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  promesas: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default List;
