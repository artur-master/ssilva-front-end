import { stringToBoolean, getDescendantProp } from 'containers/App/helpers';
import { isContadoType } from '../FormaDePago/helper';

export const isValidClient = ({ Cliente, PayType, CotizacionType }) => {
  const isCompany = stringToBoolean(Cliente.IsCompany);
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
    'Genre',
    'CivilStatus',
    'Carga',
    'Nationality',
    'IsDefinitiveResidence',
    'Position',
    'Contact.0.Value',
  ];

  if (!isContadoType(PayType)) {
    requiredOfPersonal.push(
      ...['Extra.SalaryRank', 'Antiquity', 'TotalPatrimony'],
    );
  }

  if (CotizacionType !== window.preload.quotationUtils.CotizacionTypes[1].Name)
    requiredOfPersonal.push('ComunaID');

  if (isCompany) {
    return !requiredOfCompany.find(
      field => getDescendantProp(Cliente, field) === '',
    );
  }
  return !requiredOfPersonal.find(
    field => getDescendantProp(Cliente, field) === '',
  );
};
