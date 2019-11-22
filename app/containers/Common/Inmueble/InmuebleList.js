/**
 *
 * InmuebleList
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import InmuebleFilter from './InmuebleFilter';
import Grid from './Grid/index';
import List from './List/index';

const InmuebleList = ({
  defaultShowType = 'list',
  selector,
  children,
  focusChange,
  onSelectItem,
}) => {
  const { entities, selected } = selector;
  const [showEntities, setState] = useState(entities);

  useEffect(() => {
    setState(
      showEntities.map(entity => ({
        ...entity,
        IsSelected: !!selected.find(
          item => item.InmuebleID === entity.InmuebleID,
        ),
      })),
    );
  }, [selector.selected]);

  const [showType, setShowType] = useState(defaultShowType);
  const handleChangeQuery = query => {
    setState(
      entities.filter(entity => {
        const {
          TerraceSquareMeters = 0,
          UtilSquareMeters = 0,
          LodgeSquareMeters = 0,
          Price,
          Orientation = [],
          Floor,
          TipologiaID,
          InmuebleTypeID,
        } = entity;

        const totalSquare =
          TerraceSquareMeters + UtilSquareMeters + LodgeSquareMeters;
        return (
          query.rangeSquare[0] <= totalSquare &&
          query.rangeSquare[1] >= totalSquare &&
          query.rangePrice[0] <= Price &&
          query.rangePrice[1] >= Price &&
          Orientation.find(
            item =>
              !query.orientation || item.OrientationID === query.orientation,
          ) &&
          (!query.floor || Floor === parseInt(query.floor, 10)) &&
          (!query.subtype || TipologiaID === query.subtype) &&
          (!query.type || InmuebleTypeID === query.type)
        );
      }),
    );
  };

  let Child = List;
  if (showType === 'grid') Child = Grid;
  return (
    <>
      <InmuebleFilter entities={entities} onQuery={handleChangeQuery} />
      {children}
      <div className="d-flex p-3 justify-content-end">
        <Button
          color="white"
          disabled={showType === 'list'}
          onClick={() => setShowType('list')}
        >
          list
        </Button>
        <Button
          color="white"
          disabled={showType === 'grid'}
          onClick={() => setShowType('grid')}
        >
          grid
        </Button>
      </div>
      <Child
        focusChange={focusChange}
        entities={showEntities}
        selected={selected}
        onSelectItem={onSelectItem}
      />
    </>
  );
};

InmuebleList.propTypes = {
  defaultShowType: PropTypes.string,
  focusChange: PropTypes.bool,
  selector: PropTypes.object,
  children: PropTypes.node,
  onSelectItem: PropTypes.func,
};

export default InmuebleList;
