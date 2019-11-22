/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Button from 'components/Button';
import Badge from 'reactstrap/es/Badge';

const Filter = ({ searchOffers }) => (
  <nav className="search-bar-02 d-flex align-items-center justify-content-end after-expands-2">
    <UncontrolledButtonDropdown className="order-3 mr-2">
      <DropdownToggle caret className="m-btn m-btn-white dropdown-toggle m-1">
        Filtrar Ofertas
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem className="d-flex align-items-center font-14">
          <b className="w-100">Todas</b>
          <Badge color="secondary" className="ml-2">
            0
          </Badge>
        </DropdownItem>
        <DropdownItem className="d-flex color-active align-items-center font-14">
          <b className="w-100">Inicial</b>
          <Badge color="secondary" className="ml-2">
            0
          </Badge>
        </DropdownItem>
        <DropdownItem className="d-flex align-items-center font-14">
          <b className="w-100">Pendiente Contacto</b>
          <Badge color="secondary" className="ml-2">
            0
          </Badge>
        </DropdownItem>
        <DropdownItem className="d-flex align-items-center font-14">
          <b className="w-100">Pendiente Aprobación</b>
          <Badge color="secondary" className="ml-2">
            0
          </Badge>
        </DropdownItem>
        <DropdownItem className="d-flex align-items-center font-14">
          <b className="w-100">Promesar</b>
          <Badge color="secondary" className="ml-2">
            0
          </Badge>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
    <div
      className="order-4 search-filter icon icon-search m-1 w-50"
      style={{ maxWidth: 300 }}
    >
      <Input
        className="form-control form-control-sm"
        type="text"
        onChange={evt => searchOffers(evt.target.value)}
        placeholder="Escribe lo que deseas buscar..."
      />
    </div>
  </nav>
);

Filter.propTypes = {
  searchOffers: PropTypes.func,
};
export default Filter;
