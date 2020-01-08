import { stringToBoolean, getDescendantProp } from 'containers/App/helpers';

export const isValidClient = client => {
  const isCompany = stringToBoolean(client.IsCompany);
  const requiredOfCompany = [
    'Rut',
    'Name',
    'ReprenetanteLegal',
    'GiroEmpresa',
    'Contact.0.Value',
  ];
  const requiredOfPersonal = [
    'Rut',
    'Name',
    'LastNames',
    'Ocupation',
    'BirthDate',
    'ComunaID',
    'Genre',
    'CivilStatus',
    'Carga',
    'Nationality',
    'IsDefinitiveResidence',
    'Position',
    'Extra.SalaryRank',
    'Antiquity',
    'TotalPatrimony',
    'Contact.0.Value',
  ];
  if (isCompany) {
    return !requiredOfCompany.find(
      field => getDescendantProp(client, field) === '',
    );
  }
  return !requiredOfPersonal.find(
    field => getDescendantProp(client, field) === '',
  );
};
