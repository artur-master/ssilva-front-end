/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import ExClients from 'components/ExForm/ExClients';
import { Collapse, CollapseContent, CollapseHeader } from 'components/Collapse';
import Renta from './Renta';
import Labor from './Labor';
import RentaSummary from './RentaSummary';

const Codeudor = ({ form, removeCodeudor }) => (
  <Collapse>
    <CollapseHeader>Co-Deudor</CollapseHeader>
    <CollapseContent>
      <div className="add-client my-4 row">
        <div className="col-12 add-box d-flex align-items-center font-14">
          <span>
            <b>Cliente</b>
          </span>
          <ExClients
            name="Codeudor.UserID"
            onSelect={val => {
              form.setFieldValue('Codeudor', val);
              form.setFieldValue('CodeudorID', val.UserID);
              if (val.Empleador)
                form.setFieldValue('CoEmpleador', val.Empleador);
            }}
            query={{ notIn: [form.values.ClienteID] }}
            component={({ openClientElement }) => (
              <Link
                to="/"
                onClick={evt => {
                  evt.preventDefault();
                  openClientElement(true);
                }}
                className={
                  form.values.CodeudorID ? 'btn-pen ml-3' : 'btn-plus ml-3'
                }
              >
                <b>
                  {form.values.CodeudorID && form.values.Codeudor.Name}
                  {!form.values.CodeudorID && 'Agregar Cliente'}
                </b>
              </Link>
            )}
          />
        </div>
      </div>
      <article className="person-record pt-3">
        <Labor values={form.values} group="Codeudor" />
        <Renta group="Codeudor" form={form} />
      </article>
    </CollapseContent>
  </Collapse>
);

Codeudor.propTypes = {
  form: PropTypes.object,
  removeCodeudor: PropTypes.func,
};
export default Codeudor;
