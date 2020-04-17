/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Form as ExForm, Field as ExField, Label, FormGroup } from 'components/ExForm';

function AprobaHipotecarios_1() {
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
        <BoxContent className="p-3">
          <Alert type="warning">
            Debes gestionar las aprobaciones formales de los créditos.
          </Alert>
          <div className="mt-3">
            <Label>
              DATOS EJECUTIVO INSTITUCIÓN FINANCIERA 1
            </Label>
            <div className="d-flex align-items-center p-0 mt-3">
              <ExField
                type="radioGroup"
                required
                name="PromesaInstructions"
                options={[
                  { label: 'Asistente Comercial', value: '1' },
                  { label: 'Compradoro', value: '0' },
                ]}
                itemClassName="pr-4"
              />
            </div>
            <Table size="sm" className="mt-3 border-right border-left p-0">
              <tbody>
                <tr className="align-middle-group border-bottom no-whitespace">
                  <td className="pl-3">
                    <Label>
                      Declaración Personal de Salud
                    </Label>
                  </td>
                  <td className="text-right">
                    <div className="d-flex align-items-center justify-content-end">
                      <ExField
                        type="file"
                        name="PhysicalMask"
                        placeholder = "Examinar..."
                        style={{width:"12em", height:"2.2em"}}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>

            <div className="row justify-content-between mt-3">
              <div className="col-md-6 mt-3">
                <FormGroup className="align-items-center">
                  <Label className="pr-4 no-whitespace">Banco</Label>
                  <ExField
                    type="select"
                    className="w-100"
                    name={`ContactInfoTypeID`}
                    // required
                  >
                    <option>Banco Estado</option>
                    <option>Banco de Chile</option>
                  </ExField>
                </FormGroup>
              </div>  
              <div className="col-md-6 mt-3">
                <FormGroup className="align-items-center">
                  <Label className="pr-4 no-whitespace">Nombre Ejecutivo</Label>
                  <ExField                
                    className="w-100"
                    name={`ContactInfoType`}
                    // required
                  />
                </FormGroup>
              </div>
              <div className="col-md-6 mt-3">
                <FormGroup className="align-items-center">
                  <Label className="pr-4 no-whitespace">Email Ejecutivo</Label>
                  <ExField                
                    className="w-100"
                    name={`ContactInfoType`}
                    // required
                  />
                </FormGroup>
              </div>
              <div className="col-md-6 mt-3">
                <FormGroup className="align-items-center">
                  <Label className="pr-4 no-whitespace">                    
                    {/* Carta de Aprobación */}
                    Comprobante Institución Financiera
                  </Label>                  
                  <ExField
                    type="file"
                    name="PhysicalMask"
                    placeholder = "Examinar..."
                  /> 
                </FormGroup>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6 offset-md-6">
                <div className="d-flex justify-content-end" style={{borderTop: "1px solid #e3e8ee"}}>
                  <Button className="mt-3 m-btn m-btn-plus m-btn-white order-3">
                    Agregar Institución Financiera
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </BoxContent>
        <BoxFooter>        
          <Button>
            Confirmo Notificación
          </Button>
          <Button color="white">
            Cancelar
          </Button>
        </BoxFooter>
      </Box>
    )}
    </ExForm>
  );
}

AprobaHipotecarios_1.propTypes = {
  // promesa: PropTypes.object,
};

export default AprobaHipotecarios_1;
