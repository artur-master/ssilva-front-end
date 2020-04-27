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
import moment from 'components/moment';
import { Form as ExForm, Field as ExField, Label } from 'components/ExForm';
function DatesEscrituracion({canEdit = false, initialValues, onSubmit}) {
  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={(values)=>{
        const data = new FormData();
        if(values["ReceptionDate"] != "") 
          data.append("ReceptionDate", moment(values.ReceptionDate).format('YYYY-MM-DD'));
        if(values["RealEstateLawDate"] != "")
          data.append("RealEstateLawDate", moment(values["RealEstateLawDate"]).format('YYYY-MM-DD'));
        if(values["RealEstateLawFile"].name)
          data.append("RealEstateLawFile", values["RealEstateLawFile"]);
        if(values["PlansConservatorDate"] != "") 
          data.append("PlansConservatorDate", moment(values.PlansConservatorDate).format('YYYY-MM-DD'));
        if(values["PlansConservatorFile"].name)
          data.append("PlansConservatorFile", values["PlansConservatorFile"]);
        if(values["DeedStartDate"] != "")
          data.append("DeedStartDate", moment(values.DeedStartDate).format('YYYY-MM-DD'));
        if(values["DeliverDay"])
          data.append("DeliverDay", values["DeliverDay"]);
        onSubmit(data);
      }}
    >
    {() => (
      <Box collapse={!canEdit} isOpen={canEdit}>
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
                        name="ReceptionDate"
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
                          accept=".pdf"
                          name="RealEstateLawFile"
                          placeholder = "Examinar..."
                          style={{width: "9em", height: "2.2em"}}
                        />
                      </div>
                      <ExField
                        type="datePicker"
                        name="RealEstateLawDate"
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
                          accept=".pdf"
                          name="PlansConservatorFile"
                          placeholder = "Examinar..."
                          style={{width: "9em", height: "2.2em"}}
                        />
                      </div>
                      <ExField
                        type="datePicker"
                        name="PlansConservatorDate"
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
                        name="DeedStartDate"
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
                        name="DeliverDay"
                        style={{width:"12em"}}
                        // required
                      >
                        <option defaultValue hidden>Cantidad de Días</option>
                        <option value="2">2 días</option>
                        <option value="3">3 días</option>
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
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default DatesEscrituracion;
