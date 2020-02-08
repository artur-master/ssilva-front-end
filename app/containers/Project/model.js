import { getContactType } from 'containers/App/helpers';

export default function model(preload, project = {}) {
  const phoneContactType = getContactType('phone');
  const emailContactType = getContactType('email');
  const UsersProyecto = (project.UsersProyecto || []).map(user => ({
    ...user,
    UserProyectoTypeID: user.UserProyectoType,
  }));
  const EtapaStateID =
    project.EtapaStateID ||
    (project.EtapaState || { EtapaStateID: '' }).EtapaStateID;
  // merge phone
  const ContactInfo = [
    {
      ...phoneContactType,
      Value: '',
    },
    {
      ...phoneContactType,
      Value: '',
    },
  ];
  (
    (project.ContactInfo || project.Contact || []).filter(
      contact => contact.ContactInfoType === 'Phone',
    ) || []
  ).forEach((contact, index) => {
    ContactInfo[index] = {
      ...phoneContactType,
      Value: contact.Value ? contact.Value : '+56',
    };
  });
  // merge email
  ContactInfo[2] = (project.ContactInfo || project.Contact || []).find(
    contact => contact.ContactInfoType === 'Email',
  ) || {
    ...emailContactType,
    Value: '',
  };

  const {
    ProyectoID,
    Name = '',
    Arquitecto = '',
    Symbol = '',
    Address = '',
    InmobiliariaID = '',
    EntregaInmediata = 0,
    InstitucionFinancieraID,
    ConstructoraID,
    ComunaID = '',
    CotizacionDuration,
    GuaranteeAmount,
    Aseguradora = {},
  } = project;
  return {
    ProyectoID,
    Name,
    Arquitecto,
    Symbol,
    ContactInfo,
    Address,
    UsersProyecto,
    EtapaStateID,
    EntregaInmediata,
    InmobiliariaID,
    InstitucionFinancieraID,
    ConstructoraID,
    ComunaID,
    CotizacionDuration,
    GuaranteeAmount,
    Aseguradora,
  };
}
