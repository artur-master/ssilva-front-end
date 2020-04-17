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
import { Form as ExForm, Field as ExField, Label } from 'components/ExForm';

function DatesEscrituracion() {
  return (
    <ExForm
      // initialValues={initialValues}
      onSubmit={values => console.log(values)}
    >
    {form => (
      <Box>
        <BoxHeader>
          <b>FECHAS ESCRITURACIÓN</b>
        </BoxHeader>
        <BoxContent className="p-3">
          <Alert type="warning">
            Debes ingresar los siguientes datos del Proyecto.
          </Alert>
          <div className="mt-3 table-responsive-xl background-color-white rounded py-3">
            <Table size="sm" className="m-0 border-right border-left p-0">
              <tbody>
                <tr className="align-middle-group border-bottom no-whitespace">
                  <td className="pl-3">
                    <span className="font-14-rem color-regular">
                      <b>Fecha Recepción Final Municipal</b>
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="d-flex align-items-center justify-content-end pr-2">
                      <ExField
                        type="datePicker"
                        name="PromesaInstructions"
                        style={{width:"8em", height: "2.2em"}}                                       
                        // required
                      />
                    </div>
                  </td>
                </tr>
                <tr className="align-middle-group border-bottom no-whitespace">
                  <td className="pl-3">
                    <span className="font-14-rem color-regular">
                      <b>Ley de Copropiedad Inmobiliaria</b>
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="d-flex align-items-center justify-content-end pr-2">
                      <div className="mr-3">
                        <ExField
                          type="file"
                          name="PhysicalMask"
                          placeholder = "Examinar..."
                          style={{width: "9em", height: "2.2em"}}
                        />
                      </div>
                      <ExField
                        type="datePicker"
                        name="PromesaInstructions"
                        style={{width:"8em", height: "2.2em"}}                                       
                        // required
                      />
                    </div>
                  </td>
                </tr>
                <tr className="align-middle-group border-bottom no-whitespace">
                  <td className="pl-3">
                    <span className="font-14-rem color-regular">
                      <b>Planos Inscritos en el Conservador</b>
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="d-flex align-items-center justify-content-end pr-2">
                      <div className="mr-3">
                        <ExField
                          type="file"
                          name="PhysicalMask"
                          placeholder = "Examinar..."
                          style={{width: "9em", height: "2.2em"}}
                        />
                      </div>
                      <ExField
                        type="datePicker"
                        name="PromesaInstructions"
                        style={{width:"8em", height: "2.2em"}}                                                    
                        // required
                      />
                    </div>
                  </td>
                </tr>
                <tr className="align-middle-group border-bottom no-whitespace">
                  <td className="pl-3">
                    <span className="font-14-rem color-regular">
                      <b>Fecha Inicio Escrituración</b>
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="d-flex align-items-center justify-content-end pr-2">
                      <ExField
                        type="datePicker"
                        name="PromesaInstructions"
                        style={{width:"8em", height: "2.2em"}}                                       
                        // required
                      />
                    </div>
                  </td>
                </tr>
                <tr className="align-middle-group border-bottom no-whitespace background-color-tab">
                  <td className="pl-3">
                    <span className="font-14-rem color-regular">
                      <b>Día para entregar Departamentos</b>
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="d-flex align-items-center justify-content-end pr-2">
                      <ExField
                        type="select"
                        name={`ContactInfoTypeID`}
                        style={{width:"12em"}}
                        // required
                      >
                        <option defaultValue hidden disabled>Cantidad de Días</option>
                        <option>2 días</option>
                        <option>3 días</option>
                      </ExField>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>            
          </div>
        </BoxContent>
        <BoxFooter>
          <Button type="submit">
            Guardar Datos Proyecto
          </Button>
          <Button type="reset" color="white">
            Cancelar
          </Button>
        </BoxFooter>
      </Box>
    )}
    </ExForm>
  );
}

DatesEscrituracion.propTypes = {
  // promesa: PropTypes.object,
};

export default DatesEscrituracion;
