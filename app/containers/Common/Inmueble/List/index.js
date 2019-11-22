/**
 *
 * InmuebleItem
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import Table from 'reactstrap/es/Table';
import GroupItems from './Group';
import ListItem from './Item';

function List({ entities = {}, focusChange, onSelectItem }) {
  const showEntities = entities.reduce((acc, entity) => {
    const { InmuebleType, BedroomsQuantity, BathroomQuantity } = entity;

    const key =
      InmuebleType === 'Departamento'
        ? `${BedroomsQuantity} ${
          BedroomsQuantity > 1 ? 'DORMITORIOS' : 'DORMITORIO'
        } / ${BathroomQuantity} ${BathroomQuantity > 1 ? 'BAÑOS' : 'BAÑO'}`
        : InmuebleType;
    acc[key] = acc[key] || [];
    acc[key].push(entity);
    return acc;
  }, {});
  return (
    <div className="accordion">
      {Object.keys(showEntities).map(key => (
        <GroupItems label={key} key={key}>
          <Table responsive>
            <tbody>
              {showEntities[key].map(entity => (
                <ListItem
                  focusChange={focusChange}
                  key={entity.InmuebleID}
                  onSelect={onSelectItem}
                  entity={entity}
                />
              ))}
            </tbody>
          </Table>
        </GroupItems>
      ))}
    </div>
  );
}

List.propTypes = {
  focusChange: PropTypes.bool,
  entities: PropTypes.array,
  onSelectItem: PropTypes.func,
};

export default List;
