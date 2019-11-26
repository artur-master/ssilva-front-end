/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Offer Client Form
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from 'components/Button';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import makeSelectClient from 'containers/Common/Client/selectors';
import { toggleScreen, saveClient } from 'containers/Common/Client/actions';
import ClientForm from './ClientForm';
import { updateOffer } from '../actions';
import { canConfirmOffer, canEditOffer } from '../helper';

export function OfferClientForm({
  offer,
  onConfirm,
  preload,
  client,
  selectorClient,
  onHide,
  onSubmit,
  onEdit,
  dispatch,
}) {
  useEffect(() => {
    dispatch(updateOffer({ Cliente: { ...client, ...selectorClient.client } }));
  }, [selectorClient.client]);
  const canEdit = canEditOffer(offer);
  const canConfirm = canConfirmOffer(offer);
  const { Comuna = { Name: ' ' } } = client || {};

  return (
    <Box collapse isOpen={false}>
      <BoxHeader>
        <b>DATOS CLIENTE</b>
        {canConfirm && (
          <div className="d-flex align-items-center mr-3 order-3">
            <div className="checkbox-01 checkbox-medium">
              <span>
                <input
                  type="checkbox"
                  onChange={evt => {
                    onConfirm('client', evt.currentTarget.checked);
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
            disabled={selectorClient.loading}
            className="m-btn-pen order-3"
            onClick={() => onEdit(client)}
          >
            Editar
          </Button>
        )}
      </BoxHeader>
      <BoxContent>
        <ul className="row p-0 m-0 color-regular">
          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>Nombres</b>
            </span>
            <span className="font-14-rem">{(client || {}).Name}</span>
          </li>

          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>Apellidos</b>
            </span>
            <span className="font-14-rem">{(client || {}).LastNames}</span>
          </li>

          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>RUT</b>
            </span>
            <span className="font-14-rem">{(client || {}).Rut}</span>
          </li>

          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>Nacionalidad</b>
            </span>
            <span className="font-14-rem">{(client || {}).Nationality}</span>
          </li>

          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>Estado civil</b>
            </span>
            <span className="font-14-rem">{(client || {}).CivilStatus}</span>
          </li>

          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>Género</b>
            </span>
            <span className="font-14-rem">{(client || {}).Genre}</span>
          </li>

          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>Cargo</b>
            </span>
            <span className="font-14-rem">{(client || {}).Position}</span>
          </li>

          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>Antigüedad</b>
            </span>
            <span className="font-14-rem">{(client || {}).Antiquity}</span>
          </li>

          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>Dirección</b>
            </span>
            <span className="font-14-rem">{(client || {}).Address}</span>
          </li>

          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>Región</b>
            </span>
            <span className="font-14-rem">{(client || {}).Region}</span>
          </li>

          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>Provincia</b>
            </span>
            <span className="font-14-rem">{(client || {}).Provincia}</span>
          </li>

          <li className="col-md-6 p-0 my-2 d-flex align-items-center">
            <span className="font-14-rem" style={{ width: '11em' }}>
              <b>Comuna</b>
            </span>
            <span className="font-14-rem">{Comuna.Name || Comuna}</span>
          </li>
        </ul>
      </BoxContent>
      <ClientForm
        preload={preload}
        selector={selectorClient}
        onHide={() => onHide(selectorClient.client)}
        onSubmit={onSubmit}
      />
    </Box>
  );
}

OfferClientForm.propTypes = {
  offer: PropTypes.object,
  client: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  selectorClient: PropTypes.object,
  preload: PropTypes.object,
  onEdit: PropTypes.func,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
  dispatch: PropTypes.func,
  onConfirm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectorClient: makeSelectClient(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onEdit: client => dispatch(toggleScreen('form', client)),
    onSubmit: values => dispatch(saveClient(values)),
    onHide: client => dispatch(toggleScreen(false, client)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OfferClientForm);
