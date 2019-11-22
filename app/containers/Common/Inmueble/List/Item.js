/**
 *
 * InmuebleItem
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { inmuebleSortDetail } from '../helper';

function ListItem({ entity = {}, focusChange, onSelect }) {
  return (
    <tr>
      <th scope="row" className="checkbox">
        {onSelect && (
          <span>
            <input
              disabled={
                entity.InmuebleState !== 'Disponible' ||
                (!focusChange && entity.isRequiredRestriction)
              }
              type="checkbox"
              checked={entity.IsSelected}
              onChange={evt => onSelect(entity, evt.currentTarget.checked)}
            />
            {/* eslint-disable-next-line */}
            <label />
          </span>
        )}

        <p className="m-0 p-0 color-main">
          {entity.InmuebleType} {entity.Number}
        </p>
      </th>
      <td className="expand orientation">{inmuebleSortDetail(entity)}</td>
      <td>
        {entity.InmuebleState !== 'Disponible' && (
          <span className="badge badge-danger mr-2">
            {entity.InmuebleState}
          </span>
        )}
        {entity.isRequiredRestriction && (
          <span className="badge badge-warning mr-2">Restricción</span>
        )}
      </td>
      <td>{entity.IsNotUsoyGoce ? 'Tandem' : 'Uso Gose'}</td>
      <td>{entity.Tipologia}</td>
      <td>
        <b>Valor UF</b>
      </td>
      <td>
        <strong>
          <FormattedNumber value={entity.Price} />
        </strong>
      </td>
      <td>
        <span className="color-main icon icon-plant">
          <b>Ver plano</b>
        </span>
      </td>
    </tr>
  );
}

ListItem.propTypes = {
  focusChange: PropTypes.bool,
  entity: PropTypes.object,
  onSelect: PropTypes.func,
};

export default ListItem;
