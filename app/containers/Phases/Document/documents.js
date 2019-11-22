import { stringToBoolean } from 'containers/App/helpers';

export const getDocuments = entity => {
  const isCompany = stringToBoolean(entity.Cliente.IsCompany);
  const isIndependent = stringToBoolean(entity.Cliente.Extra.Independent);
  const hasProfesion = stringToBoolean(entity.Cliente.Ocupation);
  const hasTieneDeposito = !!entity.Patrimony.DownPayment;
  const hasTieneCredito = !!entity.Patrimony.CreditoConsumo.PagosMensuales;
  let baseDocuments = [
    {
      documentoName: 'Transferencia',
      documentoType: 'DocumentPagoGarantia',
      required: true,
    },
    {
      documentoName: 'Cotizacion',
      accept: 'pdf',
      documentoType: 'DocumentCotizacion',
      firmado: true,
      required: true,
    },
  ];
  if (!isCompany && entity.Cliente.CivilStatus !== 'Soltero(a)') {
    baseDocuments.push({
      documentoName: 'Certificado Matrimonio',
      documentoType: 'DocumentCertificadoMatrimonio',
      firmado: true,
    });
  }
  if (isCompany) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: 'Constitucion Sociedad',
        documentoType: 'DocumentConstitucionSociedad',
        firmado: true,
        required: true,
      },
      {
        documentoName: 'Certificado de Vigencia de sociedad',
        accept: 'pdf',
        documentoType: 'DocumentCertificadoSociedad',
        required: true,
      },
      {
        documentoName: 'Carpeta Tributaria de Últimos Dos Años',
        documentoType: 'DocumentCarpetaTributaria',
        required: true,
      },
      {
        documentoName: '3 Últimos Balances Timbrados',
        documentoType: 'DocumentBalancesTimbrados',
        required: true,
      },
    ];
  }

  if (isIndependent) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: '6 Últimas boletas de homorarios o pagos IVA',
        documentoType: 'Document6IVA',
      },
      {
        documentoName: '2 Últimas declaraciones anuales de renta (DAI)',
        documentoType: 'Document2DAI',
      },
    ];
    if (hasProfesion) {
      baseDocuments.push({
        documentoName: 'Título Profesional',
        documentoType: 'DocumentTituloProfesional',
      });
    }
    if (hasTieneDeposito) {
      baseDocuments.push({
        documentoName: 'Acreditación de Ahorros',
        documentoType: 'DocumentAcredittacionAhorros',
      });
    }
    if (hasTieneCredito)
      baseDocuments.push({
        documentoName: 'Acreditación de pago Deudas',
        documentoType: 'DocumentAcredittacionDeudas',
      });
  }

  if (!isCompany) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: 'Fotocopia Carnet',
        documentoType: 'DocumentFotocopiaCarnet',
      },
      {
        documentoName: 'Cotizaciones AFP',
        documentoType: 'DocumentCotizacionAFP',
      },
      {
        documentoName: 'Liquidacion 1',
        documentoType: 'DocumentLiquidacion1',
      },
      {
        documentoName: 'Liquidacion 2',
        documentoType: 'DocumentLiquidacion2',
      },
      {
        documentoName: 'Liquidacion 3',
        documentoType: 'DocumentLiquidacion3',
      },
    ];
  }
  return baseDocuments;
};
