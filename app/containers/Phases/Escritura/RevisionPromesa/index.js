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

function RevisionPromesa({isCollapse=true}) {
  const initialValues = {
    Date: '2019-4-17',
  };
  return (
    <Box collapse isOpen={isCollapse}>
      <BoxHeader>
        <b>REVISIÓN PROMESA A ESCRITURAR</b>
      </BoxHeader>
      <ExForm
        initialValues={initialValues}
        onSubmit={values => console.log(values)}
      >
        {form => (
          <>
            <BoxContent className="p-3">
              <Alert type="warning">
                Debes revisar si la promesa tiene condiciones especiales, y verificar que sea igual que las vesión de Legal.
              </Alert>
              <div className="d-flex align-items-center mr-4">
                <ExField
                  type="checkbox"
                  name="PhysicalMask"
                  className="m-0"
                />                
                <Label className="pr-3">Recibí Carepeta Física</Label>
                <Button className="m-btn-download m-btn-white order-3">
                  Descargar promesa
                </Button>                
              </div>
              <div className="mt-3 table-responsive-xl background-color-white rounded py-3">
                <Table size="sm" className="m-0 border-right border-left p-0">
                  <tbody>
                    <tr className="align-middle-group border-bottom no-whitespace">
                      <td className="pl-3">
                        <span className="font-14-rem color-regular">
                            <b>Promesa con Instrucciones</b>
                        </span>
                      </td>
                      <td className="w-100"></td>
                      <td className="pr-3">
                        <div className="d-flex align-items-center justify-content-end pr-2">
                          <ExField
                            type="radioGroup"
                            required
                            name="PromesaInstructions"
                            options={[
                              { label: 'Si', value: '1' },
                              { label: 'No', value: '0' },
                            ]}
                            itemClassName="col-auto px-1"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="align-middle-group border-bottom no-whitespace">
                      <td className="pl-3">
                        <span className="font-14-rem color-regular">
                            <b>Promesa con Instrucciones</b>
                        </span>
                      </td>
                      <td className="w-100"></td>
                      <td className="pr-3">
                        <div className="d-flex align-items-center justify-content-end pr-2">
                          <ExField
                            type="radioGroup"
                            required
                            name="PromesaInstructions"
                            options={[
                              { label: 'Si', value: '1' },
                              { label: 'No', value: '0' },
                            ]}
                            itemClassName="col-auto px-1"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="align-middle-group border-bottom no-whitespace">
                      <td className="pl-3">
                        <span className="font-14-rem color-regular">
                            <b>Promesa con Instrucciones</b>
                        </span>
                      </td>
                      <td className="w-100"></td>
                      <td className="pr-3">
                        <div className="d-flex align-items-center justify-content-end pr-2">
                          <ExField
                            type="radioGroup"
                            required
                            name="PromesaInstructions"
                            options={[
                              { label: 'Si', value: '1' },
                              { label: 'No', value: '0' },
                            ]}
                            itemClassName="col-auto px-1"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="align-middle-group border-bottom no-whitespace">
                      <td className="pl-3">
                        <span className="font-14-rem color-regular">
                            <b>Promesa con Instrucciones</b>
                        </span>
                      </td>
                      <td className="w-100"></td>
                      <td className="pr-3">
                        <div className="d-flex align-items-center justify-content-end pr-2">
                          <ExField
                            type="radioGroup"
                            required
                            name="PromesaInstructions"
                            options={[
                              { label: 'Si', value: '1' },
                              { label: 'No', value: '0' },
                            ]}
                            itemClassName="col-auto px-1"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="align-middle-group border-bottom no-whitespace">
                      <td className="pl-3">
                        <span className="font-14-rem color-regular">
                            <b>Promesa con Instrucciones</b>
                        </span>
                      </td>
                      <td className="w-100"></td>
                      <td className="pr-3">
                        <div className="d-flex align-items-center justify-content-end pr-2">
                          <ExField
                            type="radioGroup"
                            required
                            name="PromesaInstructions"
                            options={[
                              { label: 'Si', value: '1' },
                              { label: 'No', value: '0' },
                            ]}
                            itemClassName="col-auto px-1"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="align-middle-group border-bottom no-whitespace">
                      <td className="pl-3">
                        <span className="font-14-rem color-regular">
                            <b>Promesa con Instrucciones</b>
                        </span>
                      </td>
                      <td className="w-100"></td>
                      <td className="pr-3">
                        <div className="d-flex align-items-center justify-content-end pr-2">
                          <ExField
                            type="radioGroup"
                            required
                            name="PromesaInstructions"
                            options={[
                              { label: 'Si', value: '1' },
                              { label: 'No', value: '0' },
                            ]}
                            itemClassName="col-auto px-1"
                          />
                        </div>
                      </td>
                    </tr>                    
                    <tr className="align-middle-group ">
                      <td className="pl-3 no-whitespace" colSpan="3">
                        <span className="font-14-rem color-regular color-gray">
                          <b>Extranjero con RUT</b>
                        </span>
                      </td>
                    </tr>
                    <tr className="align-middle-group border-bottom no-whitespace">
                      <td className="pl-3">
                        <span className="font-14-rem color-regular">
                            <b>Promesa con Instrucciones</b>
                        </span>
                      </td>
                      <td className="w-100"></td>
                      <td className="pr-3">
                        <div className="d-flex align-items-center justify-content-end pr-2">
                          <ExField
                            type="radioGroup"
                            required
                            name="PromesaInstructions"
                            options={[
                              { label: 'Si', value: '1' },
                              { label: 'No', value: '0' },
                            ]}
                            itemClassName="col-auto px-1"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="align-middle-group border-bottom no-whitespace">
                      <td className="pl-3">
                        <span className="font-14-rem color-regular">
                            <b>Promesa con Instrucciones</b>
                        </span>
                      </td>
                      <td className="w-100"></td>
                      <td className="pr-3">
                        <div className="d-flex align-items-center">
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
                        <span className="font-14-rem color-regular">
                            <b>Promesa con Instrucciones</b>
                        </span>
                      </td>
                      <td className="w-100"></td>
                      <td className="pr-3">
                        <div className="d-flex align-items-center justify-content-end pr-2">
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
              </div>
            </BoxContent>
            <BoxFooter>
              <Button type="submit">
                Guardar
              </Button>
              <Button type="reset" color="white">
                Cancelar
              </Button>
              <Alert type="danger" className="mt-4">
                El resulrado de la revisión es distinto a la versión de Legal. Gerencia será notificada del caso.
              </Alert>
            </BoxFooter>
          </>
        )}
      </ExForm>
    </Box>
  );
}

RevisionPromesa.propTypes = {
  isCollapse: PropTypes.bool,
  // promesa: PropTypes.object,
};

export default RevisionPromesa;
