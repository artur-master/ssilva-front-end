/**
 *
 * Quotation List
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import Empty from 'components/Empty';
import Item from './Item';
import { searchQuotations } from './actions';
import Filter from './Filter';

const List = ({ quotations, filter, reports, project, dispatch }) => (
  <div>
    <Filter
      reports={reports}
      project={project}
      filter={filter}
      searchQuotations={txtSearch => dispatch(searchQuotations(txtSearch))}
    />
    <Box className="mt-3 pt-3 pb-3">
      {quotations && quotations.length < 1 && <Empty tag="h2" />}
      {quotations && quotations.length > 0 && (
        <table className="table table-responsive-sm table-fixed table-sm border-bottom">
          <tbody>
            {quotations.map(item => (
              <Item
                key={item.CotizacionID}
                quotation={item}
                dispatch={dispatch}
              />
            ))}
          </tbody>
        </table>
      )}
    </Box>
  </div>
);

List.propTypes = {
  filter: PropTypes.object,
  reports: PropTypes.object,
  quotations: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  project: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatch: PropTypes.func,
};
export default List;
