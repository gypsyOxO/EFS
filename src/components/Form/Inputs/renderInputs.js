import React from "react"
import TextField from "@material-ui/core/TextField"
//import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from "@material-ui/core/Checkbox"
import { Select } from "@material-ui/core"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"

export const renderTextField = ({ field, ...props
	// input,
	// label,
	// meta: { touched, error },
	// ...custom
}) => (
	<TextField
        {...field}
        {...props}
		// hintText={label}
		variant="outlined"
		// floatingLabelText={label}
		// errorText={touched && error}
		// label={label}
		// {...input}
		// {...custom}
	/>
)

export const renderCheckbox = ({ input, label }) => (
	<Checkbox
		label={label}
		checked={input.value ? true : false}
		onCheck={input.onChange}
	/>
)

export const renderRadioGroup = ({field, ...props}) => {
	return (
	<RadioGroup
		{...field}
        {...props}        		
	/>)
}

export const renderSelectField = ({
	input,
	label,
	meta: { touched, error },
	children,
	...custom
}) => (
	<Select
		floatingLabelText={label}
		variant="outlined"
		errorText={touched && error}
		{...input}
		onChange={(event, index, value) => input.onChange(value)}
		children={children}
		{...custom}
	/>
)
