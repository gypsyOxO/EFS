import React from 'react'
import TextField from '@material-ui/core/TextField';
//import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from '@material-ui/core/Checkbox';
import {Select} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

export const renderTextField = (
    { input, label, meta: { touched, error }, ...custom },
  ) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      label={label}
      {...input}
      {...custom}
    />
  );
  
export const renderCheckbox = ({ input, label }) => (
    <Checkbox
      label={label}
      checked={input.value ? true : false}
      onCheck={input.onChange}
    />
  );
  
export const renderRadioGroup = ({ input, ...rest }) => (
    <RadioGroup
      {...input}
      {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  );
  
export const renderSelectField = (
    { input, label, meta: { touched, error }, children, ...custom },
  ) => (
    <Select
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  );
  