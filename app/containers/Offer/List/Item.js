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
import {
  inmuebleWithRestrictions,
  matchRestrictionsFromAList,
} from 'containers/Common/Inmueble/helper';
import { clientFullname } from 'containers/Common/Client/helper';
import { canEditOffer } from '../Form/helper';

const Item = ({ project, offer, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { Proyecto, Folio, Inmuebles, OfertaStateFormat = [], Cliente } = offer;
  const tmpInmuebles = matchRestrictionsFromAList(Inmuebles);

  return (
    <tr className="font-14 align-middle-group">
      <td className="px-3 main_color">
        <b>{`${Proyecto} / ${Folio}`}</b>
      </td>
      <td className="px-3">
        {tmpInmuebles.map(Inmueble => (
          <div className="d-block" key={Inmueble.InmuebleID}>
            {inmuebleWithRestrictions(Inmueble)}
          </div>
        ))}
      </td>
      <td className="">Cliente: {clientFullname(Cliente)}</td>
      <td />
      <td className="px-3">
        <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
          {OfertaStateFormat.map((state, index) => (
            <span
              key={String(index)}
              className={`badge px-2 ${state.Color} ${
                index > 0 ? 'rounded-0' : ''
              } ${
                index === 0 && OfertaStateFormat.length > 1
                  ? 'rounded-left rounded-0'
                  : ''
              }`}
            >
              {state.Label.toUpperCase()}
            </span>
          ))}
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
                    `/proyectos/${project.ProyectoID}/oferta?OfertaID=${
                      offer.OfertaID
                    }`,
                  ),
                );
              }}
            >
              Ver datos
            </DropdownItem>
            {canEditOffer(offer) && (
              <DropdownItem
                tag="a"
                onClick={() =>
                  dispatch(
                    push(
                      `/proyectos/${project.ProyectoID}/oferta/edit?OfertaID=${
                        offer.OfertaID
                      }`,
                    ),
                  )
                }
              >
                Editar
              </DropdownItem>
            )}
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
