/**
 *
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import moment from 'components/moment';
import { calculates, isContadoType } from './helper';

export function PhaseFormaDePagoView({ values }) {
  const { paymentUtils } = window.preload;
  const { cuota } = calculates(values);

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div className="w-50 pb-3 pl-3">
          Tipo de Pago:{' '}
          {
            (
              (paymentUtils || []).find(
                item =>
                  item.PayTypeID === values.PayType ||
                  item.Name === values.PayType,
              ) || {}
            ).Name
          }
        </div>
      </div>
      <div className="payment-block">
        <table className="table">
          <thead>
            <tr>
              <td>{ values.PayType }</td>
              <td>UF</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PIE / Monto Firma Promesa</td>
              <td>
                <FormattedNumber value={values.PaymentFirmaPromesa} />
              </td>
            </tr>
            <tr>
              <td>PIE / Monto a Financiar en Cuotas</td>
              <td>
                <FormattedNumber value={cuota} />
              </td>
            </tr>
            {values.Cuotas && values.Cuotas.length > 1 && (
              <tr>
                <td colSpan={2}>
                  <table className="table table-borderless">
                    <tbody>
                      {(values.Cuotas || []).map((couta, index) => (
                        <tr
                          key={String(index)}
                          className="align-middle-group font-14"
                        >
                          <th className="font-14">
                            <span className="number-circle">{index + 1}</span>
                          </th>
                          <td className="w-auto">
                            <div className="d-flex align-items-center">
                              <span className="mr-2 no-whitespace">
                                <b>Valor</b>
                              </span>
                              <div className="w-100">
                                <FormattedNumber value={couta.Amount} />
                              </div>
                            </div>
                          </td>
                          <td className="w-auto">
                            <div className="d-flex align-items-center">
                              <span className="mr-2 no-whitespace">
                                <b>Día de Pago</b>
                              </span>
                              <div className="w-100">
                                {moment(couta.Date).format('DD-MM-YYYY')}
                              </div>
                            </div>
                          </td>
                          <td className="w-auto">
                            <div className="d-flex align-items-center">
                              <span className="mr-2 no-whitespace">
                                <b>Observaciones</b>
                              </span>
                              <div className="w-100">{couta.Observacion}</div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}

            {(values.PayType === paymentUtils[0].PayTypeID ||
              values.PayType === paymentUtils[0].Name) && (
              <tr>
                <td>Monto Firma Escritura {isContadoType(values.PayType) && ('/ Contado')}</td>
                <td>
                  <FormattedNumber value={values.PaymentFirmaEscritura} />
                </td>
              </tr>
            )}
            {(values.PayType === paymentUtils[1].PayTypeID ||
              values.PayType === paymentUtils[1].Name) && (
              <tr>
                <td>Monto Institución Financiera</td>
                <td>
                  <FormattedNumber
                    value={values.PaymentInstitucionFinanciera}
                  />
                </td>
              </tr>
            )}
            <tr>
              <td>Pago con subsidio</td>
              <td>
                <FormattedNumber value={values.Subsidio || 0} />
              </td>
            </tr>
            <tr>
              <td>Libreta de Ahorro o Ahorro Previo</td>
              <td>
                <FormattedNumber value={values.Libreta || 0} />
              </td>
            </tr>
            <tr>
              <td>Ahorro Plus</td>
              <td>
                <FormattedNumber value={values.AhorroPlus || 0} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

PhaseFormaDePagoView.propTypes = {
  values: PropTypes.object,
};

export default PhaseFormaDePagoView;
