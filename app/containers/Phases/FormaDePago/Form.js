/**
 *
 * Quota Form
 *
 */
import React, { useState } from 'react';
import _ from 'lodash';
import { FormattedNumber, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Input } from 'components/ExForm';
import { formatNumber } from 'containers/App/helpers';
import Cuotas from './Cuotas';
import {
  calculates,
  isContadoType,
  isCreditType,
  isPayTypeName,
  simulateCalculation,
  updatePaymentValues,
} from './helper';

// eslint-disable-next-line no-unused-vars
function PhaseFormaDePagoForm({ form }) {
  const [openCuotas, setOpenCuotas] = useState(0);
  const { values, setValues } = form;
  const { paymentUtils } = window.preload;
  const { cost, cuota, pay, balance, moneyErr, percent, convert } = calculates(
    values,
  );
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
              handleChangePercent('PaymentFirmaPromesa', 20);
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
                <div className="search-filter">
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    value={formatNumber(values.PaymentFirmaPromesa)}
                    placeholder="UF"
                    min={0}
                    onChange={evt =>
                      handleChangeUF(
                        'PaymentFirmaPromesa',
                        evt.currentTarget.value,
                      )
                    }
                  />
                </div>
              </td>
              <td>
                <div className="search-filter">
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    value={formatNumber(percent.PaymentFirmaPromesa)}
                    onChange={evt =>
                      handleChangePercent(
                        'PaymentFirmaPromesa',
                        evt.currentTarget.value,
                      )
                    }
                    placeholder="%"
                  />
                </div>
              </td>
              <td>
                <div className="search-filter">
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    value={formatNumber(convert.PaymentFirmaPromesa)}
                    readOnly
                    placeholder="$"
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
                <div className="search-filter">
                  <div className="flex-fill">
                    <div className="btype shadow-sm  ">
                      <input
                        placeholder="UF"
                        min="0"
                        type="number"
                        className="form-control form-control-sm"
                        value={formatNumber(cuota)}
                        readOnly={values.Cuotas.length > 1}
                        onChange={evt => {
                          handleChangeUF(
                            'Cuotas.0.Amount',
                            evt.currentTarget.value,
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="search-filter">
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    readOnly={values.Cuotas.length > 1}
                    value={formatNumber(percent.Cuotas)}
                    onChange={evt => {
                      handleChangePercent(
                        'Cuotas.0.Amount',
                        evt.currentTarget.value,
                      );
                    }}
                    placeholder="%"
                  />
                </div>
              </td>
              <td>
                <div className="search-filter">
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    readOnly
                    value={formatNumber(convert.Cuotas)}
                    placeholder="$"
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
      {isContadoType(values.PayType) && (
        <div className="payment-block">
          <table className="table">
            <tbody>
              <tr>
                <td>Monto Firma Escritura / Contado</td>
                <td>
                  <div className="search-filter">
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      readOnly
                      value={formatNumber(values.PaymentFirmaEscritura)}
                      placeholder="UF"
                    />
                  </div>
                </td>
                <td>
                  <div className="search-filter">
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      readOnly
                      value={formatNumber(percent.PaymentFirmaEscritura)}
                      placeholder="%"
                    />
                  </div>
                </td>
                <td>
                  <div className="search-filter">
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      readOnly
                      value={formatNumber(convert.PaymentFirmaEscritura)}
                      placeholder="$"
                      min={0}
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
                    <FormattedNumber value={values.PaymentFirmaEscritura} />
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      {isCreditType(values.PayType) && (
        <div className="payment-block">
          <table className="table">
            <tbody>
              <tr>
                <td>Monto Institución Financiera</td>
                <td>
                  <div className="search-filter">
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      value={formatNumber(values.PaymentInstitucionFinanciera)}
                      placeholder="UF"
                      min={0}
                      readOnly
                    />
                  </div>
                </td>
                <td>
                  <div className="search-filter">
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      value={formatNumber(percent.PaymentInstitucionFinanciera)}
                      readOnly
                      placeholder="%"
                    />
                  </div>
                </td>
                <td>
                  <div className="search-filter">
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      value={formatNumber(convert.PaymentInstitucionFinanciera)}
                      placeholder="$"
                      min={0}
                      readOnly
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
              <td>Ahorro Plus</td>
              <td>
                <div className="search-filter">
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    value={formatNumber(values.AhorroPlus)}
                    placeholder="UF"
                    min={0}
                    onChange={evt =>
                      handleChangeUF('AhorroPlus', evt.currentTarget.value)
                    }
                  />
                </div>
              </td>
              <td>
                <div className="search-filter">
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    value={formatNumber(percent.AhorroPlus)}
                    onChange={evt =>
                      handleChangePercent('AhorroPlus', evt.currentTarget.value)
                    }
                    placeholder="%"
                  />
                </div>
              </td>
              <td>
                <div className="search-filter">
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    value={formatNumber(convert.AhorroPlus)}
                    readOnly
                    placeholder="$"
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
PhaseFormaDePagoForm.contextTypes = {
  intl: intlShape,
};
export default PhaseFormaDePagoForm;
