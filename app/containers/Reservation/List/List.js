/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import Item from './Item';

const List = ({ project, reservations, dispatch }) => (
  <Box className="mt-3 pt-3 pb-3">
    {reservations && reservations.length < 1 && <Empty tag="h2" />}
    {reservations && reservations.length > 0 && (
      <table className="table table-responsive-sm table-fixed table-sm border-bottom">
        <tbody>
          {reservations.map(reservation => (
            <Item
              key={reservation.ReservaID}
              reservation={reservation}
              project={project}
              dispatch={dispatch}
            />
          ))}
        </tbody>
      </table>
    )}
  </Box>
);

List.propTypes = {
  reservations: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default List;
