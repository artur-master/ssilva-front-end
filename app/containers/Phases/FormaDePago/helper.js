import { formatNumber } from 'containers/App/helpers';
import _ from 'lodash';

export const calculates = values => {
  const { Inmuebles = [], Cuotas = [], PayType = 'Credito' } = values;
  const cuota = Cuotas.reduce(
    (acc, item) => acc + parseFloat(item.Amount || 0),
    0,
  );
  const total = Inmuebles.reduce((acc, item) => acc + item.Price, 0);
  const discount = Inmuebles.reduce(
    (acc, item) => acc + ((item.Discount || 0) / 100) * item.Price,
    0,
  );

  const PaymentFirmaPromesa = values.PaymentFirmaPromesa
    ? formatNumber(values.PaymentFirmaPromesa)
    : 0;
  const PaymentInstitucionFinanciera = values.PaymentInstitucionFinanciera
    ? formatNumber(values.PaymentInstitucionFinanciera)
    : 0;
  const PaymentFirmaEscritura = values.PaymentFirmaEscritura
    ? formatNumber(values.PaymentFirmaEscritura)
    : 0;
  const AhorroPlus = values.AhorroPlus ? formatNumber(values.AhorroPlus) : 0;

  const { uf, paymentUtils = [] } = window.preload || {};
  const isCredit =
    PayType === paymentUtils[1].PayTypeID || PayType === paymentUtils[1].Name;

  const pay =
    (isCredit ? PaymentInstitucionFinanciera : 0) +
    PaymentFirmaPromesa +
    PaymentFirmaEscritura +
    cuota +
    AhorroPlus;

  const cost = total - discount;
  const balance = total - discount - pay;
  const moneyErr = Math.abs(balance) > 0.1;
  return {
    PaymentFirmaPromesa,
    PaymentInstitucionFinanciera,
    PaymentFirmaEscritura,
    AhorroPlus,
    total,
    discount,
    cost,
    cost$: cost * uf.valor,
    cuota,
    pay,
    balance,
    moneyErr,
    percent: {
      PaymentFirmaPromesa:
        cost > 0 ? formatNumber((PaymentFirmaPromesa / cost) * 100) : 0,
      PaymentInstitucionFinanciera:
        cost > 0
          ? formatNumber((PaymentInstitucionFinanciera / cost) * 100)
          : 0,
      PaymentFirmaEscritura:
        cost > 0 ? formatNumber((PaymentFirmaEscritura / cost) * 100) : 0,
      Cuotas: cost > 0 ? formatNumber((cuota / cost) * 100) : 0,
      AhorroPlus: cost > 0 ? formatNumber((AhorroPlus / cost) * 100) : 0,
    },
    convert: {
      PaymentFirmaPromesa: uf
        ? formatNumber(PaymentFirmaPromesa * uf.valor, 0)
        : 0,
      PaymentInstitucionFinanciera: uf
        ? formatNumber(PaymentInstitucionFinanciera * uf.valor, 0)
        : 0,
      PaymentFirmaEscritura: uf
        ? formatNumber(PaymentFirmaEscritura * uf.valor, 0)
        : 0,
      Cuotas: uf ? formatNumber(cuota * uf.valor, 0) : 0,
      AhorroPlus: uf ? formatNumber(AhorroPlus * uf.valor, 0) : 0,
    },
  };
};

export const isCreditType = PayType => {
  const { paymentUtils = [] } = window.preload || {};
  return (
    PayType === paymentUtils[1].PayTypeID || PayType === paymentUtils[1].Name
  );
};

export const isContadoType = PayType => {
  const { paymentUtils = [] } = window.preload || {};
  return (
    PayType === paymentUtils[0].PayTypeID || PayType === paymentUtils[0].Name
  );
};

export const isPayTypeName = PayType => {
  const { paymentUtils } = window.preload;
  return PayType === paymentUtils[0].Name || PayType === paymentUtils[1].Name;
};

export const updatePaymentValues = ({ payFor, value, values, setValues }) => {
  if (payFor) {
    if (payFor === 'PayType') {
      _.set(values, payFor, value);
    } else {
      _.set(values, payFor, formatNumber(value));
    }
  }

  const isCredit = isCreditType(values.PayType);

  const { cost, cuota } = calculates(values);
  const remainAmount = formatNumber(
    cost - cuota - values.PaymentFirmaPromesa - values.AhorroPlus,
  );
  const PaymentInstitucionFinanciera = isCredit ? remainAmount : 0;
  const PaymentFirmaEscritura = !isCredit ? remainAmount : 0;

  setValues({
    ...values,
    PaymentInstitucionFinanciera:
      PaymentInstitucionFinanciera < 0 ? 0 : PaymentInstitucionFinanciera,
    PaymentFirmaEscritura:
      PaymentFirmaEscritura < 0 ? 0 : PaymentFirmaEscritura,
  });
};

export const divideCalculation = (total, percentage, date) => {
  const { tasa = {}, uf } = window.preload || {};
  const rate = tasa.Value || 0;
  if (date) {
    const result =
      total *
      (percentage / 100) *
      ((1 + rate / 100) ** (1 / 12) - 1) *
      ((1 + rate / 100) ** date / ((1 + rate / 100) ** date - 1));
    const dividendUf = formatNumber(result, 2);
    return { dividendUf, dividend$: formatNumber(dividendUf * uf.valor, 0) };
  }
  return { dividendUf: '-', dividend$: '-' };
};

export const simulateCalculation = (values, date) => {
  if (date) {
    const { cost: total, percent } = calculates(values);
    const percentage = percent.PaymentInstitucionFinanciera;
    const desgravamenInsurance = values.CodeudorID
      ? total * (percentage / 100) * 0.00028 * 2
      : total * (percentage / 100) * 0.00028;

    const fireQuakeInsurance = total * 0.000245;

    const { dividendUf, dividend$ } = divideCalculation(
      total,
      percentage,
      date,
    );

    const dividendInsurances = formatNumber(
      dividendUf + desgravamenInsurance + fireQuakeInsurance,
      2,
    );

    const minRent = 4 * dividendUf + desgravamenInsurance + fireQuakeInsurance;

    return {
      desgravamenInsurance,
      fireQuakeInsurance,
      dividendUf,
      dividend$,
      dividendInsurances,
      minRent,
    };
  }
  return {
    desgravamenInsurance: '-',
    fireQuakeInsurance: '-',
    dividendUf: '-',
    dividend$: '-',
    dividendInsurances: '-',
    minRent: '-',
  };
};
