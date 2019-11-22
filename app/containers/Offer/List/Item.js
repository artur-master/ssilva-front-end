/* eslint-disable jsx-a11y/anchor-has-content */
/**
 *
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { inmuebleWithRestrictions } from 'containers/Common/Inmueble/helper';
import moment from 'components/moment';

const Item = ({ project, offer, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { Proyecto, Folio, Inmuebles, OfertaState, Date } = offer;
  let ColorBadge = 'badge-caution';

  switch (OfertaState) {
    case 'Rechazada por legal':
      ColorBadge = 'badge-success';
      break;
    case 'Promesa':
      ColorBadge = '';
      break;
    case 'Pendiente legal':
      ColorBadge = 'badge-warning';
      break;
    case 'Pendiente aprobaciones':
      ColorBadge = 'badge-caution';
      break;
    case 'Cancelada':
      ColorBadge = 'badge-warning';
      break;
    default:
      ColorBadge = '';
      break;
  }
  let dateAgo;
  if (
    OfertaState === 'Pendiente legal' ||
    OfertaState === 'Pendiente aprobaciones'
  ) {
    dateAgo = moment(Date).fromNow();
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
        Cliente: {offer.ClienteName} {offer.ClienteLastNames} /{' '}
        {offer.ClienteRut}
      </td>
      <td />
      <td className="px-3">
        <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
          {dateAgo && (
            <span className="badge px-2 badge-danger icon icon-alert mr-2">
              <span>{dateAgo.toUpperCase()}</span>
            </span>
          )}
          <span className={`badge px-2 ${ColorBadge}`}>
            {OfertaState.toUpperCase()}
          </span>
          {OfertaState === 'Pendiente aprobaciones' && (
            <>
              <span className="badge px-2 badge-success rounded-0">IN</span>
              <span className="badge px-2 badge-danger rounded-0">FI</span>
              <span className="badge px-2 badge-success rounded-0">AC</span>
            </>
          )}
        </div>
      </td>
      <td className="font-21 px-3">
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen(!dropdownOpen)}
        >
          <DropdownToggle tag="a" className="icon icon-dots main_color ml-1" />
          <DropdownMenu right>
            <DropdownItem
              tag="a"
              onClick={() => {
                dispatch(
                  push(
                    `/proyectos/${project.ProyectoID}/ofertas/edit?OfertaID=${
                      offer.OfertaID
                    }`,
                  ),
                );
              }}
            >
              Ver datos
            </DropdownItem>
            <DropdownItem
              tag="a"
              onClick={() =>
                dispatch(
                  push(
                    `/proyectos/${project.ProyectoID}/ofertas/edit?OfertaID=${
                      offer.OfertaID
                    }`,
                  ),
                )
              }
            >
              Editar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
};

Item.propTypes = {
  offer: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default Item;
