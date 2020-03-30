/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import Item from './Item';
import Thead from 'components/Table/Thead';

const List = ({ project, offers, promesas, onQuery, query, dispatch }) => (
  <Box className="mt-3 pb-3">
    {offers && promesas && offers.length < 1 && promesas.length < 1 && <Empty tag="h2" />}
    {((offers && offers.length > 0 ) || (promesas && promesas.length >0)) && (
      <table className="table table-responsive-sm table-fixed table-sm border-bottom">
        <Thead
          ths={[
            { field: 'OfertaID', label: 'Oferta', sortable: true },
            { field: 'Inmuebles', label: 'Inmuebles'},
            { field: 'Cliente', label: 'Cliente', sortable: true },
            { field: 'Date', label: 'Fecha', sortable: true },
            { field: 'OfertaState', label: 'OfertaState', className: "text-right px-3", sortable: true },
            { field: '', label: '' },
          ]}
          onQuery={ onQuery }
          query={ query }
        />
        <tbody>
          {offers.map(offer => (
            <Item
              key={offer.OfertaID}
              offer={offer}
              project={project}
              promesa={(promesas || []).find(promesa => offer.Folio === promesa.Folio)}
              dispatch={dispatch}
            />
          ))}
          {promesas && promesas.map(promesa => (
            <Item
              key={promesa.PromesaID}
              project={project}
              promesa={(promesas)}
              dispatch={dispatch}
              offer = {promesa}
            />
          ))}
        </tbody>
      </table>
    )}
  </Box>
);

List.propTypes = {
  offers: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  promesas: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default List;
