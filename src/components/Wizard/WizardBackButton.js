import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
	button: {
		marginTop: theme.spacing(4),
		marginRight: theme.spacing(1)
	}
}))

const WizardBackButton = props => {
	const classes = useStyles()
	const { navigateBack } = props

	return (
		<Button className={classes.button} variant="contained" color="primary" onClick={navigateBack}>
			Back
		</Button>
	)
}

export default WizardBackButton
