/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import Item from './Item';

const List = ({ offers }) => (
  <Box className="mt-3 pt-3 pb-3">
    {offers && offers.length < 1 && <Empty tag="h2" />}
    {offers && offers.length > 0 && (
      <table className="table table-responsive-sm table-fixed table-sm border-bottom">
        <tbody>
          {offers.map(offer => (
            <Item offer={offer} />
          ))}
        </tbody>
      </table>
    )}
  </Box>
);

List.propTypes = {
  offers: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};
export default List;
