/**
 *
 * Project
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import { Collapse, CollapseHeader, CollapseContent } from 'components/Collapse';
import { Form as ExForm, Field as ExField, Label, FormGroup } from 'components/ExForm';

function TitleReport_1() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <ExForm
      // initialValues={initialValues}
      onSubmit={values => console.log(values)}
    >
    {form => (
      <Box>
        <BoxHeader>
          <b>INFORMES DE TÍTULO</b>
        </BoxHeader>
        <BoxContent className="p-3">
          <Alert type="warning">
            Debes ingresar las fechas en que enviaste el Informe de Títulos a cada Institución Financiera
          </Alert>
          <Collapse>
            <CollapseHeader>
              <div className="d-flex align-items-center">
                <Label className="order-1 color-main">Banco Estado</Label>
                <div className="order-2 d-flex align-items-center justify-content-end flex-grow-1">
                  <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
                    <span className="badge badge-caution px-2">Pendiente</span>
                  </div>
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={() => setDropdownOpen(!dropdownOpen)}                    
                  >
                    <DropdownToggle tag="a" className="icon icon-dots main_color ml-1" />
                    <DropdownMenu right positionFixed>
                      <DropdownItem
                        tag="a"
                        onClick={() => {}}
                      >
                        Ver datos
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </CollapseHeader>
            <CollapseContent>
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex justify-content-start align-items-center py-3 border-top">
                    <Label className="m-0 pr-3">Fecha envío Informe de Títulos</Label>                    
                    <ExField
                      type="datePicker"
                      name="PromesaInstructions"                                    
                      // required
                    />
                  </div>
                  <div className="mt-3 table-responsive-xl">
                    <Label>OBSERVACIONES</Label>
                    <Table size="sm" className="table-borderless">
                      <tbody>
                        <tr className="align-middle-group no-whitespace">
                          <td>
                            <Label className="color-regular">
                              <em className="color-gray">07 mar. 2020</em>
                            </Label>
                          </td>
                          <td>
                            <Label>
                              Se modificó según solicitud del banco, lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus .
                            </Label>
                          </td>
                        </tr>                         
                        <tr className="align-middle-group no-whitespace">
                          <td>
                            <Label className="color-regular">
                              <em className="color-gray">07 mar. 2020</em>
                            </Label>
                          </td>
                          <td>
                            <Label>
                              Se modificó según solicitud del banco, lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus .
                            </Label>
                          </td>
                        </tr>                       
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Label>Nueva Observación</Label>
                <div className="pt-2">
                  <textarea className="w-100 d-block rounded-lg shadow-sm" rows="5"></textarea>
                </div>
                <div className="mt-3 text-right">
                  <Button>Guardar Observación</Button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex justify-content-start align-items-center py-3 border-bottom">
                    <Label>APROBACIÓN INFORME DE TÍTULOS</Label>
                  </div>
                </div>
              </div>
              <div className="mt-3 table-responsive-xl background-color-white rounded py-3">
                <Table size="sm" className="m-0 border-right border-left p-0">
                  <tbody>
                    <tr className="align-middle-group border-bottom no-whitespace">
                      <td className="pl-3">
                        <Label>Informe Aprobado por Institución Financiera</Label>
                      </td>
                      <td className="text-right">
                        <div className="d-flex align-items-center justify-content-end">
                          <span className="font-14-rem mr-2">Aprobación Banco Estado.pdf</span>
                          <ExField
                            type="file"
                            name="PhysicalMask"
                            placeholder = "Examinar..."
                            style={{width: "9em", height: "2.2em"}}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="row mt-4">
                <div className="col-md-6 offset-md-6">
                  <div className="d-flex justify-content-end py-3 border-top">
                    <Button>Guardar aprovación</Button>
                    <Button className="m-btn-white">Cancelar</Button>
                  </div>
                </div>
              </div>
            </CollapseContent>
          </Collapse>

          <Collapse>
            <CollapseHeader>
              <div className="d-flex align-items-center">
                <Label className="order-1 color-main">Santander</Label>
                <div className="order-2 d-flex align-items-center justify-content-end flex-grow-1">
                  <div className="badge-group d-flex justify-content-end align-items-center rounded overflow-hidden">
                    <span className="badge badge-success px-2">Aprobado</span>
                  </div>
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={() => setDropdownOpen(!dropdownOpen)}                    
                  >
                    <DropdownToggle tag="a" className="icon icon-dots main_color ml-1" />
                    <DropdownMenu right positionFixed>
                      <DropdownItem
                        tag="a"
                        onClick={() => {}}
                      >
                        Ver datos
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </CollapseHeader>
            <CollapseContent>
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex justify-content-start align-items-center py-3 border-top">
                    <Label className="m-0 pr-3">Fecha envío Informe de Títulos</Label>                    
                    <ExField
                      type="datePicker"
                      name="PromesaInstructions"                                    
                      // required
                    />
                  </div>
                  <div className="mt-3 table-responsive-xl">
                    <Label>OBSERVACIONES</Label>
                    <Table size="sm" className="table-borderless">
                      <tbody>
                        <tr className="align-middle-group no-whitespace">
                          <td>
                            <Label className="color-regular">
                              <em className="color-gray">07 mar. 2020</em>
                            </Label>
                          </td>
                          <td>
                            <Label>
                              Se modificó según solicitud del banco, lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus .
                            </Label>
                          </td>
                        </tr>                         
                        <tr className="align-middle-group no-whitespace">
                          <td>
                            <Label className="color-regular">
                              <em className="color-gray">07 mar. 2020</em>
                            </Label>
                          </td>
                          <td>
                            <Label>
                              Se modificó según solicitud del banco, lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus .
                            </Label>
                          </td>
                        </tr>                       
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6 offset-md-6">
                  <div className="d-flex justify-content-end py-3 border-top">
                    <Button>Guardar</Button>
                    <Button className="m-btn-white">Cancelar</Button>
                  </div>
                </div>
              </div>
            </CollapseContent>
          </Collapse>
        </BoxContent>
      </Box>
    )}
    </ExForm>
  );
}

TitleReport_1.propTypes = {
  // promesa: PropTypes.object,
};

export default TitleReport_1;
