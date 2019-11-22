/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isObject } from 'lodash';
import { FormattedNumber } from 'react-intl';
import { stringToBoolean } from 'containers/App/helpers';
import { FormGroup, Label, Field as ExField } from 'components/ExForm';
import PureRadioGroup from 'components/ExForm/PureRadioGroup';
import RadioGroup from 'components/ExForm/RadioGroup';
import {
  Collapse,
  CollapseContent,
  CollapseHeader,
} from '../../../../components/Collapse';

const Patrimony = ({ form }) => {
  const { values, setFieldValue } = form;
  const [hasCredits, setHasCredits] = useState({
    RealState: !!values.Patrimony.RealState,
    CreditoHipotecario: !!values.Patrimony.CreditoHipotecario.PagosMensuales,
    Vehicle: !!values.Patrimony.Vehicle,
    DownPayment: !!values.Patrimony.DownPayment,
    Other: !!values.Patrimony.Other,
    CreditCard: !!values.Patrimony.CreditCard.PagosMensuales,
    CreditoConsumo: !!values.Patrimony.CreditoConsumo.PagosMensuales,
    PrestamoEmpleador: !!values.Patrimony.PrestamoEmpleador.PagosMensuales,
    DeudaIndirecta: !!values.Patrimony.DeudaIndirecta.PagosMensuales,
    AnotherCredit: !!values.Patrimony.AnotherCredit.PagosMensuales,
    CreditoComercio: !!values.Patrimony.CreditoComercio.PagosMensuales,
  });
  const totalActivos =
    values.Patrimony.RealState +
    values.Patrimony.CreditoHipotecario.PagosMensuales +
    values.Patrimony.Vehicle +
    values.Patrimony.DownPayment +
    values.Patrimony.Other;
  const totalPasivos =
    values.Patrimony.CreditCard.PagosMensuales +
    values.Patrimony.CreditoConsumo.PagosMensuales +
    values.Patrimony.PrestamoEmpleador.PagosMensuales +
    values.Patrimony.DeudaIndirecta.PagosMensuales +
    values.Patrimony.AnotherCredit.PagosMensuales +
    values.Patrimony.CreditoComercio.PagosMensuales;

  const handleChangeHasCredits = evt => {
    const hasValue = stringToBoolean(evt.currentTarget.value);
    const { name } = evt.currentTarget;
    if (!hasValue) {
      if (isObject(values.Patrimony[name])) {
        setFieldValue(`Patrimony.${name}`, {
          Pasivos: 0,
          PagosMensuales: 0,
        });
      } else {
        setFieldValue(`Patrimony.${name}`, 0);
      }
    }
    setHasCredits({
      ...hasCredits,
      [name]: hasValue,
    });
  };

  return (
    <>
      <Collapse>
        <CollapseHeader>Vivienda Actual</CollapseHeader>
        <CollapseContent>
          <RadioGroup
            name="IsOwner"
            options={[
              { label: 'Propietario', value: '1' },
              { label: 'Arriendo', value: '0' },
            ]}
          />
        </CollapseContent>
      </Collapse>
      <Collapse>
        <CollapseHeader>Patrimonio Activos</CollapseHeader>
        <CollapseContent>
          <div className="row">
            {stringToBoolean(values.IsOwner) && (
              <>
                <span className="font-14-rem color-main d-block col-12">
                  <b>¿TIENE BIENES RAÍCES?</b>
                </span>
                <div className="mt-2 col-12">
                  <PureRadioGroup
                    options={[
                      { label: 'Si', value: 1 },
                      { label: 'No', value: 0 },
                    ]}
                    name="RealState"
                    value={hasCredits.RealState}
                    onChange={handleChangeHasCredits}
                  />
                </div>
                {hasCredits.RealState && (
                  <>
                    <span className="mt-3 font-14-rem color-main d-block col-12">
                      <b>¿CUÁL ES EL VALOR DE LA PROPIEDAD?</b>
                    </span>
                    <FormGroup className="col-12 col-md-6 mt-2 ">
                      <Label style={{ minWidth: '12em' }}>Bienes Raíces</Label>
                      <ExField
                        className="ml-3 caution"
                        name="Patrimony.RealState"
                        placeholder="$"
                        type="number"
                        required
                      />
                    </FormGroup>
                  </>
                )}
              </>
            )}
            {!stringToBoolean(values.IsOwner) && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b className="text-uppercase">¿Cuánto paga de arriendo?</b>
                </span>
                <FormGroup className="col-12 col-md-6 mt-2">
                  <Label style={{ minWidth: '12em' }}>Rent</Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.Rent"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
              </>
            )}
          </div>

          <div className="mt-4 row">
            <span className="font-14-rem color-main d-block col-12">
              <b>¿TIENE CRÉDITO HIPOTECARIO?</b>
            </span>
            <div className="mt-2 col-12">
              <PureRadioGroup
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="CreditoHipotecario"
                value={hasCredits.CreditoHipotecario}
                onChange={handleChangeHasCredits}
              />
            </div>
            {hasCredits.CreditoHipotecario && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUANTO PAGA DE CUOTA DE CRÉDITO?</b>
                </span>
                <FormGroup className="col-12 col-md-6 mt-2 ">
                  <Label style={{ minWidth: '12em' }}>
                    Crédito Hipotecario
                  </Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.CreditoHipotecario.PagosMensuales"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
                <FormGroup className="col-12 col-md-6 mt-2">
                  <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.CreditoHipotecario.Pasivos"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
              </>
            )}
          </div>

          <div className="mt-4">
            <span className="font-14-rem color-main d-block">
              <b>¿TIENE VEHÍCULO?</b>
            </span>
            <div className="mt-2">
              <PureRadioGroup
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="Vehicle"
                value={hasCredits.Vehicle}
                onChange={handleChangeHasCredits}
              />
            </div>
            {hasCredits.Vehicle && (
              <>
                <span className="mt-3 font-14-rem color-main d-block">
                  <b>¿CUÁL ES EL VALOR DEL AUTO?</b>
                </span>
                <FormGroup className="mt-2 d-flex ">
                  <Label style={{ minWidth: '12em' }}>Vehículos</Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.Vehicle"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
              </>
            )}
          </div>

          <div className="mt-4">
            <span className="font-14-rem color-main d-block">
              <b>¿TIENE DEPÓSITOS / ACCIONES?</b>
            </span>
            <div className="mt-2">
              <PureRadioGroup
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="DownPayment"
                value={hasCredits.DownPayment}
                onChange={handleChangeHasCredits}
              />
            </div>
            {hasCredits.DownPayment && (
              <>
                <span className="mt-3 font-14-rem color-main d-block">
                  <b>¿CUÁL ES EL VALOR?</b>
                </span>
                <FormGroup className="mt-2 d-flex ">
                  <Label style={{ minWidth: '12em' }}>
                    Depósitos / Acciones
                  </Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.DownPayment"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
              </>
            )}
          </div>
          <div className="mt-4 row">
            <span className="font-14-rem color-main d-block col-12">
              <b>¿TIENE OTROS PATRIMONIOS?</b>
            </span>
            <div className="mt-2 col-12">
              <PureRadioGroup
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="Other"
                value={hasCredits.Other}
                onChange={handleChangeHasCredits}
              />
            </div>
            {hasCredits.Other && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUÁL ES EL VALOR DE ESOS PATRIMONIOS?</b>
                </span>

                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>Otros</Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.Other"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
              </>
            )}
          </div>
          <div className="background-color-tab mt-2 px-2 font-18 rounded-lg">
            <table className="table table-responsive-md table-borderless">
              <tbody>
                <tr className="align-middle-group">
                  <td>
                    <span className="font-18 no-whitespace">Total Activos</span>
                  </td>
                  <td className="w-100">
                    <span className="font-21 no-whitespace">
                      <b>
                        $
                        <FormattedNumber value={totalActivos} />
                      </b>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CollapseContent>
      </Collapse>
      <Collapse>
        <CollapseHeader>Patrimonio Pasivol</CollapseHeader>
        <CollapseContent>
          <div className="row">
            <span className="font-14-rem color-main d-block col-12">
              <b>¿TIENE TARJETA DE CRÉDITO?</b>
            </span>
            <div className="mt-2 col-12">
              <PureRadioGroup
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="CreditCard"
                value={hasCredits.CreditCard}
                onChange={handleChangeHasCredits}
              />
            </div>
            {hasCredits.CreditCard && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUÁNTO PAGA MENSUAL?</b>
                </span>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>
                    Cuota Tarjeta de Crédito
                  </Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.CreditCard.PagosMensuales"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.CreditCard.Pasivos"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
              </>
            )}
          </div>

          <div className="mt-4 row">
            <span className="font-14-rem color-main d-block col-12">
              <b>¿TIENE CRÉDITOS DE CONSUMO?</b>
            </span>
            <div className="mt-2 col-12">
              <PureRadioGroup
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="CreditoConsumo"
                value={hasCredits.CreditoConsumo}
                onChange={handleChangeHasCredits}
              />
            </div>
            {hasCredits.CreditoConsumo && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUÁNTO PAGA MENSUAL?</b>
                </span>

                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>
                    Cuota Créditos Consumo
                  </Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.CreditoConsumo.PagosMensuales"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>

                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.CreditoConsumo.Pasivos"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
              </>
            )}
          </div>

          <div className="mt-4 row">
            <span className="font-14-rem color-main d-block col-12">
              <b>¿TIENE PRÉSTAMOS CON SU EMPLEADOR?</b>
            </span>
            <div className="mt-2 col-12">
              <PureRadioGroup
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="PrestamoEmpleador"
                value={hasCredits.PrestamoEmpleador}
                onChange={handleChangeHasCredits}
              />
            </div>
            {hasCredits.PrestamoEmpleador && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUÁNTO PAGA MENSUAL?</b>
                </span>

                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>
                    Cuota Préstamo Empleador
                  </Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.PrestamoEmpleador.PagosMensuales"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.PrestamoEmpleador.Pasivos"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
              </>
            )}
          </div>

          <div className="mt-4 row">
            <span className="font-14-rem color-main d-block col-12">
              <b>¿ES AVAL DE ALGUNA DEUDA?</b>
            </span>
            <div className="mt-2 col-12">
              <PureRadioGroup
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="DeudaIndirecta"
                value={hasCredits.DeudaIndirecta}
                onChange={handleChangeHasCredits}
              />
            </div>
            {hasCredits.DeudaIndirecta && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUÁNTO PAGA MENSUAL?</b>
                </span>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>
                    Cuota Deuda como Aval
                  </Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.DeudaIndirecta.PagosMensuales"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.DeudaIndirecta.Pasivos"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
              </>
            )}
          </div>

          <div className="mt-4 row">
            <span className="font-14-rem color-main d-block col-12">
              <b className="text-uppercase">¿Otro crédito?</b>
            </span>
            <div className="mt-2 col-12">
              <PureRadioGroup
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="AnotherCredit"
                value={hasCredits.AnotherCredit}
                onChange={handleChangeHasCredits}
              />
            </div>
            {hasCredits.AnotherCredit && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b className="text-uppercase">¿Otro crédito?</b>
                </span>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>Valor</Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.AnotherCredit.PagosMensuales"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.AnotherCredit.Pasivos"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
              </>
            )}
          </div>

          <div className="mt-4 row">
            <span className="font-14-rem color-main d-block col-12">
              <b>¿CREDITO COMERCIO?</b>
            </span>
            <div className="mt-2 col-12">
              <PureRadioGroup
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="CreditoComercio"
                value={hasCredits.CreditoComercio}
                onChange={handleChangeHasCredits}
              />
            </div>
            {hasCredits.CreditoComercio && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CREDITO COMERCIO?</b>
                </span>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>
                    Credito comercio value
                  </Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.CreditoComercio.PagosMensuales"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                  <ExField
                    className="ml-3 caution"
                    name="Patrimony.CreditoComercio.Pasivos"
                    placeholder="$"
                    type="number"
                    required
                  />
                </FormGroup>
              </>
            )}
          </div>
          <div className="background-color-tab mt-2 px-2 font-18 rounded-lg">
            <table className="table table-responsive-md table-borderless">
              <tbody>
                <tr className="align-middle-group">
                  <td>
                    <span className="font-18 no-whitespace">Total Pasivos</span>
                  </td>
                  <td className="w-100">
                    <span className="font-21 no-whitespace">
                      <b>
                        $
                        <FormattedNumber value={totalPasivos} />
                      </b>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CollapseContent>
      </Collapse>
    </>
  );
};

Patrimony.propTypes = {
  form: PropTypes.object,
};
export default Patrimony;
