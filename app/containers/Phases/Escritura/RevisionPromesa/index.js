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
import { getCheckPromesaModel } from '../models';

function RevisionPromesa({
  isCollapse=true, 
  initialValues,
  onSubmit
}) {
  const model = getCheckPromesaModel(initialValues);

  return (
    <Box collapse={!isCollapse} isOpen={isCollapse}>
      <BoxHeader>
        <b>REVISIÓN PROMESA A ESCRITURAR</b>
      </BoxHeader>
      <ExForm
        initialValues={initialValues}
        onSubmit={(values)=>{
          const data = new FormData();
          model.forEach(({name,type}) => {
            if(type==='file' && values[name].name)
              data.append(name, values[name]);
            else if(values[name] !== null)
              data.append(name, values[name]);
          });
          data.append("CarepetaFisicaState", values['CarepetaFisicaState']);
          onSubmit(data);
        }}
      >
        {() => (
          <>
            <BoxContent className="p-3">
              <Alert type="warning">
                Debes revisar si la promesa tiene condiciones especiales, y verificar que sea igual que las vesión de Legal.
              </Alert>
              <div className="d-flex align-items-center mr-4">
                <ExField
                  type="checkbox"
                  name="CarepetaFisicaState"
                  className="m-0"
                  readOnly={!isCollapse}
                />                
                <Label className="pr-3">Recibí Carepeta Física</Label>
                <Button
                  className="m-btn-download m-btn-white order-3"
                  onClick={()=>console.log("download")}
                >
                  Descargar promesa
                </Button>                
              </div>
              <div className="mt-3 table-responsive-xl background-color-white rounded py-3">
                <Table size="sm" className="m-0 border-right border-left p-0">
                  <tbody>
                    {model.map( ({label, name, type}) => (
                      <tr className="align-middle-group border-bottom no-whitespace" key={name}>
                        {type === "label" ? (
                          <td className="pl-3 no-whitespace" colSpan="3">
                            <span className="font-14-rem color-regular color-gray">
                              <b>{label}</b>
                            </span>
                          </td>): ( <>
                          <td className="pl-3">
                            <span className="font-14-rem color-regular">
                              <b>{label}</b>
                            </span>
                          </td>
                          <td className="w-100"></td>
                          <td className="pr-3">
                            <div className="d-flex align-items-center justify-content-end pr-2">
                              {type == "radios" && 
                                <ExField
                                  type="radios"
                                  required
                                  name={name}
                                  options={[
                                    { label: 'Si', value: '1' },
                                    { label: 'No', value: '0' },
                                  ]}
                                  itemClassName="col-auto px-1"
                                  readOnly={!isCollapse}
                                />
                              }
                              {type == "file" && 
                                <ExField
                                  type="file"
                                  name={name}
                                  placeholder = "Examinar..."
                                  style={{width:"12em", height:"2.2em"}}
                                  required
                                />
                              }
                            </div>
                          </td> </>)
                        }
                      </tr>
                    ))}                    
                  </tbody> 
                </Table>
              </div>
            </BoxContent>
            <BoxFooter>
              <Button type="submit" disabled={!isCollapse}>
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
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func
};

export default RevisionPromesa;
