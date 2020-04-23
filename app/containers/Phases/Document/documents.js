import { stringToBoolean, isCreditPayment } from 'containers/App/helpers';

export const getDocuments = entity => {
  const isCompany = stringToBoolean(entity.Cliente.IsCompany);
  const isIndependent = stringToBoolean(entity.Cliente.Extra.Independent);
  // const hasProfesion = stringToBoolean(entity.Cliente.Ocupation);
  const hasProfesion = (entity.Cliente.Ocupation.trim() !== "");
  const hasTieneDeposito = entity.Patrimony.DownPayment !== 0;
  const hasTieneCredito = entity.Patrimony.CreditoConsumo.PagosMensuales !== 0;
  let baseDocuments = [
    {
      documentoName: 'Transferencia',
      documentoType: 'DocumentPagoGarantia',
      required: true,
    }, 
    // {
    //   documentoName: 'Cheques',
    //   documentoType: 'DocumentFirmadoCheques',
    //   accept: 'pdf',
    //   firmado: true,
    // },
    {
      documentoName: 'Cotizacion',
      documentoType: 'DocumentCotizacion',
      autoGenerate: true,
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
      documentoType: 'DocumentFirmadoCotizacion',
      firmado: true,
      required: true,
    },
  ];

  if(isCreditPayment(entity.PayType)) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: 'Ficha Pre-aprobacion',
        documentoType: 'DocumentFirmadoFichaPreAprobacion',
        accept: 'pdf',
        firmado: true,
      },
      {
        documentoName: 'Simulación de crédito',
        documentoType: 'DocumentFirmadoSimulador',
        accept: 'pdf',
        firmado: true,
      },
    ];
  }

  if (!isCompany && entity.Cliente.CivilStatus === 'Casado(a)') {
    baseDocuments.push({
      documentoName: 'Certificado Matrimonio',
      documentoType: 'DocumentCertificadoMatrimonio',
      firmado: true,
      required: true,
    });
  }

  if (isCompany) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: 'Constitucion de Sociedad',
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
    if (hasTieneDeposito)
      baseDocuments.push({
        documentoName: 'Acreditación de Ahorros',
        documentoType: 'DocumentAcredittacionAhorros',
        required: true,
      });
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
        required: true,
      },
      // {
      //   documentoName: 'Cotizaciones AFP',
      //   documentoType: 'DocumentCotizacionAFP',
      //   required: true,
      // },
      // {
      //   documentoName: 'PreAprobación De Crédito',
      //   documentoType: 'DocumentPreApprobation',
      //   accept: 'pdf',
      //   firmado: true,
      //   required: true,
      // },
      {
        documentoName: 'Últimos 3 liquidaciones',
        documentoType: 'DocumentLiquidacion1',
        required: true,
      },
    ];
  }
  return baseDocuments;
};

export const CodeudorDocuments = entity => {
  const isCompany = stringToBoolean(entity.Cliente.IsCompany);
  const isIndependent = stringToBoolean(entity.Cliente.Extra.Independent);
  const hasProfesion = stringToBoolean(entity.Cliente.Ocupation);
  const hasTieneDeposito = !!entity.Patrimony.DownPayment;
  const hasTieneCredito = !!entity.Patrimony.CreditoConsumo.PagosMensuales;
  let baseDocuments = [
    // {
    //   documentoName: 'Cheques',
    //   documentoType: 'DocumentCodeudorFirmadoCheques',
    //   accept: 'pdf',
    //   firmado: true,
    // },
    {
      documentoName: 'Ficha Pre-aprobacion',
      documentoType: 'DocumentCodeudorFichaPreAprobacion',
      autoGenerate: true,
    },
    {
      documentoName: 'Simulación de crédito',
      documentoType: 'DocumentCodeudorSimulador',
      autoGenerate: true,
    },
    {
      documentoName: 'Cotizacion',
      accept: 'pdf',
      documentoType: 'DocumentCodeudorCotizacion',
      firmado: true,
      required: true,
    },
  ];
  if (!isCompany && entity.Cliente.CivilStatus !== 'Soltero(a)') {
    baseDocuments.push({
      documentoName: 'Certificado Matrimonio',
      documentoType: 'DocumentCodeudorCertificadoMatrimonio',
      firmado: true,
    });
  }
  if (isCompany) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: 'Simulación de crédito',
        documentoType: 'DocumentCodeudorFirmadoSimulador',
        accept: 'pdf',
        firmado: true,
      },
      {
        documentoName: 'Constitucion Sociedad',
        documentoType: 'DocumentCodeudorConstitucionSociedad',
        firmado: true,
        required: true,
      },
      {
        documentoName: 'Certificado de Vigencia de sociedad',
        accept: 'pdf',
        documentoType: 'DocumentCodeudorCertificadoSociedad',
        required: true,
      },
      {
        documentoName: 'Carpeta Tributaria de Últimos Dos Años',
        documentoType: 'DocumentCodeudorCarpetaTributaria',
        required: true,
      },
      {
        documentoName: '3 Últimos Balances Timbrados',
        documentoType: 'DocumentCodeudorBalancesTimbrados',
        required: true,
      },
    ];
  }

  if (isIndependent) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: '6 Últimas boletas de homorarios o pagos IVA',
        documentoType: 'Document6IVACodeudor',
        required: true,
      },
      {
        documentoName: '2 Últimas declaraciones anuales de renta (DAI)',
        documentoType: 'Document2DAICodeudor',
        required: true,
      },
    ];
    if (hasProfesion) {
      baseDocuments.push({
        documentoName: 'Título Profesional',
        documentoType: 'DocumentCodeudorTituloProfesional',
        required: true,
      });
    }
    if (hasTieneDeposito) {
      baseDocuments.push({
        documentoName: 'Acreditación de Ahorros',
        documentoType: 'DocumentCodeudorAcredittacionAhorros',
        required: true,
      });
    }
    if (hasTieneCredito)
      baseDocuments.push({
        documentoName: 'Acreditación de pago Deudas',
        documentoType: 'DocumentCodeudorAcredittacionDeudas',
        required: true,
      });
  }

  if (!isCompany) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: 'Fotocopia Carnet',
        documentoType: 'DocumentCodeudorFotocopiaCarnet',
        required: true,
      },
      {
        documentoName: 'Liquidacion 1',
        documentoType: 'DocumentCodeudorLiquidacion1',
        required: true,
      },
      {
        documentoName: 'Liquidacion 2',
        documentoType: 'DocumentCodeudorLiquidacion2',
        required: true,
      },
      {
        documentoName: 'Liquidacion 3',
        documentoType: 'DocumentCodeudorLiquidacion3',
        required: true,
      },
    ];
  }
  return baseDocuments;
}