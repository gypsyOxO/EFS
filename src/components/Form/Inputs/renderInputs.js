import React, { Component } from "react"

import TextField from "@material-ui/core/TextField"
//import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from "@material-ui/core/Checkbox"
import { Select } from "@material-ui/core"
//import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import ReactSelect from "react-select"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"


 

    export class renderReactSelectField extends Component {
        constructor(props) {
            super(props)
            this.hiddenSelect = React.createRef()
        }
    
        
    
        //if options exists and field value !== "" set up selectedOption, else set to null
    
        state = {
            selectedOptions:
                this.props.options && this.props.field.value ? this.props.options.filter(option => option.selected) : null
        }
    
        handleChange = selectedOptions => {          
            this.setState(
                () => ({ selectedOptions }),
                () => {
                    // ! this is a bit hacky.. use at your own risk ;) ! W.E. note. Use it or lose it.
                    const event = new Event("change", { bubbles: true })
                    this.hiddenSelect.current.dispatchEvent(event)
                }
            )
        }
    
        render() {
            const { options, field, form, placeholder } = this.props
            const { selectedOptions } = this.state
    
            
            
            let finalOptions = null
            
            
            //Handles drop down groups, format: [{label: group 1, options: [{label: sub_group 1, value: sub_group_value}]}]
            if (field.value && options && options.length && "options" in options[0]) {
                
                finalOptions = options.reduce(
                    (acc, currentValue) => acc.concat(currentValue.options),
                    []
                )
            } else if(field.value && options && options.length) {
                
                finalOptions = [...options]
    
            }
            
            //console.log('field.value', field.value, 'finalOptions', finalOptions, 'options', options)
            
            return (
                <div>
                    <ReactSelect
                        ref={this.ref}
                        options={options}
                        
                        
                        name={field.name}
                        
                        placeholder={placeholder}
                        value={finalOptions && finalOptions.length ? finalOptions.find(option => option.value === field.value) : ""}
                        
                        onChange={option => {   
                            this.props.SelectHandler && this.props.SelectHandler(field.name, option.value)                                                                
                            this.handleChange()
                            
                            return form.setFieldValue(field.name, option.value)
                        }}
                        className="basic-select"
                    />
    
                    <select
                        ref={this.hiddenSelect}
                        name={field.name}
                        value={selectedOptions && selectedOptions.length ? selectedOptions.map(option => option.value) : ""}
                        readOnly
                        style={{ display: "none" }}>
                        >
                        {selectedOptions
                            ? selectedOptions.map(option => (
                                    <option key={option.label} value={option.value}>
                                        {option.label}
                                    </option>
                              ))
                            : ""}
                    </select>
                </div>
            )
        }
    }
    


export const renderDatePicker = ({ label, field: { value, name, onChange }, form: { setFieldValue } }) => {
    


	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				name={name}
				clearable
				allowKeyboardControl
				autoOk
				inputVariant="outlined"
				label={label}
				format="MM/dd/yyyy"
                disableFuture            
                onChange={(rawDate, selectedValue) => {
                    rawDate ? rawDate.toJSON() ? setFieldValue(name, rawDate.toJSON().slice(0,10)) : setFieldValue(name, selectedValue)  : setFieldValue(name,null)}				
                }
				value={value ? value + "PST" : null} //converts to pacific standard time
			/>
		</MuiPickersUtilsProvider>
	)
}

export const renderTextField = ({
	field,
	...props

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
	<Checkbox label={label} checked={input.value ? true : false} onCheck={input.onChange} />
)

export const renderRadioGroup = ({ field, ...props }) => {
	return <RadioGroup {...field} {...props} />
}

export const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
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
