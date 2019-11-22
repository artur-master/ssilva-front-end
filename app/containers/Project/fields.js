import React from 'react';
import { Link } from 'react-router-dom';
import { getContactType } from 'containers/App/helpers';
import ExUsers from 'components/ExForm/ExUsers';
import ExConstructoras from 'components/ExForm/ExConstructoras';
import ExInmobiliarias from 'components/ExForm/ExInmobiliarias';
import RealEstateView from 'containers/Common/RealEstate/RealEstateView';
import moment from 'components/moment';
import ExAseguradoras from 'components/ExForm/ExAseguradoras';
import ExInstitucionFinancieras from 'components/ExForm/ExInstitucionFinancieras';

const getUserIndex = (UsersProyecto, userType) => {
  let userIndex = UsersProyecto.findIndex(
    user =>
      user.UserProyectoType === userType ||
      user.UserProyectoTypeID === userType,
  );
  if (userIndex < 0) {
    UsersProyecto.push({
      UserProyectoTypeID: userType,
      UserProyectoType: userType,
      UserID: '',
    });
    userIndex = UsersProyecto.length - 1;
  }
  return userIndex;
};

export const getGeneralFields = project => {
  const { UsersProyecto = [], ContactInfo = [] } = project;

  /* prepare contact type */
  const phoneContactType = getContactType('phone');
  const emailContactType = getContactType('email');
  // index email
  let emailIndex = ContactInfo.findIndex(
    contact => contact.ContactInfoType === 'Email',
  );
  // make sure has 2 phones + 1 email
  if (emailIndex < -1) {
    ContactInfo.push({
      ...emailContactType,
      Value: '',
    });
    emailIndex = ContactInfo.length - 1;
  }
  // index phones
  if (ContactInfo[1] === undefined)
    ContactInfo.push({
      ...phoneContactType,
      Value: '',
    });
  if (ContactInfo[2] === undefined)
    ContactInfo.push({
      ...phoneContactType,
      Value: '',
    });
  const phones = ContactInfo.reduce((acc, contact, index) => {
    if (contact.ContactInfoType === 'Phone') {
      acc.push(index);
    }
    return acc;
  }, []);
  /* index of users of project */
  const userProjectIndex = getUserIndex(UsersProyecto, 'Jefe de Proyecto');
  return [
    {
      label: 'Nombre Proyecto',
      name: 'Name',
      maxlen: 40,
      required: true,
      placeholder: 'Ingrese el nombre',
    },
    {
      label: 'Abreviación Proyecto',
      name: 'Symbol',
      maxlen: 5,
      required: true,
      placeholder: 'Ej: JDF',
    },
    {
      label: 'Teléfono Fijo',
      name: `ContactInfo.${phones[0]}.Value`,
      view: entity =>
        entity.ContactInfo && entity.ContactInfo[phones[0]]
          ? entity.ContactInfo[phones[0]].Value
          : '',
      required: true,
    },
    {
      label: 'Teléfono Móvil',
      name: `ContactInfo.${phones[1]}.Value`,
      view: entity =>
        entity.ContactInfo && entity.ContactInfo[phones[1]]
          ? entity.ContactInfo[phones[1]].Value
          : '',
      required: true,
    },
    {
      label: 'Mail',
      type: 'email',
      name: `ContactInfo.${emailIndex}.Value`,
      view: entity =>
        entity.ContactInfo && entity.ContactInfo[emailIndex]
          ? entity.ContactInfo[emailIndex].Value
          : '',
      required: true,
      placeholder: 'Ej: usuario@gmail.com',
    },
    {
      label: 'Dirección',
      name: 'Address',
      maxlen: 150,
      view: entity => {
        const Address = [entity.Address];
        if (entity.Comuna) {
          Address.push(entity.Comuna);
        }
        return Address.join(', ');
      },
      required: true,
      placeholder: 'Ej: Av La Florida 2087',
    },
    {
      label: 'Jefe de Proyecto',
      name: `UsersProyecto.${userProjectIndex}.UserID`,
      view: entity =>
        entity.UsersProyecto && entity.UsersProyecto[userProjectIndex]
          ? entity.UsersProyecto[userProjectIndex].Name
          : '',
      required: true,
      query: { roles: 'Jefe de Proyecto' },
      Component: ExUsers,
    },
    {
      label: 'Comuna',
      name: 'ComunaID',
      view: (entity, { comunas = [] }) => {
        if (entity.ComunaID) {
          const comuna = comunas.find(
            item => item.ComunaID === entity.ComunaID,
          );
          return [comuna.Provincia, comuna.Regione].join(', ');
        }
        return null;
      },
      required: true,
      type: 'comunas',
    },
    {
      label: 'Estado de la Etapa',
      type: 'stageStates',
      name: 'EtapaStateID',
      view: entity =>
        entity && entity.EtapaState ? entity.EtapaState.Name : '',
      required: true,
    },
    {
      label: 'Inmobiliaria',
      name: `InmobiliariaID`,
      view: entity => {
        if (entity && entity.InmobiliariaID) {
          const InmobiliariaLinkView = RealEstateView(({ onOpen }) => (
            <div className="d-flex align-items-center">
              <span className="font-14-rem mr-3" style={{ maxWidth: '13em' }}>
                {entity.Inmobiliaria}
              </span>
              <Link
                to="/"
                className="btn-arrow font-14-rem"
                onClick={evt => {
                  evt.preventDefault();
                  onOpen();
                }}
              >
                <b>Ver ficha</b>
              </Link>
            </div>
          ));
          return <InmobiliariaLinkView ID={entity.InmobiliariaID} />;
        }
        return '';
      },
      Component: ExInmobiliarias,
      required: true,
    },
  ];
};

