/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import FiItem from './FiItem';
import { isPendienteContacto } from '../helper';

const FiList = ({ project, offers, dispatch }) => (
  <Box className="mt-3 pt-3 pb-3">
    {offers.length < 1 && <Empty tag="h2" />}
    {offers.length > 0 && (
      <table className="table table-responsive-sm table-fixed table-sm border-bottom">
        <tbody>
          {offers
            .filter(offer => !isPendienteContacto(offer))
            .map(offer => (
              <FiItem
                key={offer.OfertaID}
                offer={offer}
                project={project}
                dispatch={dispatch}
              />
            ))}
        </tbody>
      </table>
    )}
  </Box>
);

FiList.propTypes = {
  offers: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default FiList;
