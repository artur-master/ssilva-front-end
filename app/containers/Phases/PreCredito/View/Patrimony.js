/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { stringToBoolean } from 'containers/App/helpers';
import { FormGroup, Label } from 'components/ExForm';
import PureRadioGroup from 'components/ExForm/PureRadioGroup';
import { Collapse, CollapseContent, CollapseHeader } from 'components/Collapse';
import IntlFormatNumber from 'components/IntlFormat/Number';

const Patrimony = ({ values }) => {
  const hasCredits = {
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
  };
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

  return (
    <>
      <Collapse>
        <CollapseHeader>Vivienda Actual</CollapseHeader>
        <CollapseContent>
          <PureRadioGroup
            readOnly
            name="IsOwner"
            value={values.IsOwner}
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
                    readOnly
                    options={[
                      { label: 'Si', value: 1 },
                      { label: 'No', value: 0 },
                    ]}
                    name="RealState"
                    value={hasCredits.RealState}
                  />
                </div>
                {hasCredits.RealState && (
                  <>
                    <span className="mt-3 font-14-rem color-main d-block col-12">
                      <b>¿CUÁL ES EL VALOR DE LA PROPIEDAD?</b>
                    </span>
                    <FormGroup className="col-12 col-md-6 mt-2 ">
                      <Label style={{ minWidth: '12em' }} className="pt-1">
                        Bienes Raíces
                      </Label>
                      <IntlFormatNumber
                        value={values.Patrimony.RealState}
                        prefix="$"
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
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Rent
                  </Label>
                  <IntlFormatNumber value={values.Patrimony.Rent} prefix="$" />
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
                readOnly
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="CreditoHipotecario"
                value={hasCredits.CreditoHipotecario}
              />
            </div>
            {hasCredits.CreditoHipotecario && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUANTO PAGA DE CUOTA DE CRÉDITO?</b>
                </span>
                <FormGroup className="col-12 col-md-6 mt-2 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Crédito Hipotecario
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.CreditoHipotecario.PagosMensuales}
                    prefix="$"
                  />
                </FormGroup>
                <FormGroup className="col-12 col-md-6 mt-2">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.CreditoHipotecario.Pasivos}
                    prefix="$"
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
                readOnly
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="Vehicle"
                value={hasCredits.Vehicle}
              />
            </div>
            {hasCredits.Vehicle && (
              <>
                <span className="mt-3 font-14-rem color-main d-block">
                  <b>¿CUÁL ES EL VALOR DEL AUTO?</b>
                </span>
                <FormGroup className="mt-2 d-flex ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Vehículos
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.Vehicle}
                    prefix="$"
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
                readOnly
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="DownPayment"
                value={hasCredits.DownPayment}
              />
            </div>
            {hasCredits.DownPayment && (
              <>
                <span className="mt-3 font-14-rem color-main d-block">
                  <b>¿CUÁL ES EL VALOR?</b>
                </span>
                <FormGroup className="mt-2 d-flex ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Depósitos / Acciones
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.DownPayment}
                    prefix="$"
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
                readOnly
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="Other"
                value={hasCredits.Other}
              />
            </div>
            {hasCredits.Other && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUÁL ES EL VALOR DE ESOS PATRIMONIOS?</b>
                </span>

                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Otros
                  </Label>
                  <IntlFormatNumber value={values.Patrimony.Other} prefix="$" />
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
                readOnly
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="CreditCard"
                value={hasCredits.CreditCard}
              />
            </div>
            {hasCredits.CreditCard && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUÁNTO PAGA MENSUAL?</b>
                </span>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Cuota Tarjeta de Crédito
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.CreditCard.PagosMensuales}
                    prefix="$"
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.CreditCard.Pasivos}
                    prefix="$"
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
                readOnly
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="CreditoConsumo"
                value={hasCredits.CreditoConsumo}
              />
            </div>
            {hasCredits.CreditoConsumo && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUÁNTO PAGA MENSUAL?</b>
                </span>

                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Cuota Créditos Consumo
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.CreditoConsumo.PagosMensuale}
                    prefix="$"
                  />
                </FormGroup>

                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.CreditoConsumo.Pasivos}
                    prefix="$"
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
                readOnly
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="PrestamoEmpleador"
                value={hasCredits.PrestamoEmpleador}
              />
            </div>
            {hasCredits.PrestamoEmpleador && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUÁNTO PAGA MENSUAL?</b>
                </span>

                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Cuota Préstamo Empleador
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.PrestamoEmpleador.PagosMensuales}
                    prefix="$"
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.PrestamoEmpleador.Pasivos}
                    prefix="$"
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
                readOnly
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="DeudaIndirecta"
                value={hasCredits.DeudaIndirecta}
              />
            </div>
            {hasCredits.DeudaIndirecta && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUÁNTO PAGA MENSUAL?</b>
                </span>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Cuota Deuda como Aval
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.DeudaIndirecta.PagosMensuales}
                    prefix="$"
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.DeudaIndirecta.Pasivos}
                    prefix="$"
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
                readOnly
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="AnotherCredit"
                value={hasCredits.AnotherCredit}
              />
            </div>
            {hasCredits.AnotherCredit && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b className="text-uppercase">¿Otro crédito?</b>
                </span>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Valor
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.AnotherCredit.PagosMensuales}
                    prefix="$"
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.AnotherCredit.Pasivos}
                    prefix="$"
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
                readOnly
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="CreditoComercio"
                value={hasCredits.CreditoComercio}
              />
            </div>
            {hasCredits.CreditoComercio && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CREDITO COMERCIO?</b>
                </span>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Credito comercio value
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.CreditoComercio.PagosMensuales}
                    prefix="$"
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatNumber
                    value={values.Patrimony.CreditoComercio.Pasivos}
                    prefix="$"
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
  values: PropTypes.object,
};
export default Patrimony;
