import moment from 'components/moment';

export default function model({ preload = {}, project = {}, offer = {} }) {
  const { Cuotas = [] } = offer;
  if (Cuotas.length < 1)
    Cuotas.push({
      Amount: 0,
      Date: moment().format(),
      Observacion: '',
    });
  return {
    ReservaID: offer.ReservaID || null,
    ValueProductoFinanciero: offer.ValueProductoFinanciero || 0,
    Condition: offer.Condition || [],
    CotizacionID: offer.CotizacionID || '',
    ProyectoID: project.ProyectoID,
    Folio: offer.Folio,

    EmpresaCompradora: offer.EmpresaCompradora || {
      Rut: '',
      RazonSocial: '',
      Address: '',
    },

    IsOwner: offer.IsOwner || 1,
    Patrimony: offer.Patrimony || {
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
    ContactMethodTypeID: offer.ContactMethodTypeID || null,
    Inmuebles: offer.Inmuebles || [],
    VendedorID: offer.VendedorID || '',
    Vendedor: offer.Vendedor || {},
    UserID: null,
    ClienteID: offer.ClienteID || '',
    Cliente: {
      UserID: (offer.Cliente || {}).UserID || '',
      FindingTypeID: (offer.Cliente || {}).FindingTypeID || null,
      InterestedTypeID: (offer.Cliente || {}).InterestedTypeID || null,
      ...(offer.Cliente || {}),
      Extra: {
        Values: {
          Honoraries:
            (((offer.Cliente || {}).Extra || {}).Values || {}).Honoraries || '',
        },
        Independent: ((offer.Cliente || {}).Extra || {}).Independent || 0,
        ...((offer.Cliente || {}).Extra || {}),
      },
    },
    Empleador: offer.Empleador || {
      Rut: '',
      RazonSocial: '',
      Extra: { Address: '', CurrentPosition: '', Phone: '' },
    },
    CodeudorID: offer.CodeudorID || null,
    Codeudor: offer.Codeudor || null,
    CoEmpleador: offer.CoEmpleador || {
      Rut: '',
      RazonSocial: '',
      Extra: { Address: '', CurrentPosition: '', Phone: '' },
    },
    CotizacionType:
      offer.CotizacionTypeID || preload.quotationUtils.CotizacionTypes[0].Name,
    IsNotInvestment: (offer.IsNotInvestment ? '1' : '0') || '',
    CotizacionStateID: offer.CotizacionStateID || null,
    PayType: offer.PayType || preload.paymentUtils[0].PayTypeID,
    Cuotas,
    PaymentFirmaPromesa: offer.PaymentFirmaPromesa || 0,
    PaymentFirmaEscritura: offer.PaymentFirmaEscritura || 0,
    PaymentInstitucionFinanciera: offer.PaymentInstitucionFinanciera || 0,
    DateFirmaPromesa: moment(offer.DateFirmaPromesa || new Date()).format(),
    percent: offer.percent || {},
    convert: offer.convert || {},
  };
}
