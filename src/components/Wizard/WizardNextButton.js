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
	const { navigateNext, errors, setFieldTouched, validationGroup, touched, values } = props

	//isValid: check intersection on validation group and errors and differences on validationgroup and touched for validity.

	const isValid =
		(isEmpty(validationGroup.filter(field => Object.keys(errors).includes(field))) &&
			isEmpty(validationGroup.filter(field => !Object.keys(touched).includes(field)))) ||
		isEmpty(validationGroup.filter(field => !values[field]))
        
	return (
		<div className={classes.buttons}>
			<Button
				onClick={isValid ? navigateNext : () => validationGroup.map(field => setFieldTouched(field))}
				className={classes.button}
				variant="contained"
				color={
					isEmpty(validationGroup.filter(fields => Object.keys(errors).includes(fields))) ? "primary" : null
				}>
				Next
			</Button>
		</div>
	)
}

export default WizardNextButton
