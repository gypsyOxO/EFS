import React, { Component, Fragment} from "react"


import TextField from "@material-ui/core/TextField"
import FormHelperText from "@material-ui/core/FormHelperText"
//import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from "@material-ui/core/Checkbox"
import { Select } from "@material-ui/core"
//import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import ReactSelect from "react-select"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

import Autocomplete from "@material-ui/lab/Autocomplete"
import CircularProgress from "@material-ui/core/CircularProgress"
import { GET_COMMITTEES } from "graphql/ie/Queries"
import { withApollo } from "react-apollo"

export class renderReactSelectField extends Component {
	constructor(props) {
		super(props)
		this.hiddenSelect = React.createRef()
	}

	//if options exists and field value !== "" set up selectedOption, else set to null

	state = {
		selectedOptions: this.props.options && this.props.field.value ? this.props.options.filter(option => option.selected) : null
	}

	handleChange = selectedOptions => {
		this.setState(
			() => ({ selectedOptions }),
			() => {
				// ! sends custom event bubble for onchangehandler
				const event = new Event("change", { bubbles: true })
				this.hiddenSelect.current.dispatchEvent(event)
			}
		)
	}

	render() {
		const {
			options,
			field: { name, value },
			form: { touched, errors, setFieldValue, setFieldTouched },
			placeholder,
			disabled
		} = this.props
		const { selectedOptions } = this.state

		let finalOptions = null

		//changes border to red if there is an error
		const errorStyle = {
			control: (base) => ({
				...base,
				borderColor: "#ca0909"
			})
		}

		if (value && options && options.length && "options" in options[0]) {
			finalOptions = options.reduce((acc, currentValue) => acc.concat(currentValue.options), [])
		} else if (value && options && options.length) {
			finalOptions = [...options]
		}

		return (
			<Fragment>
				<ReactSelect
					options={options}
					isDisabled={disabled}
					name={name}
					styles={touched[name] && errors[name] && errorStyle}
					placeholder={placeholder}
					value={finalOptions && finalOptions.length ? finalOptions.find(option => option.value === value) : ""}
					onChange={option => {
						this.props.SelectHandler && this.props.SelectHandler(name, option.value)
						this.handleChange()
						setFieldTouched(name,true)
						return setFieldValue(name, option.value)
					}}
					className="basic-select"
				/>
				{touched[name] && errors[name] && <FormHelperText style={{ color: "#ca0909" }}>{errors[name]}</FormHelperText>}

				<select
					ref={this.hiddenSelect}
					name={name}
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
			</Fragment>
		)
	}
}

export class renderDatePicker extends Component {
	constructor(props) {
		super(props)
		this.hiddenInput = React.createRef()
	}

	state = {
		selectedDate: this.props.field.value
	}

	handleChange = selectedDate => {
		this.setState(
			() => ({ selectedDate }),
			() => {
				// sends custom event bubble for onchangehandler
				const event = new Event("change", { bubbles: true })
				this.hiddenInput.current.dispatchEvent(event)
			}
		)
	}

	render() {
		const {
			required,
			field: { name, value },
			form: { setFieldValue, setFieldTouched, errors, touched },
			label
		} = this.props
		const { selectedDate } = this.state

		return (
			<Fragment>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						name={name}
						clearable
						allowKeyboardControl
						autoOk
						required={required}
						inputVariant="outlined"
						label={label}
						format="M/dd/yyyy"
						disableFuture
						helperText={touched[name] && errors[name]}
						error={touched[name] && Boolean(errors[name])}
						onAccept={date => this.handleChange(date)}
						onChange={(rawDate, selectedValue) => {
							if (rawDate) {
								if (rawDate.toJSON()) {
									!touched.name && setFieldTouched(name, true)
									setFieldValue(name, rawDate.toJSON().slice(0, 10))
								} else {
									!touched.name && setFieldTouched(name, true)
									setFieldValue(name, selectedValue)
								}
							} else {
								!touched.name && setFieldTouched(name, true)
								setFieldValue(name, null)
							}
						}}
						value={value ? value + "PST" : null} //converts to pacific standard time
					/>
				</MuiPickersUtilsProvider>
				<input readOnly type="text" ref={this.hiddenInput} name={name} value={selectedDate} style={{ display: "none" }}></input>
			</Fragment>
		)
	}
}

