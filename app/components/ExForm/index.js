import React from 'react';
import PropTypes from 'prop-types';
import StageState from './StageState';
import Comunas from './Comunas';
import Input from './Input';
import ExField from './ExField';
import Form from './Form';
import FormGroup from './FormGroup';
import Label from './Label';
import Radio from './Radio';
import DatePicker from './DatePicker';
import File from './File';
import RadioGroup from './RadioGroup';
import UserInmobiliaria from './UserInmobiliaria';
import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';
import Provincia from './Provincia';
import ExFieldCurrency from './ExFieldCurrency';

const Field = ({ type = 'text', ...props }) => {
  switch (type) {
    case 'userInmobiliaria':
      return <UserInmobiliaria {...props} />;
    case 'stageState':
    case 'stageStates':
      return <StageState {...props} />;
    case 'radio':
      return <Radio {...props} />;
    case 'radios':
    case 'radioGroup':
      return <RadioGroup {...props} />;
    case 'checkbox':
      return <Checkbox {...props} />;
    case 'checkboxes':
    case 'checkboxGroup':
      return <CheckboxGroup {...props} />;
    case 'datePicker':
    case 'datepicker':
      return <DatePicker {...props} />;
    case 'comunas':
    case 'comuna':
      return <Comunas {...props} />;
    case 'provincias':
    case 'provincia':
      return <Provincia {...props} />;
    case 'file':
      return <File {...props} />;
    case 'currency':
      return <ExFieldCurrency {...props} type="text" />;
    default:
      return <ExField {...props} type={type} />;
  }
};
Field.propTypes = {
  type: PropTypes.string,
};

export { Form, Input, Field, FormGroup, Label };
