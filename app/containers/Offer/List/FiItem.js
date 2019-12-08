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
import Button from 'components/Button';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { recepcionGarantia } from 'containers/Offer/Form/FiForm/Garantia/actions';
import makeSelectOfferGarantia from 'containers/Offer/Form/FiForm/Garantia/selectors';
import WithLoading from 'components/WithLoading';
import { RECEPCION_GARANTIA_STATE } from 'containers/App/constants';
import Badge from 'reactstrap/es/Badge';

const SyncMessage = WithLoading();

const FiItem = ({ project, offer, selectorGarantia, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { Proyecto, Folio, Inmuebles, Cliente } = offer;
  const tmpInmuebles = matchRestrictionsFromAList(Inmuebles);
  const { loading, error, success } = selectorGarantia;
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
        <div className=" d-flex justify-content-end align-items-center">
          {offer.RecepcionGarantiaState !== RECEPCION_GARANTIA_STATE[1] &&
            (!success[offer.OfertaID] && (
              <>
                <SyncMessage error={error[offer.OfertaID]} />
                <Button
                  loading={loading[offer.OfertaID]}
                  onClick={() => dispatch(recepcionGarantia(offer.OfertaID))}
                >
                  Recibí Garantía
                </Button>
              </>
            ))}
          {(offer.RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[1] ||
            success[offer.OfertaID]) && (
            <Badge className="p-2" color="success">
              Aprobada
            </Badge>
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

FiItem.propTypes = {
  offer: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  selectorGarantia: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectorGarantia: makeSelectOfferGarantia(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FiItem);
