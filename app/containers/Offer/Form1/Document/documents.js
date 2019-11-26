const documents = [
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
  {
    documentoName: 'Certificado Matrimonio',
    documentoType: 'DocumentCertificadoMatrimonio',
    firmado: true,
  },
  {
    documentoName: 'Constitucion Sociedad',
    documentoType: 'DocumentConstitucionSociedad',
    firmado: true,
    // noExisteable: true,
  },
  {
    documentoName: 'Fotocopia Carnet',
    documentoType: 'DocumentFotocopiaCarnet',
    required: true,
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
export default documents;