export const renderTextField = ({ readOnly = false,field, field: { name, value }, form: { touched, errors }, ...props }) => {
	return (
		<TextField
			{...field}
			{...props}
			name={name}
			value={value ? value : ""}
			helperText={touched[name] && errors[name]}
			error={touched[name] && Boolean(errors[name])}
            variant="outlined"
            InputProps={{readOnly: !!readOnly}}

		/>
	)
}

class renderAutoComplete extends Component {
	constructor(props) {
		super(props)
        this.hiddenInput = React.createRef()
	}

	state = {
        selectedValue: this.props.field.value.CMT_PER_ID || "",
        options: [],
        open: false,
        loading: true
	}

    componentDidMount = async () => {
		

		const { client } = this.props
		const {loading,
			data: { getCommittees }
		} = await client.query({ query: GET_COMMITTEES })
        

        
		this.setState({ options: getCommittees , loading: loading })
	}


	handleChange = selectedValue => {
		this.setState(
			() => ({ selectedValue }),
			() => {
				// sends custom event bubble for onchangehandler
				const event = new Event("change", { bubbles: true })
				this.hiddenInput.current.dispatchEvent(event)
			}
		)
	}

	render() {

		/*************************************************************************************************/
        //inputs: 
        //  option_key ;dropdown key
        //  option_label ;dropdown label        
        //  dependent_fields ;when dropdown value is selected, updates and touches dependent field        
        //      in the format: [{name: "", key: ""}]
        //      e.g. dependent_fields = [{name: "CONTRIBUTIONS_MADE.${index}.officeSought", key: "officeSought"},{name: "CONTRIBUTIONS_MADE.${index}.candidateOrCommitteeName", key: "candidateOrCommitteeName"}]
		/*************************************************************************************************/

		const {
			form: { setFieldTouched, setFieldValue },
			field: { name, value},
			option_key,
            option_label,
            dependent_fields = [],            
			label,
			width
        } = this.props
        const { selectedValue, open, options, loading } = this.state




		return (
			<Fragment>
				<Autocomplete
					style={{ width: width }}
					name={name}
					open={open}
					value={options.length ? options.find(option => option[option_key] === value) : ""}
					onOpen={() => {
                        this.setState({open: true})						
					}}
					onClose={() => {
						this.setState({open: false})
                    }}
                    
                    //handles onChange for multiple dependent fields in an array
					onChange={(_, value) => {
                        if(value) {
                            setFieldValue(name, value[option_key]) 
                            dependent_fields.length && dependent_fields.forEach(field => {
                                setFieldValue(field.name, value[field.key] )
                                setFieldTouched(field.name, true)
                            })  
                            setFieldTouched(name, true)                            
                        } else {
                            setFieldValue(name, "")
                            setFieldTouched(name, true)  
                            dependent_fields.length && dependent_fields.forEach(field => {
                                setFieldValue(field.name, "" )
                                setFieldTouched(field.name, true)
                            })  
                        }
                        this.handleChange(value ? value[option_key] : "")
                    }}
                    
					getOptionLabel={option => option[option_label]}
					options={options}
					loading={loading}
					autoHighlight
					renderInput={params => (
						<TextField
							{...params}
							label={label}
							fullWidth
							variant="outlined"
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<Fragment>
										{loading ? <CircularProgress color="inherit" size={20} /> : null}
										{params.InputProps.endAdornment}
									</Fragment>
								)
							}}
						/>
					)}
				/>
				<input readOnly type="text" ref={this.hiddenInput} name={name} value={selectedValue} style={{ display: "none" }}></input>
			</Fragment>
		)
	}
}

export default withApollo(renderAutoComplete)


export const renderCheckbox = ({ field }) => {
	return <Checkbox checked={field.value} {...field} />
}

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
