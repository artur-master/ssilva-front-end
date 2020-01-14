/**
 *
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { inmuebleWithRestrictions } from 'containers/Common/Inmueble/helper';

const Item = ({ quotation, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    CotizacionID,
    ProyectoID,
    Proyecto,
    Folio,
    Cliente = {},
    Inmuebles = [],
    CotizacionState,
    Date,
  } = quotation;

  let ColorBadge = 'badge-caution';
  switch (CotizacionState) {
    case 'Reserva':
      ColorBadge = 'badge-success';
      break;
    case 'Vigente':
      ColorBadge = 'badge-danger';
      break;
    default:
      ColorBadge = 'badge-caution';
      break;
  }

  return (
    <tr className="font-14 align-middle-group">
      <td className="px-3 main_color">
        <b>{`${Proyecto} / ${Folio}`}</b>
      </td>
      <td className="px-3">
        {Inmuebles.map(Inmueble => (
          <div className="d-block" key={Inmueble.InmuebleID}>
            {inmuebleWithRestrictions(Inmueble)}
          </div>
        ))}
      </td>
      <td className="">
        Cliente: {Cliente.Name} {Cliente.LastNames} / {Cliente.Rut}
      </td>
      <td>{Date}</td>
      <td className="px-3">
        <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
          <span className={`badge ${ColorBadge} px-2`}>{CotizacionState}</span>
        </div>
      </td>
      <td className="px-3 text-right">
        {CotizacionState !== 'Reserva' && (
          <Link
            to={`/proyectos/${ProyectoID}/reserva/crear?CotizacionID=${CotizacionID}`}
            className="m-btn font-14 d-inline-block"
          >
            Reserva
          </Link>
        )}
      </td>
      <td className="font-21 px-3">
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen(!dropdownOpen)}
        >
          <DropdownToggle tag="a" className="icon icon-dots main_color ml-1" />
          <DropdownMenu right positionFixed>
            <DropdownItem
              tag="a"
              onClick={() => {
                dispatch(
                  push(`/proyectos/${ProyectoID}/cotizacion/${CotizacionID}`),
                );
              }}
            >
              Ver datos
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
};

Item.propTypes = {
  quotation: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default Item;
