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

const WizardBackButton = props => {
	const classes = useStyles()
    const { navigateBack } = props
    


	return (
		<div className={classes.buttons}>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				onClick={navigateBack}>
				Back
			</Button>
		</div>
	)
}

export default WizardBackButton
