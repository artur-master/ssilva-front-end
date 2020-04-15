/*
 *
 * Dashboard Pending Action Data
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
const ActionItem = () => {

  return (
    <div className="border-bottom">
      <div className="px-3 py-2 d-flex align-items-center justify-content-between">
        <dl className="font-14-rem m-0">
          <dt className="color-main" style={{fontWeight: '600'}}>Completar información reserva</dt>
           <dd>En espera: 2/5 días</dd>
        </dl>
        <div>
          <a href="#" className="font-14-rem shadow-sm m-btn ml-2 m-btn m-btn-   btn btn-">Ver</a>
        </div>
        </div>
    </div>
  );
};

// Item.propTypes = {
//   offer: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
//   project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
//   dispatch: PropTypes.func,
// };
export default ActionItem;
