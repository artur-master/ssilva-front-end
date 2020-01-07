import moment from 'components/moment';
import { Auth } from '../App/helpers';

export default function model({ project = {}, entity = {} }) {
  const { Cuotas = [] } = entity;
  if (Cuotas.length < 1)
    Cuotas.push({
      Amount: 0,
      Date: new Date(),
      Observacion: '',
    });
  return {
    ReservaID: entity.ReservaID || null,
    ValueProductoFinanciero: entity.ValueProductoFinanciero || 0,
    Condition: entity.Condition || [],
    CotizacionID: entity.CotizacionID || null,
    ProyectoID: project.ProyectoID,
    Folio: entity.Folio,

    EmpresaCompradora: entity.EmpresaCompradora || {
      Rut: '',
      RazonSocial: '',
      Address: '',
    },
    Documents: entity.Documents || {},
    IsOwner: !(entity.Patrimony && entity.Patrimony.Rent),
    Patrimony: entity.Patrimony || {
      RealState: 0,
      Rent: 0,
      CreditoHipotecario: {
        Pasivos: 0,
        PagosMensuales: 0,
        Saldo: 0,
      },
      Vehicle: 0,
      DownPayment: 0,
      Other: 0,
      CreditCard: {
        Pasivos: 0,
        PagosMensuales: 0,
        Saldo: 0,
      },
      CreditoConsumo: {
        Pasivos: 0,
        PagosMensuales: 0,
        Saldo: 0,
      },
      PrestamoEmpleador: {
        Pasivos: 0,
        PagosMensuales: 0,
        Saldo: 0,
      },
      DeudaIndirecta: {
        Pasivos: 0,
        PagosMensuales: 0,
        Saldo: 0,
      },
      AnotherCredit: {
        Pasivos: 0,
        PagosMensuales: 0,
        Saldo: 0,
      },
      CreditoComercio: {
        Pasivos: 0,
        PagosMensuales: 0,
        Saldo: 0,
      },
    },
    ContactMethodTypeID: entity.ContactMethodTypeID || null,
    ContactMethodType: entity.ContactMethodType || null,
    Inmuebles: entity.Inmuebles || [],
    VendedorID: entity.VendedorID || Auth.get('user_id'),
    Vendedor: entity.Vendedor || Auth.get('user'),
    UserID: null,
    ClienteID: entity.ClienteID || '',
    Cliente: {
      UserID: (entity.Cliente || {}).UserID || '',
      // FindingTypeID: (entity.Cliente || {}).FindingTypeID || null,
      InterestedTypeID: (entity.Cliente || {}).InterestedTypeID || null,
      ...(entity.Cliente || {}),
      Extra: {
        Values: {
          Honoraries:
            (((entity.Cliente || {}).Extra || {}).Values || {}).Honoraries ||
            '',
        },
        Independent: ((entity.Cliente || {}).Extra || {}).Independent || 0,
        ...((entity.Cliente || {}).Extra || {}),
      },
    },
    Empleador: entity.Empleador || {
      Rut: '',
      RazonSocial: '',
      Extra: { Address: '', CurrentPosition: '', Phone: '' },
    },
    CodeudorID: entity.CodeudorID || null,
    Codeudor: entity.Codeudor || null,
    CoEmpleador: entity.CoEmpleador || {
      Rut: '',
      RazonSocial: '',
      Extra: { Address: '', CurrentPosition: '', Phone: '' },
    },
    CotizacionType:
      entity.CotizacionType ||
      window.preload.quotationUtils.CotizacionTypes[0].Name,
    IsNotInvestment: (entity.IsNotInvestment ? '1' : '0') || false,
    CotizacionStateID: entity.CotizacionStateID || '',
    PayType: entity.PayType || window.preload.paymentUtils[0].PayTypeID,
    Cuotas,
    PaymentFirmaPromesa: entity.PaymentFirmaPromesa || 0,
    PaymentFirmaEscritura: entity.PaymentFirmaEscritura || 0,
    PaymentInstitucionFinanciera: entity.PaymentInstitucionFinanciera || 0,
    AhorroPlus: entity.AhorroPlus || 0,
    DateFirmaPromesa: entity.DateFirmaPromesa
      ? moment(entity.DateFirmaPromesa).format()
      : new Date(),
    percent: entity.percent || {},
    convert: entity.convert || {},
    confirmes: {
      general: false,
      client: false,
      inmueble: false,
      forma: false,
    },
  };
}
