/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Field as ExField } from 'components/ExForm';
import RentaSummary from './RentaSummary';

const Renta = ({ group = 'Cliente', form }) => (
  <>
    <div className="row pb-3 border-top">
      <h4 className="col-12">
        <span className="w-50 border-bottom py-3 d-block">Renta</span>
      </h4>

      <span className="font-14-rem color-main px-3 mt-3 col-12">
        <b>¿CUÁL ES SU SUELDO?</b>
      </span>

      <FormGroup className="col-12 col-md-6 d-flex mt-3">
        <Label className="w-50 m-0 font-14-rem">
          <b>Sueldo Fijo Líquido</b>
        </Label>
        <ExField
          className="w-50"
          name={`${group}.Extra.Values.LiquidIncome`}
          placeholder="$"
          type="number"
        />
      </FormGroup>
      <FormGroup className="col-12 col-md-6 d-flex mt-3">
        <Label className="w-50 m-0 font-14-rem">
          <b>Sueldo Variable</b>
        </Label>
        <ExField
          className="w-50"
          name={`${group}.Extra.Values.VariableSalary`}
          placeholder="$"
          type="number"
        />
      </FormGroup>
      <FormGroup className="col-12 col-md-6 d-flex mt-3">
        <Label className="w-50 m-0 font-14-rem">
          <b>Honorarios Bruto</b>
        </Label>
        <ExField
          className="caution w-50"
          name={`${group}.Extra.Values.Honoraries`}
          required
          placeholder="$"
          type="number"
        />
      </FormGroup>
    </div>
    <div className="row pb-3 border-top">
      <span className="font-14-rem color-main px-3 mt-3 col-12">
        <b>¿TIENE ALGUNA ENTRADA EXTRA DE DINERO?</b>
      </span>

      <FormGroup className="col-12 col-md-6 d-flex mt-3">
        <Label className="w-50 m-0 font-14-rem">
          <b>Arriendo Bienes Raíces</b>
        </Label>
        <ExField
          className="w-50"
          name={`${group}.Extra.Values.RealStateLeasing`}
          placeholder="$"
          type="number"
        />
      </FormGroup>
      <FormGroup className="col-12 col-md-6 d-flex mt-3">
        <Label className="w-50 m-0 font-14-rem">
          <b>Retiros</b>
        </Label>
        <ExField
          className="w-50"
          name={`${group}.Extra.Values.Retirements`}
          placeholder="$"
          type="number"
        />
      </FormGroup>
      <FormGroup className="col-12 offset-md-6 col-md-6 d-flex mt-3">
        <Label className="w-50 m-0 font-14-rem">
          <b>Pensión</b>
        </Label>
        <ExField
          className="w-50"
          name={`${group}.Extra.Values.Pension`}
          placeholder="$"
          type="number"
        />
      </FormGroup>
    </div>
    <RentaSummary
      group={group}
      form={form}
      addCodeudor={evt => {
        evt.preventDefault();
        form.setFieldValue('Codeudor', {
          Extra: {
            Values: {
              Honoraries: '',
            },
            Independent: false,
          },
        });
      }}
      canAddCodeudor={
        !form.values.Codeudor &&
        !form.values.Cliente.IsCompany &&
        group === 'Cliente'
      }
    />
  </>
);

Renta.propTypes = {
  group: PropTypes.string,
  form: PropTypes.object,
};
export default Renta;
