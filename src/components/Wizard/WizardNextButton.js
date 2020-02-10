import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import isEmpty from "lodash/isEmpty"

const useStyles = makeStyles(theme => ({
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing(4),
		marginLeft: theme.spacing(1)
	}
}))

const WizardNextButton = props => {
	const classes = useStyles()
	const { navigateNext, errors, setFieldTouched, validationGroup, touched, values, validateForm, isValid } = props

	//isValid: check intersection on validation group and errors and differences on validationgroup and touched for validity.

	// const isValid =
	// 	(isEmpty(validationGroup.filter(field => Object.keys(errors).includes(field))) &&
	// 		isEmpty(validationGroup.filter(field => !Object.keys(touched).includes(field)))) ||
    // 	isEmpty(validationGroup.filter(field => !values[field]))
    
    const handleClick = () => {
        validateForm().then(res => {
            if (!isEmpty(res)) {
                return Promise.reject() 
            }                    
        }).then(navigateNext).catch(res => res)
    }
    
	return (
		<div className={classes.buttons}>
			<Button
				//onClick={isValid ? navigateNext : () => validationGroup.map(field => setFieldTouched(field))}
				onClick={ () => handleClick()}
				className={classes.button}
				type="submit"
				variant="contained"
				color={isValid ? "primary" : "default"}
				// {
				// 	isEmpty(validationGroup.filter(fields => Object.keys(errors).includes(fields))) ? "primary" : "default"
				// }
			>
				Next
			</Button>
		</div>
	)
}

export default WizardNextButton