export const getCommercialFields = project => {
  const { UsersProyecto = [] } = project;

  /* index of users of project */
  const userAsistenteIndex = getUserIndex(UsersProyecto, 'Asistente Comercial');
  const userVendedorIndex = getUserIndex(UsersProyecto, 'Vendedor');
  const userRepresentanteIndex = getUserIndex(UsersProyecto, 'Representante');
  const userAprobadorIndex = getUserIndex(UsersProyecto, 'Aprobador');
  const userAutorizadorIndex = getUserIndex(UsersProyecto, 'Autorizador');
  const userArquitectoIndex = getUserIndex(UsersProyecto, 'Arquitecto');
  const userMarketingIndex = getUserIndex(UsersProyecto, 'Marketing');
  const userLegalIndex = getUserIndex(UsersProyecto, 'Legal');
  const userFinanzaIndex = getUserIndex(UsersProyecto, 'Finanza');

  return [
    /* Commercial Data */
    {
      label: 'Asistente Comercial',
      name: `UsersProyecto.${userAsistenteIndex}.UserID`,
      view: entity =>
        entity.UsersProyecto && entity.UsersProyecto[userAsistenteIndex]
          ? entity.UsersProyecto[userAsistenteIndex].Name
          : '',
      query: { roles: 'Asistente Comercial' },
      required: true,
      Component: ExUsers,
    },
    {
      label: 'Vendedor',
      name: `UsersProyecto.${userVendedorIndex}.UserID`,
      view: entity =>
        entity.UsersProyecto && entity.UsersProyecto[userVendedorIndex]
          ? entity.UsersProyecto[userVendedorIndex].Name
          : '',
      Component: ExUsers,
      query: { roles: 'Vendedor' },
      required: true,
    },
    {
      label: 'Representante Inmobiliaria',
      name: `UsersProyecto.${userRepresentanteIndex}.UserID`,
      view: entity =>
        entity.UsersProyecto && entity.UsersProyecto[userRepresentanteIndex]
          ? entity.UsersProyecto[userRepresentanteIndex].Name
          : '',
      Component: ExUsers,
      query: { roles: ['Representante', 'Inmobiliario'] },
      required: true,
    },
    {
      label: 'Aprobador Inmobiliaria',
      name: `UsersProyecto.${userAprobadorIndex}.UserID`,
      view: entity =>
        entity.UsersProyecto && entity.UsersProyecto[userAprobadorIndex]
          ? entity.UsersProyecto[userAprobadorIndex].Name
          : '',
      Component: ExUsers,
      query: { roles: ['Aprobador', 'Inmobiliario'] },
      required: true,
    },
    {
      label: 'Autorizador Inmobiliaria',
      name: `UsersProyecto.${userAutorizadorIndex}.UserID`,
      view: entity =>
        entity.UsersProyecto && entity.UsersProyecto[userAutorizadorIndex]
          ? entity.UsersProyecto[userAutorizadorIndex].Name
          : '',
      Component: ExUsers,
      query: { roles: ['Autorizador', 'Inmobiliario'] },
      required: true,
    },

    {
      label: 'Arquitecto',
      name: `UsersProyecto.${userArquitectoIndex}.UserID`,
      view: entity =>
        entity.UsersProyecto && entity.UsersProyecto[userArquitectoIndex]
          ? entity.UsersProyecto[userArquitectoIndex].Name
          : '',
      Component: ExUsers,
      query: { roles: ['Arquitecto', 'Inmobiliario'] },
      required: true,
    },
    {
      label: 'Marketing',
      name: `UsersProyecto.${userMarketingIndex}.UserID`,
      view: entity =>
        entity.UsersProyecto && entity.UsersProyecto[userMarketingIndex]
          ? entity.UsersProyecto[userMarketingIndex].Name
          : '',
      Component: ExUsers,
      query: { roles: ['Marketing'] },
      required: true,
    },
    {
      label: 'Legal',
      name: `UsersProyecto.${userLegalIndex}.UserID`,
      view: entity =>
        entity.UsersProyecto && entity.UsersProyecto[userLegalIndex]
          ? entity.UsersProyecto[userLegalIndex].Name
          : '',
      Component: ExUsers,
      query: { roles: ['Legal'] },
      required: true,
    },
    {
      label: 'Finanzas',
      name: `UsersProyecto.${userFinanzaIndex}.UserID`,
      view: entity =>
        entity.UsersProyecto && entity.UsersProyecto[userFinanzaIndex]
          ? entity.UsersProyecto[userFinanzaIndex].Name
          : '',
      Component: ExUsers,
      query: { roles: ['Finanzas'] },
      required: true,
    },
    {
      label: 'Constructora',
      name: `ConstructoraID`,
      view: entity => (entity ? entity.Constructora : ''),
      Component: ExConstructoras,
      required: true,
    },
    {
      label: 'Duración Cotización',
      name: `CotizacionDuration`,
      view: entity => `${entity.CotizacionDuration} Días`,
      type: 'select',
      children: [
        <option key={0} value="">
          Selecciona...
        </option>,
        <option key={1} value={1}>
          1
        </option>,
        <option key={2} value={2}>
          2
        </option>,
      ],
      required: true,
    },
    {
      label: 'Monto Reserva',
      name: `GuaranteeAmount`,
      view: entity => (entity ? `UF ${entity.GuaranteeAmount}` : ''),
      placeholder: 'UF',
      type: 'number',
      min: 0,
      required: true,
    },
    {
      label: 'Entrega Inmediata',
      name: 'EntregaInmediata',
      view: entity => (entity.EntregaInmediata ? 'Si' : 'No'),
      type: 'radioGroup',
      required: true,
      options: [{ value: 1, label: 'Si' }, { value: 0, label: 'No' }],
    },
    {
      label: 'Institucion Financiera',
      name: `InstitucionFinancieraID`,
      view: entity => (entity ? entity.InstitucionFinanciera : ''),
      Component: ExInstitucionFinancieras,
      required: true,
    },
  ];
};

export const getPolizaFields = () => [
  /* Poliza Data */
  {
    label: 'Monto de la Póliza',
    name: `Aseguradora.Amount`,
    view: entity => `UF ${entity.Aseguradora ? entity.Aseguradora.Amount : ''}`,
    type: 'number',
    min: 0,
    required: true,
  },
  {
    label: 'Fecha Vencimiento',
    name: `Aseguradora.ExpirationDate`,
    view: entity =>
      entity.Aseguradora && entity.Aseguradora.ExpirationDate
        ? moment(entity.Aseguradora.ExpirationDate).format('DD MMM YYYY')
        : '',
    required: true,
    type: 'datepicker',
  },
  {
    label: 'Ente que da la Póliza',
    name: `Aseguradora.AseguradoraID`,
    view: entity =>
      entity && entity.Aseguradora.Aseguradora
        ? entity.Aseguradora.Aseguradora
        : '',
    required: true,
    Component: ExAseguradoras,
  },
];
