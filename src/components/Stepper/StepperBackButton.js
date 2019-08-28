import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"

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

const StepperNextButton = props => {
	const classes = useStyles()
	const { previousStep } = props

	return (
		<div className={classes.buttons}>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				onClick={previousStep}>
				Back
			</Button>
		</div>
	)
}

export default StepperNextButton
