import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import useValidateForm from "views/ie/Wizard/hooks/useValidateForm"

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
    const { navigateNext, isValid } = props
    
    const validate = useValidateForm()
    
    const validateClick = async () => {
        const res = await validate()
        res && navigateNext()
    }

 	return (
		<div className={classes.buttons}>
			<Button				
				onClick={ validateClick}
				className={classes.button}
				type="submit"
				variant="contained"
				color={isValid ? "primary" : "default"}
			>
				Next
			</Button>
		</div>
	)
}

export default WizardNextButton
