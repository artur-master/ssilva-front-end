/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Field as ExField } from 'components/ExForm';
import RadioGroup from 'components/ExForm/RadioGroup';
import { stringToBoolean } from 'containers/App/helpers';
import { Collapse, CollapseContent, CollapseHeader } from 'components/Collapse';

const Labor = ({ group = 'Cliente', values }) => {
  let Empleador = group === 'Codeudor' ? 'CoEmpleador' : 'Empleador';
  const { Extra, IsCompany } = values[group];
  if (IsCompany) Empleador = 'EmpresaCompradora';

  return (
    <Collapse>
      <CollapseHeader>Antecedentes Laborales</CollapseHeader>
      <CollapseContent>
        <div className="row pb-3">
          {!IsCompany && (
            <>
              <span className="font-14-rem color-main px-3 mt-3 col-12">
                <b>¿QUÉ TIPO DE EMPLEO TIENE?</b>
              </span>
              <div className="col-12 col-md-6 mb-3 mt-3">
                {Extra.Independent ? 'Independiente' : 'Contrato'}
              </div>
              <FormGroup className="col-12 col-md-6 d-flex">
                <Label className="w-50 m-0 font-14-rem">
                  <b>Cargo Actual Cliente</b>
                </Label>
                <span className="font-14-rem">{Extra.CurrentPosition}</span>
              </FormGroup>
              {!stringToBoolean(Extra.Independent) && (
                <>
                  <span className="font-14-rem color-main px-3 mt-3 col-12">
                    <b>¿DURANTE CUANTO TIEMPO?</b>
                  </span>
                  <FormGroup className="col-12 col-md-6 mt-3 d-flex">
                    <Label className="w-50 m-0 font-14-rem">
                      <b>Antigüedad Laboral</b>
                    </Label>
                    <ExField
                      type="select"
                      name={`${Empleador}.Extra.Antiguedad`}
                      className="w-50"
                    >
                      <option value="">Selecciona...</option>
                      <option value="1">Menos de un año</option>
                      <option value="2">1 año</option>
                      <option value="3">2 a 5 años</option>
                      <option value="4">6 o más años</option>
                    </ExField>
                  </FormGroup>
                </>
              )}
            </>
          )}
          <span className="font-14-rem color-main px-3 mt-3 col-12">
            <b>¿DÓNDE TRABAJA?</b>
          </span>
          <FormGroup className="col-12 col-md-6 d-flex mt-3">
            <Label className="w-50 m-0 font-14-rem">
              <b>Nombre Empleador</b>
            </Label>
            <ExField
              className="caution w-50"
              name={`${Empleador}.RazonSocial`}
              required
            />
          </FormGroup>
          <FormGroup className="col-12 col-md-6 d-flex mt-3">
            <Label className="w-50 m-0 font-14-rem">
              <b>RUT Empleador</b>
            </Label>
            <ExField
              className="w-50 caution"
              name={`${Empleador}.Rut`}
              required
            />
          </FormGroup>
          {!IsCompany && (
            <FormGroup className="col-12 col-md-6 d-flex mt-3">
              <Label className="w-50 m-0 font-14-rem">
                <b>Teléfono Empleador</b>
              </Label>
              <ExField
                className="caution w-50"
                name={`${Empleador}.Extra.Phone`}
                required
                placeholder="+562"
              />
            </FormGroup>
          )}
          <FormGroup className="col-12 col-md-6 d-flex mt-3">
            <Label className="w-50 m-0 font-14-rem">
              <b>Dirección Empleador</b>
            </Label>
            <ExField
              className="w-50"
              name={`${
                IsCompany
                  ? 'EmpresaCompradora.Address'
                  : `${Empleador}.Extra.Address`
              }`}
            />
          </FormGroup>
        </div>
      </CollapseContent>
    </Collapse>
  );
};

Labor.propTypes = {
  group: PropTypes.string,
  values: PropTypes.object,
};
export default Labor;
