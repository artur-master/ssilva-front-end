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
      documentoName: 'Ficha Pre-aprobacion',
      documentoType: 'DocumentFichaPreAprobacion',
      autoGenerate: true,
    },
    {
      documentoName: 'Simulación de crédito',
      documentoType: 'DocumentSimulador',
      autoGenerate: true,
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
      },
      {
        documentoName: 'Certificado de Vigencia de sociedad',
        accept: 'pdf',
        documentoType: 'DocumentCertificadoSociedad',
      },
      {
        documentoName: 'Carpeta Tributaria de Últimos Dos Años',
        documentoType: 'DocumentCarpetaTributaria',
      },
      {
        documentoName: '3 Últimos Balances Timbrados',
        documentoType: 'DocumentBalancesTimbrados',
      },
    ];
  }

  if (isIndependent) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: '6 Últimas boletas de homorarios o pagos IVA',
        documentoType: 'Document6IVA',
        required: true,
      },
      {
        documentoName: '2 Últimas declaraciones anuales de renta (DAI)',
        documentoType: 'Document2DAI',
        required: true,
      },
    ];
    if (hasProfesion) {
      baseDocuments.push({
        documentoName: 'Título Profesional',
        documentoType: 'DocumentTituloProfesional',
        required: true,
      });
    }
    if (hasTieneDeposito) {
      baseDocuments.push({
        documentoName: 'Acreditación de Ahorros',
        documentoType: 'DocumentAcredittacionAhorros',
        required: true,
      });
    }
    if (hasTieneCredito)
      baseDocuments.push({
        documentoName: 'Acreditación de pago Deudas',
        documentoType: 'DocumentAcredittacionDeudas',
        required: true,
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
        documentoName: 'PreAprobación De Crédito',
        documentoType: 'DocumentPreApprobation',
        accept: 'pdf',
        firmado: true,
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
