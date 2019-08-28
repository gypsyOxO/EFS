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

const StepperNextButton = () => {
	const classes = useStyles()

	return (
		<div className={classes.buttons}>
			<Button
				type="submit"
				className={classes.button}
				variant="contained"
				color="primary">
				Next
			</Button>
		</div>
	)
}

export default StepperNextButton
