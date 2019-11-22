/* eslint-disable jsx-a11y/anchor-has-content */
/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const Item = ({ offer }) => (
  <tr className="font-14 align-middle-group">
    <td className="px-3 main_color">
      <b>Go San Pablo / 013</b>
    </td>
    <td className="px-3">
      <span className="d-block">Depto. 1315 / Est. 91 / Bod. 32</span>
    </td>
    <td className="">Cliente: Christian Campos / 13.564.991-1</td>
    <td />
    <td className="px-3 text-right">
      <a href="#top" className="m-btn font-14 d-inline-block">
        Promesar
      </a>
    </td>
    <td className="font-21 px-3">
      <a href="#top" className="icon icon-dots color-active" />
    </td>
  </tr>
);

Item.propTypes = {
  offer: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};
export default Item;
