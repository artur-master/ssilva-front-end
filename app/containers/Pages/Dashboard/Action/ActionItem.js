/*
 *
 * Dashboard Pending Action Data
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'components/moment';
const ActionItem = (Item) => {
  const { Action } = Item;
  const dateAgo = moment().diff(Action.Date, 'days');
  const user = Action.ApprovedUserInfo;
  return (
    <div className="border-bottom">
      <div className="px-3 py-2 d-flex align-items-center justify-content-between">
        <dl className="font-14-rem m-0">
          <dt className="color-main" style={{ fontWeight: '600' }}>{Action.SaleState}</dt>
          <dd className="m-0">
            {user.Roles[0].Name} {user.Rut}/ {user.Name} {user.LastNames}
          </dd>
          <dd className="m-0">
            En espera: <span className={(dateAgo > 3) ? 'color-warning' : ''}>{dateAgo}/3 días</span>
          </dd>
        </dl>
        <div>
          <a href="#" className="font-14-rem shadow-sm m-btn ml-2 m-btn m-btn-   btn btn-">Ver</a>
        </div>
      </div>
    </div>
  );
};

ActionItem.propTypes = {
  Item: PropTypes.object,
};
export default ActionItem;
