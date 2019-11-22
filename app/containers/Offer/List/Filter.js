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
import Badge from 'reactstrap/es/Badge';

const Filter = ({ filter, searchOffers }) => {
  let statusLable = '';
  switch (filter.status) {
    case '':
      statusLable = 'Todas';
      break;
    case 'Oferta':
      statusLable = 'Oferta';
      break;
    default:
      statusLable = filter.status;
  }
  return (
    <nav className="search-bar-02 d-flex align-items-center justify-content-end after-expands-2">
      {/* <Button className="order-1 m-btn-plus m-btn-white mr-2">
      Crear Nueva Oferta
    </Button> */}
      <UncontrolledButtonDropdown className="order-3 mr-2">
        <DropdownToggle caret className="m-btn m-btn-white dropdown-toggle m-1">
          Filtrar {statusLable}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            className="d-flex align-items-center font-14"
            onClick={() => searchOffers({ status: '' })}
          >
            <b className="w-100">Todas</b>
            <Badge color="secondary d-none" className="ml-2">
              0
            </Badge>
          </DropdownItem>
          <DropdownItem
            className="d-flex align-items-center font-14"
            onClick={() => searchOffers({ status: 'Rechazada por legal' })}
          >
            <b className="w-100">Rechazada por Legal</b>
            <Badge color="secondary d-none" className="ml-2">
              0
            </Badge>
          </DropdownItem>
          <DropdownItem
            className="d-flex align-items-center font-14"
            onClick={() => searchOffers({ status: 'Pendiente legal' })}
          >
            <b className="w-100">Pendiente Legal</b>
            <Badge color="secondary d-none" className="ml-2">
              0
            </Badge>
          </DropdownItem>
          <DropdownItem
            className="d-flex align-items-center font-14"
            onClick={() => searchOffers({ status: 'Pendiente aprobaciones' })}
          >
            <b className="w-100">Pendiente Aprobación</b>
            <Badge color="secondary d-none" className="ml-2">
              0
            </Badge>
          </DropdownItem>
          <DropdownItem
            className="d-flex align-items-center font-14"
            onClick={() => searchOffers({ status: 'Promesa' })}
          >
            <b className="w-100">Promesar</b>
            <Badge color="secondary d-none" className="ml-2">
              0
            </Badge>
          </DropdownItem>
          <DropdownItem
            className="d-flex align-items-center font-14"
            onClick={() => searchOffers({ status: 'Cancelada' })}
          >
            <b className="w-100">Cancelada</b>
            <Badge color="secondary d-none" className="ml-2">
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
          onChange={evt =>
            searchOffers({ textSearch: evt.currentTarget.value })
          }
          placeholder="Escribe lo que deseas buscar..."
        />
      </div>
    </nav>
  );
};

Filter.propTypes = {
  filter: PropTypes.object,
  searchOffers: PropTypes.func,
};
export default Filter;
