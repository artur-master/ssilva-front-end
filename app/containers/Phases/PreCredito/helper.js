/* eslint-disable array-callback-return */
export const calculateRenta = (reserva = {}) => {
  const Cliente = reserva.Cliente || {};
  const Codeudor = reserva.Codeudor || {};
  const { Extra = { Values: {} } } = Cliente;
  const CoExtra = Codeudor.Extra || { Values: {} };
  if (Codeudor.Extra && !Codeudor.Extra.Values) Codeudor.Extra.Values = {};
  const Renta =
    (Extra.Values.LiquidIncome || 0) +
    (Extra.Values.VariableSalary || 0) +
    (Extra.Values.Honoraries || 0) +
    (Extra.Values.RealStateLeasing || 0) +
    (Extra.Values.Retirements || 0) +
    (Extra.Values.Pension || 0);
  const CoRenta =
    (CoExtra.Values.LiquidIncome || 0) +
    (CoExtra.Values.VariableSalary || 0) +
    (CoExtra.Values.Honoraries || 0) +
    (CoExtra.Values.RealStateLeasing || 0) +
    (CoExtra.Values.Retirements || 0) +
    (CoExtra.Values.Pension || 0);
  return {
    Renta,
    CoRenta,
    SumRenta: Renta + CoRenta,
  };
};
