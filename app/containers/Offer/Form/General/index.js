/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Offer Inmueble Form
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from 'components/Button';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { stringToBoolean } from 'containers/App/helpers';
import { createStructuredSelector } from 'reselect';
import makeSelectClient from 'containers/Common/Client/selectors';
import makeSelectUser from 'containers/Common/User/selectors';
import GeneralForm from './GeneralForm';
import { updateOffer } from '../actions';
import { canConfirmOffer, canEditOffer } from '../helper';

export function OfferGeneralForm({
  onConfirm,
  selectorClients,
  selectorUsers,
  preload,
  offer,
  dispatch,
}) {
  useEffect(() => {
    if (selectorUsers.users && offer.VendedorID) {
      dispatch(
        updateOffer({
          Vendedor: selectorUsers.users.find(
            user => user.UserID === offer.VendedorID,
          ),
        }),
      );
    }
  }, [offer.VendedorID]);

  const [isOpen, setOpen] = useState(false);
  const canEdit = canEditOffer(offer);
  const canConfirm = canConfirmOffer(offer);
  const {
    Vendedor = {},
    DateFirmaPromesa,
    CotizacionType,
    IsNotInvestment,
  } = offer;

  const { Name, Rut, FindingTypeID, ContactMethodTypeID } = offer.Cliente || {};

  return (
    <Box collapse isOpen={false}>
      <BoxHeader>
        <b>DATOS GENERALES</b>
        {canConfirm && (
          <div className="d-flex align-items-center mr-3 order-3">
            <div className="checkbox-01 checkbox-medium">
              <span>
                <input
                  type="checkbox"
                  onChange={evt => {
                    onConfirm('general', evt.currentTarget.checked);
                  }}
                />
                <label />
              </span>
            </div>
            <span>
              <b>Confirmar</b>
            </span>
          </div>
        )}
        {canEdit && (
          <Button
            color="white"
            className="m-btn-pen order-3"
            onClick={() => setOpen(true)}
          >
            Editar
          </Button>
        )}
      </BoxHeader>
      <BoxContent>
        <ul className="row m-0 p-0">
          <li className="col-md-6 d-flex align-items-center my-2">
            <span
              className="font-14-rem color-regular mr-3"
              style={{ width: '8.5em' }}
            >
              <b>Vendedor</b>
            </span>
            <span className="font-14-rem color-regular">{Vendedor.Name}</span>
          </li>

          <li className="col-md-6 d-flex align-items-center my-2">
            <span
              className="font-14-rem color-regular mr-3"
              style={{ width: '8.5em' }}
            >
              <b>Cliente</b>
            </span>
            <span className="font-14-rem color-regular">
              {Name} / {Rut}
            </span>
          </li>

          <li className="col-md-6 d-flex align-items-center my-2">
            <span
              className="font-14-rem color-regular mr-3"
              style={{ width: '8.5em' }}
            >
              <b>Fecha</b>
            </span>
            <span className="font-14-rem color-regular">
              {moment(DateFirmaPromesa).format('MM-DD-YYYY')}
            </span>
          </li>
          {CotizacionType ===
            preload.quotationUtils.CotizacionTypes[0].Name && (
            <>
              <li className="col-md-6 d-flex align-items-center my-2">
                <span
                  className="font-14-rem color-regular mr-3"
                  style={{ width: '8.5em' }}
                >
                  <b>Interés del Cliente</b>
                </span>
                <span className="font-14-rem color-regular">
                  {stringToBoolean(IsNotInvestment) ? 'Vivienda' : 'Inversión'}
                </span>
              </li>

              <li className="col-md-6 d-flex align-items-center my-2">
                <span
                  className="font-14-rem color-regular mr-3"
                  style={{ width: '8.5em' }}
                >
                  <b>Cómo se Enteró</b>
                </span>
                <span className="font-14-rem color-regular">
                  {FindingTypeID &&
                    preload.quotationUtils.FindingTypes.find(
                      item => item.FindingTypeID === FindingTypeID,
                    ).Name}
                </span>
              </li>
            </>
          )}

          {CotizacionType ===
            preload.quotationUtils.CotizacionTypes[1].Name && (
            <li className="col-md-6 d-flex align-items-center my-2">
              <span
                className="font-14-rem color-regular mr-3"
                style={{ width: '8.5em' }}
              >
                <b>Medio de Contacto</b>
              </span>
              <span className="font-14-rem color-regular">
                {ContactMethodTypeID &&
                  preload.quotationUtils.ContactMethodTypes.find(
                    item => item.ContactMethodTypeID === ContactMethodTypeID,
                  ).Name}
              </span>
            </li>
          )}
        </ul>
      </BoxContent>
      <GeneralForm
        preload={preload}
        inputvalues={offer}
        onHide={entity => {
          dispatch(
            updateOffer({
              ...entity,
              Cliente: {
                ...entity.Cliente,
                ...selectorClients.clients.find(
                  client => client.UserID === entity.Cliente.UserID,
                ),
              },
              ClienteID: entity.Cliente.UserID,
            }),
          );
          setOpen(false);
        }}
        isOpen={isOpen}
      />
    </Box>
  );
}

OfferGeneralForm.propTypes = {
  offer: PropTypes.object,
  preload: PropTypes.object,
  dispatch: PropTypes.func,
  selectorClients: PropTypes.object,
  selectorUsers: PropTypes.object,
  onConfirm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectorClients: makeSelectClient(),
  selectorUsers: makeSelectUser(),
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

export default compose(withConnect)(OfferGeneralForm);
