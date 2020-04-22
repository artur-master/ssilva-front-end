/**
 *
 * Quota Form
 *
 */
import React, { useState } from 'react';
import _ from 'lodash';
import { FormattedNumber } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Input } from 'components/ExForm';
import { formatNumber } from 'containers/App/helpers';
import IntlFormatCurrency from 'components/IntlFormat/Currency';
import Cuotas from './Cuotas';
import {
  calculates,
  isContadoType,
  isCreditType,
  isPayTypeName,
  simulateCalculation,
  updatePaymentValues,
} from './helper';
import { Auth } from 'containers/App/helpers';

// eslint-disable-next-line no-unused-vars
function PhaseFormaDePagoForm({ defaultPercent = {}, form }) {
  const [openCuotas, setOpenCuotas] = useState(0);
  const { values, setValues } = form;
  const { paymentUtils } = window.preload;
  const { cost, cuota, pay, balance, 
          moneyErr, percent, convert 
        } = calculates( values );

  const { dividend$, dividendUf } = simulateCalculation(values, values.tmpDate);
  const handleChangeUF = (payFor, val) => {
    const value = parseFloat(val || 0);
    updatePaymentValues({ payFor, value, values, setValues });
  };

  const handleChangePercent = (payFor, val) => {
    const value = (parseFloat(val || 0) / 100) * cost;
    updatePaymentValues({ payFor, value, values, setValues });
  };

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div className="w-50 border-bottom pb-3">
          <div className="row">
            <div className="d-flex">
              {paymentUtils.map(({ PayTypeID, Name }) => {
                const subValue = isPayTypeName(values.PayType)
                  ? Name
                  : PayTypeID;
                return (
                  <div
                    key={PayTypeID}
                    className="radio col-auto d-flex align-items-center font-14-rem"
                  >
                    <div className="m-radio">
                      <input
                        name="PayType"
                        type="radio"
                        value={subValue}
                        checked={subValue === values.PayType}
                        onChange={() => {
                          updatePaymentValues({
                            payFor: 'PayType',
                            value: subValue,
                            values,
                            setValues,
                          });
                        }}
                      />
                      <label />
                    </div>
                    <span className="ml-1 font-14-rem">
                      <b>{Name}</b>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-50 d-flex justify-content-end">
          <Button
            onClick={() => {
              let percentPromesa, percentAmount, percentAhorro, percentEscrituraContado, percentInstitucionFinanciera;
              if(isContadoType(values.PayType)) {
                percentPromesa = defaultPercent.ContadoMontoPromesa || 20;
                percentAmount = defaultPercent.ContadoMontoCuotas || 20;
                percentEscrituraContado = defaultPercent.ContadoMontoEscrituraContado || 20;
                percentAhorro = defaultPercent.ContadoAhorroPlus || 20;
              }
              else if(isCreditType(values.PayType)) {
                percentPromesa = defaultPercent.CreditoMontoPromesa || 20;
                percentAmount = defaultPercent.CreditoMontoCuotas || 20;
                percentEscrituraContado = defaultPercent.CreditoMontoEscrituraContado || 20;
                percentAhorro = defaultPercent.CreditoAhorroPlus || 20;
                percentInstitucionFinanciera = defaultPercent.CreditoMontoInstitucionFinanciera || 20;
              }
              else {
                percentPromesa = 20;
                percentAmount = 20;
                percentEscrituraContado = 20;
                percentInstitucionFinanciera = 20;
                percentAhorro = 20;
              }

              handleChangePercent('PaymentFirmaPromesa', percentPromesa);
              handleChangePercent('Cuotas.0.Amount', percentAmount);
              handleChangePercent('AhorroPlus', percentAhorro);
              handleChangePercent('PaymentFirmaEscritura', percentEscrituraContado);
              handleChangePercent('PaymentInstitucionFinanciera', percentInstitucionFinanciera);
              // percent.PaymentFirmaEscritura / percent.PaymentInstitucionFinanciera
            }}
            className="m-btn m-btn-white shadow-sm"
          >
            Cargar Datos Predeterminados
          </Button>
        </div>
      </div>

      <div className="payment-block">
        <table className="table">
          <thead>
            <tr>
              <td>Opciones de Pago Contado</td>
              <td>UF</td>
              <td>%</td>
              <td>$</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PIE / Monto Firma Promesa</td>
              <td>
                {Auth.isPM() ? (
                  <Input
                    className="form-control form-control-sm"
                    type="number"
                    value={
                      values.PaymentFirmaPromesa
                        ? formatNumber(values.PaymentFirmaPromesa)
                        : ''
                    }
                    onChange={evt =>{
                      let value = evt.currentTarget.value
                      if ( value < 0) return;
                      handleChangeUF('PaymentFirmaPromesa',value);
                    }}
                  />) : (
                    <div className="search-filter">
                      <span className="form-control form-control-sm" style={{ width: 120, height: 28 }}>
                        {values.PaymentFirmaPromesa
                          ? formatNumber(values.PaymentFirmaPromesa)
                          : ''
                        }
                      </span>
                    </div>)
                }
              </td>
              <td>
                {Auth.isPM() ? (
                  <Input
                    className="form-control form-control-sm"
                    type="number"
                    prefix="%"
                    value={
                      percent.PaymentFirmaPromesa
                        ? formatNumber(percent.PaymentFirmaPromesa)
                        : ''
                    }
                    onChange={evt => {
                      let value = evt.currentTarget.value;
                      if (value > 100 || value < 0) return;
                      handleChangePercent('PaymentFirmaPromesa', value);
                    }}
                  />) : (
                    <div className="search-filter">
                      <span className="form-control form-control-sm" style={{ width: 120, height: 28 }}>
                        {percent.PaymentFirmaPromesa
                          ? `%${formatNumber(percent.PaymentFirmaPromesa)}`
                          : ''
                        }
                      </span>
                    </div>)
                }
              </td>
              <td>
                <div className="search-filter">
                  <IntlFormatCurrency
                    className="form-control form-control-sm"
                    style={{ width: 120, height: 28 }}
                    value={convert.PaymentFirmaPromesa}
                  />
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
              <td className="border-top">Sub Total</td>
              <td className="border-top text-right">
                <strong>
                  <FormattedNumber
                    value={formatNumber(values.PaymentFirmaPromesa) || 0}
                  />
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="payment-block">
        <table className="table">
          <tbody>
            <tr>
              <td>PIE / Monto a Financiar en Cuotas</td>
              <td>
                <Input
                  className="form-control form-control-sm"
                  type="number"
                  readOnly={values.Cuotas.length > 1}
                  value={
                    values.Cuotas[0] ?
                      values.Cuotas[0].Amount
                        ? formatNumber(values.Cuotas[0].Amount)
                        : ''
                      : ''
                  }
                  onChange={evt => {
                    let value = evt.currentTarget.value;
                    if ( value < 0) return;
                    handleChangeUF('Cuotas.0.Amount', value);
                  }}
                />
              </td>
              <td>
                <Input
                  className="form-control form-control-sm"
                  type="number"
                  prefix="%"
                  readOnly={values.Cuotas.length > 1}
                  value={
                    percent.Cuotas
                      ? formatNumber(percent.Cuotas)
                      : ''
                  }
                  onChange={evt => {
                    let value = evt.currentTarget.value;
                    if (value > 100 || value < 0) return;
                    handleChangePercent('Cuotas.0.Amount', value);
                  }}
                />
              </td>
              <td>
                <div className="search-filter">
                  <IntlFormatCurrency
                    className="form-control form-control-sm"
                    style={{ width: 120 }}
                    value={convert.Cuotas}
                  />
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
              <td className="text-right">
                {values.Cuotas && values.Cuotas.length > 0 && (
                  <Link
                    to="/"
                    onClick={evt => {
                      evt.preventDefault();
                      setOpenCuotas(2);
                    }}
                    className="btn-arrow d-inline-block"
                  >
                    Ver Cuotas
                  </Link>
                )}
              </td>
              <td className="text-right">
                <div className="d-flex justify-content-end">
                  <Button
                    color="white"
                    className="m-btn-plus"
                    onClick={evt => {
                      evt.preventDefault();
                      setOpenCuotas(1);
                    }}
                  >
                    Ingresar Cuotas
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td />
              <td />
              <td className="border-top">Sub Total</td>
              <td className="border-top text-right">
                <strong>
                  <FormattedNumber value={cuota} />
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {isCreditType(values.PayType) && (
        <div className="payment-block">
          <table className="table">
            <tbody>
              <tr>
                <td>Monto Institución Financiera</td>
                <td>
                  <Input
                    className="form-control form-control-sm"
                    type="number"
                    value={
                      values.PaymentInstitucionFinanciera
                        ? formatNumber(values.PaymentInstitucionFinanciera)
                        : ''
                    }
                    onChange={evt => {
                      let value = evt.currentTarget.value
                      if (value < 0) return;
                      handleChangeUF('PaymentInstitucionFinanciera', value);
                    }}
                    min={0}
                  />
                </td>
                <td>
                  <Input
                    className="form-control form-control-sm"
                    type="number"
                    prefix="%"
                    // readOnly={percent.PaymentInstitucionFinanciera > 1}
                    value={
                      percent.PaymentInstitucionFinanciera
                        ? formatNumber(percent.PaymentInstitucionFinanciera)
                        : ''
                    }
                    onChange={evt => {
                      let value = evt.currentTarget.value;
                      if (value > 100 || value < 0) return;
                      handleChangePercent('PaymentInstitucionFinanciera', value);
                    }}
                  />
                </td>
                <td>
                  <div className="search-filter">
                    <IntlFormatCurrency
                      className="form-control form-control-sm"
                      value={convert.PaymentInstitucionFinanciera}
                      style={{ width: 120 }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <div className="d-flex align-items-center">
                    <b className="w-50">Años Plazo</b>
                    <div className="w-50">
                      <Input
                        type="select"
                        value={values.tmpDate}
                        onChange={evt => {
                          const val = evt.currentTarget.value;
                          setValues({
                            ...values,
                            [`Date${val}`]: true,
                            tmpDate: val,
                          });
                        }}
                      >
                        <option value="" />
                        {[8, 10, 15, 20, 25, 30].map(item => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </div>
                </td>
                <td
                  colSpan={2}
                  valign="center"
                  className="align-middle text-center"
                >
                  <b className="ml-1">Dividendo</b> {'UF '}
                  {`${dividendUf} / $ `}
                  {_.isString(dividend$) ? (
                    '-'
                  ) : (
                      <FormattedNumber value={dividend$} />
                    )}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td />
                <td />
                <td className="border-top">Sub Total</td>
                <td className="border-top text-right">
                  <strong>
                    <FormattedNumber
                      value={formatNumber(values.PaymentInstitucionFinanciera)}
                    />
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      <div className="payment-block">
        <table className="table">
          <tbody>
            <tr>
              <td>Monto Firma Escritura {isContadoType(values.PayType) && ('/ Contado')}</td>
              <td>
                <Input
                  className="form-control form-control-sm"
                  type="number"
                  value={
                    (values.PaymentFirmaEscritura)
                      ? formatNumber(values.PaymentFirmaEscritura)
                      : ''
                  }
                  onChange={evt => {
                    let value = evt.currentTarget.value
                    if (value < 0) return;
                    handleChangeUF('PaymentFirmaEscritura', value);
                  }}
                />
              </td>
              <td>
                <Input
                  className="form-control form-control-sm"
                  type="number"
                  prefix="%"
                  value={
                    (percent.PaymentFirmaEscritura)
                      ? formatNumber(percent.PaymentFirmaEscritura)
                      : ''
                  }
                  onChange={evt => {
                    let value = evt.currentTarget.value;
                    if (value > 100 || value < 0) return;
                    handleChangePercent('PaymentFirmaEscritura', value);
                  }}
                />
              </td>
              <td>
                <div className="search-filter">
                  <IntlFormatCurrency
                    className="form-control form-control-sm"
                    style={{ width: 120 }}
                    value={(convert.PaymentFirmaEscritura)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
              <td className="border-top">Sub Total</td>
              <td className="border-top text-right">
                <strong>
                  <FormattedNumber value={(values.PaymentFirmaEscritura)} />
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>


      <div className="payment-block">
        <table className="table">
          <tbody>
            <tr>
              <td>Ahorro Plus</td>
              <td>
                <Input
                  className="form-control form-control-sm"
                  type="number"
                  value={
                    values.AhorroPlus ? formatNumber(values.AhorroPlus) : ''
                  }
                  onChange={evt => {
                    let value = evt.currentTarget.value;
                    if ( value < 0) return;
                    handleChangeUF('AhorroPlus', value);
                  }}
                />
              </td>
              <td>
                <Input
                  className="form-control form-control-sm"
                  type="number"
                  prefix="%"
                  value={
                    percent.AhorroPlus
                      ? formatNumber(percent.AhorroPlus)
                      : ''
                  }
                  onChange={evt => {
                    let value = evt.currentTarget.value;
                    if (value > 100 || value < 0) return;
                    handleChangePercent('AhorroPlus', value);
                  }}
                />
              </td>
              <td>
                <div className="search-filter">
                  <IntlFormatCurrency
                    className="form-control form-control-sm"
                    style={{ width: 120 }}
                    value={convert.AhorroPlus}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {moneyErr && (
        <div className="background-color-warning mt-3 px-2 font-18 rounded-lg">
          <table className="table table-responsive-md table-borderless m-0">
            <tbody>
              <tr className="align-middle-group">
                <td>
                  <span className="font-14-rem">Total</span>
                </td>
                <td>
                  <span>
                    <b>
                      <FormattedNumber value={pay} />
                    </b>
                  </span>
                </td>
                <td>
                  <i className="icon icon-alert color-warning-icon" />
                </td>
                <td className="w-100">
                  <span className="font-14-rem color-regular">
                    <b>El Total debe ser igual al Valor Final</b>
                  </span>
                </td>
                <td className="no-whitespace">
                  <span className="font-14-rem mr-2">
                    La diferencia es de:{' '}
                  </span>
                  <span className="font-14-rem">
                    <b>
                      <FormattedNumber value={formatNumber(balance)} />
                    </b>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {!moneyErr && (
        <div className="background-color-success mt-3 px-2 font-18 rounded-lg">
          <table className="table table-responsive-md table-borderless m-0">
            <tbody>
              <tr className="align-middle-group">
                <td>
                  <span className="font-14-rem">Total</span>
                </td>
                <td>
                  <span>
                    <b>
                      <FormattedNumber value={pay} />
                    </b>
                  </span>
                </td>
                <td>
                  <i className="icon icon-check color-success-icon" />
                </td>
                <td className="w-100">
                  <span className="font-14-rem color-regular">
                    <b>El Total es igual al Valor Final</b>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <Cuotas
        form={form}
        isOpen={openCuotas}
        onHide={() => setOpenCuotas(0)}
        onView={() => setOpenCuotas(2)}
        onEdit={() => setOpenCuotas(1)}
      />
    </>
  );
}

PhaseFormaDePagoForm.propTypes = {
  form: PropTypes.object,
};
export default PhaseFormaDePagoForm;
