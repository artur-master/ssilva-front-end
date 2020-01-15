export const getStepTimeline = ({
  DateEnvioPromesa,
  DateRegresoPromesa,
  DateLegalizacionPromesa,
  DateEnvioCopias,
}) => {
  if (DateEnvioCopias) return 4;
  if (DateLegalizacionPromesa) return 3;
  if (DateRegresoPromesa) return 2;
  if (DateEnvioPromesa) return 1;
  return 0;
};
