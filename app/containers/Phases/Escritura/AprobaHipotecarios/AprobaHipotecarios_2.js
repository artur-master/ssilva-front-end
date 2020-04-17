/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Form as ExForm, Field as ExField, Label, FormGroup } from 'components/ExForm';

function AprobaHipotecarios_2() {
  return (
    <ExForm
      // initialValues={initialValues}
      onSubmit={values => console.log(values)}
    >
    {form => (
      <Box>
        <BoxHeader>
          <b>APROBACIÓN CRÉDITOS HIPOTECARIOS</b>
        </BoxHeader>
        <BoxContent>
          <div>
            <Alert type="warning">
              Debes gestionar las aprobaciones formales de los créditos.
            </Alert>
            <div className="mt-3">
              <div>
                <div>
                  <Label>DECLARACIÓN PERSONAL DE SALUD</Label>
                  <div className="font-14-rem mt-2">
                    <span>Archivo</span>
                    <Link to="#" className="color-main ml-3">declaración-salud-christian-campos.pdf</Link>
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="regular-color-font d-block">
                    DATOS EJECUTIVO
                  </Label>
                  <div className="row justify-content-between">
                    <div className="col-md-6 d-flex align-items-center mt-3">
                      <Label style={{width: "17.2em"}}>Banco</Label>
                      <span className="font-14-rem">Banco Estado</span>
                    </div>
                    <div className="col-md-6 d-flex align-items-center mt-3">
                      <Label style={{width: "17.2em"}}>Banco</Label>
                      <span className="font-14-rem">Banco Estado</span>
                    </div>
                    <div className="col-md-6 d-flex align-items-center mt-3">
                      <Label style={{width: "17.2em"}}>Banco</Label>
                      <span className="font-14-rem">Banco Estado</span>
                    </div>
                    <div className="col-md-6 d-flex align-items-center mt-3">
                      <Label style={{width: "17.2em"}}>Banco</Label>
                      <span className="font-14-rem">Banco Estado</span>
                    </div>
                    {/* <div className="col-md-6 d-flex align-items-center mt-3">
                      <span className="font-14-rem" style="width: 17.2em"><b>Nombre Ejecutivo</b></span>
                      <span className="font-14-rem">Eduardo Gutierrez</span>
                    </div>
                    <div className="col-md-6 d-flex align-items-center mt-3">
                      <span className="font-14-rem" style="width: 17.2em"><b>Email Ejecutivo</b></span>
                      <span className="font-14-rem">eduardo_gutierrez@bancoestado.cl</span>
                    </div>
                    <div className="col-md-6 d-flex align-items-center mt-3">
                      <span className="font-14-rem" style="width: 17.2em"><b>Comprobante Institución Financiera</b></span>
                      <span className="font-14-rem">Comprobante-bancoestado.pdf</span>
                    </div> */}
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="pt-3 border-top">
                      <Label className="d-block">
                        APROBACIÓN CRÉDITO
                      </Label>
                      <div className="d-flex mt-4">
                        <ExField
                          type="radioGroup"
                          required
                          name="PromesaInstructions"
                          options={[
                            { label: 'Aprobado', value: '1' },
                            { label: 'Rechazado', value: '0' },
                          ]}
                          itemClassName="pr-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Alert type="warning">
              Se enviarán los datos a Escrituración.
            </Alert>
            <Alert type="warning">
              Debes Entregar la carpeta física a Escrituración.
            </Alert>
          </div>
          <div className="d-flex align-items-center justify-content-end mt-3">
            <ExField
              label="Declaro haber entregado la carpeta física a Escrituración"
              type="checkbox"
              name="Check"
            />
            <Button>
              Confirmo Notificación
            </Button>
            <Button color="white">
              Cancelar
            </Button>
          </div>
        </BoxContent>
      </Box>
    )}
    </ExForm>
  );
}

AprobaHipotecarios_2.propTypes = {
  // promesa: PropTypes.object,
};

export default AprobaHipotecarios_2;
