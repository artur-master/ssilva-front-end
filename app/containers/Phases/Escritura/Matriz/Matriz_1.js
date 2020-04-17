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

function Matriz_1() {
  return (
    <ExForm
      // initialValues={initialValues}
      onSubmit={values => console.log(values)}
    >
    {form => (
      <Box>
        <BoxHeader>
          <b>MATRIZ DE ESCRITURA</b>
        </BoxHeader>
        <BoxContent className="p-3">
          <Alert type="warning">
            Debes revisar que la Matriz tenga los mismos datos que la promesa.
          </Alert>
          <div className="mt-2 font-18 rounded-lg d-flex align-items-center">
            <i className="icon icon-check color-success-icon"></i>
            <span className="font-14-rem color-regular">Matriz de Escritura Enviada</span>            
          </div>
          <Table size="sm" className="border">
            <tbody>
              <tr className="align-middle-group border-bottom no-whitespace">
                <td className="pl-3">
                  <Label>Matriz de Escritura Aprobada por Institución Financiera</Label>
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
              <tr className="align-middle-group border-bottom no-whitespace">
                <td className="pl-3">
                  <Label>Matriz de Instrucciones</Label>
                  <span className="font-14-rem color-white-gray ml-2">
                    <em>En caso de que aplique.</em>
                  </span>
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
          <div className="mt-3">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="p-2 border-bottom">
                  <Label className="color-warning"> Promesa </Label>
                </div> 
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="font-14-rem">PROMESA-GO-SAN-PABLO-013.pdf</span>
                  <a href="#" className="font-14-rem main_color btn-arrow mr-3">
                      <b>Ver Matriz de Escritura</b>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Label>¿LOS DATOS DE LA ESCRITURACIÓN Y LA PROMESA COINCIDEN?</Label  >
            <div className="d-flex align-items-center mt-3">
              <ExField
                type="radioGroup"
                required
                name="PromesaInstructions"
                options={[
                  { label: 'SI', value: '1' },
                  { label: 'NO', value: '0' },
                ]}
                itemClassName="pr-4"
              />
            </div>
          </div>         
          <div className="mt-4">
            <Alert type="warning">
              Debes revisar que la Matriz tenga los mismos datos que la promesa.
            </Alert>
            <Alert type="success" className="background-color-success-original" icon={false}>
              <i className="icon icon-check color-white mr-4"></i>
              <Label className="color-white">
                La Modificación de Promesa está lista. Ya puedes descargar la Escritura.
              </Label>
            </Alert>
          </div>
          <div className="mt-3 d-flex align-items-center">
            <Label >Modificación de Promesa</Label>
            <ExField
              type="file"
              name="PhysicalMask"
              placeholder = "Examinar..."
              style={{width: "9em", height: "2.2em"}}
              className="ml-4 mt-2"
            />
          </div>

          <div className="row mt-4">
            <div className="col-md-6 offset-md-6">
              <div className="d-flex justify-content-end border-top">
                <div className="d-flex mt-4">
                  <Button className="m-btn-download">
                    Descargar promesa
                  </Button>
                  <Button className="m-btn-white">
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </BoxContent>
      </Box>
    )}
    </ExForm>
  );
}

Matriz_1.propTypes = {
  // promesa: PropTypes.object,
};

export default Matriz_1;
