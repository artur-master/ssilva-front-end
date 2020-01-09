/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { stringToBoolean } from 'containers/App/helpers';
import { FormGroup, Label } from 'components/ExForm';
import PureRadioGroup from 'components/ExForm/PureRadioGroup';
import { Collapse, CollapseContent, CollapseHeader } from 'components/Collapse';
import IntlFormatCurrency from 'components/IntlFormat/Currency';

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
    values.Patrimony.CreditCard.Pasivos +
    values.Patrimony.CreditoConsumo.Pasivos +
    values.Patrimony.PrestamoEmpleador.Pasivos +
    values.Patrimony.DeudaIndirecta.Pasivos +
    values.Patrimony.AnotherCredit.Pasivos +
    values.Patrimony.CreditoComercio.Pasivos;

  return (
    <>
      <Collapse>
        <CollapseHeader>Vivienda Actual</CollapseHeader>
        <CollapseContent>
          <PureRadioGroup
            readOnly
            name="IsOwner_v"
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
                    name="RealState_v"
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
                      <IntlFormatCurrency value={values.Patrimony.RealState} />
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
                  <IntlFormatCurrency value={values.Patrimony.Rent} />
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
                name="CreditoHipotecario_v"
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
                  <IntlFormatCurrency
                    value={values.Patrimony.CreditoHipotecario.PagosMensuales}
                  />
                </FormGroup>
                <FormGroup className="col-12 col-md-6 mt-2">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatCurrency
                    value={values.Patrimony.CreditoHipotecario.Pasivos}
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
                name="Vehicle_v"
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
                  <IntlFormatCurrency value={values.Patrimony.Vehicle} />
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
                name="DownPayment_v"
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
                  <IntlFormatCurrency value={values.Patrimony.DownPayment} />
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
                name="Other_v"
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
                  <IntlFormatCurrency value={values.Patrimony.Other} />
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
                        <IntlFormatCurrency value={totalActivos} />
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
                name="CreditCard_v"
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
                  <IntlFormatCurrency
                    value={values.Patrimony.CreditCard.PagosMensuales}
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatCurrency
                    value={values.Patrimony.CreditCard.Pasivos}
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
                name="CreditoConsumo_v"
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
                  <IntlFormatCurrency
                    value={values.Patrimony.CreditoConsumo.PagosMensuales}
                  />
                </FormGroup>

                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatCurrency
                    value={values.Patrimony.CreditoConsumo.Pasivos}
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
                name="PrestamoEmpleador_v"
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
                  <IntlFormatCurrency
                    value={values.Patrimony.PrestamoEmpleador.PagosMensuales}
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatCurrency
                    value={values.Patrimony.PrestamoEmpleador.Pasivos}
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
                name="DeudaIndirecta_v"
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
                  <IntlFormatCurrency
                    value={values.Patrimony.DeudaIndirecta.PagosMensuales}
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatCurrency
                    value={values.Patrimony.DeudaIndirecta.Pasivos}
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
                name="AnotherCredit_v"
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
                  <IntlFormatCurrency
                    value={values.Patrimony.AnotherCredit.PagosMensuales}
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatCurrency
                    value={values.Patrimony.AnotherCredit.Pasivos}
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
                name="CreditoComercio_v"
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
                    Valor Crédito Comercio
                  </Label>
                  <IntlFormatCurrency
                    value={values.Patrimony.CreditoComercio.PagosMensuales}
                  />
                </FormGroup>
                <FormGroup className="mt-2 col-12 col-md-6 ">
                  <Label style={{ minWidth: '12em' }} className="pt-1">
                    Deuda Total
                  </Label>
                  <IntlFormatCurrency
                    value={values.Patrimony.CreditoComercio.Pasivos}
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
                        <IntlFormatCurrency value={totalPasivos} />
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
