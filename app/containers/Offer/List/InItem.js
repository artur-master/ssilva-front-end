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
import { APROBACION_INMOBILIARIA_STATE } from 'containers/App/constants';

const InItem = ({ project, offer, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { Proyecto, Folio, Inmuebles, Cliente, Condition = [] } = offer;
  const tmpInmuebles = matchRestrictionsFromAList(Inmuebles);

  return (
    <tr className="font-14 align-middle-group">
      <td className="px-3 main_color">
        <b>{`${Proyecto} / ${Folio}`}</b>
      </td>
      <td>
        {tmpInmuebles.map(Inmueble => (
          <div className="d-block" key={Inmueble.InmuebleID}>
            {inmuebleWithRestrictions(Inmueble)}
          </div>
        ))}
      </td>
      <td>Cliente: {clientFullname(Cliente)}</td>
      <td>
        <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
          {offer.AprobacionInmobiliariaState ===
            APROBACION_INMOBILIARIA_STATE[1] && (
            <span className="badge px-2 badge-warning">
              {Condition.length > 0 && 'CONTROL APROBADO CON OBS.'}
              {Condition.length < 1 && 'CONTROL APROBADO'}
            </span>
          )}
          {offer.AprobacionInmobiliariaState ===
            APROBACION_INMOBILIARIA_STATE[2] && (
            <span className="badge px-2 badge-success">CONTROL APROBADO</span>
          )}
          {offer.AprobacionInmobiliariaState ===
            APROBACION_INMOBILIARIA_STATE[3] && (
            <span className="badge px-2 badge-danger">RECHAZADA</span>
          )}
        </div>
      </td>
      <td className="no-whitespace">
        <span>
          <b>FIRMAS</b> |{' '}
          {`${Condition.filter(cond => cond.IsImportant).length} de ${
            Condition.length
          }`}
        </span>
      </td>
      <td className="px-3 font-21">
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
          </DropdownMenu>
        </Dropdown>
      </td>
    </tr>
  );
};

InItem.propTypes = {
  offer: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dispatch: PropTypes.func,
};
export default InItem;
