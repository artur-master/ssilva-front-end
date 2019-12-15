/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import Item from './Item';

const List = ({ project, promesas, dispatch }) => (
  <Box className="mt-3 pt-3 pb-3">
    {promesas && promesas.length < 1 && <Empty tag="h2" />}
    {promesas && promesas.length > 0 && (
      <table className="table table-responsive-sm table-fixed table-sm border-bottom">
        <tbody>
          {promesas.map(promesa => (
            <Item
              key={promesa.PromesaID}
              promesa={promesa}
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
  promesas: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default List;
