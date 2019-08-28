import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import FormValues from "./FormValues"
import CssBaseline from "@material-ui/core/CssBaseline"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepButton from "@material-ui/core/StepButton"

import StepperFormFirstPage from "./StepperFormFirstPage"
import StepperFormSecondPage from "./StepperFormSecondPage"
import StepperFormThirdPage from "./StepperFormThirdPage"
import StepperFormFourthPage from "./StepperFormFourthPage"
import StepperFormFifthPage from "./StepperFormFifthPage"
import Review from "./Review"

import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
	appBar: {
		position: "relative"
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
			width: 800,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3)
		}
	},
	stepper: {
		padding: theme.spacing(3, 0, 5)
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1)
	}
})

class StepperForm extends Component {
	state = {
		activeStep: 0
	}

	nextStep = () => {
		this.setState({ activeStep: this.state.activeStep + 1 })
	}

	previousStep = () => {
		this.setState({ activeStep: this.state.activeStep - 1 })
	}

	handleStep = step => {
		this.setState({ activeStep: step })
	}

	render() {
		const { onSubmit } = this.props
		const { activeStep } = this.state

		const steps = [
			"Purpose",
			"Communications",
			"Payments",
			"Contributions Made",
			"Contributions Received",
			"Review"
		]

		const { classes } = this.props

		return (
			<Fragment>
				<CssBaseline>
					<main className={classes.layout}>
						<Stepper
							alternativeLabel
							nonLinear
							activeStep={activeStep}
							className={classes.stepper}>
							{steps.map((label, index) => (
								<Step key={label}>
									<StepButton
										onClick={() => this.handleStep(index)}>
										{label}
									</StepButton>
								</Step>
							))}
						</Stepper>

						{activeStep === 0 && (
							<StepperFormFirstPage onSubmit={this.nextStep} />
						)}
						{activeStep === 1 && (
							<StepperFormSecondPage
								previousStep={this.previousStep}
								onSubmit={this.nextStep}
							/>
						)}
						{activeStep === 2 && (
							<StepperFormThirdPage
								previousStep={this.previousStep}
								onSubmit={this.nextStep}
							/>
						)}
						{activeStep === 3 && (
							<StepperFormFourthPage
								previousStep={this.previousStep}
								onSubmit={this.nextStep}
							/>
						)}
						{activeStep === 4 && (
							<StepperFormFifthPage
								previousStep={this.previousStep}
								onSubmit={this.nextStep}
							/>
						)}
						{activeStep === 5 && (
							<Review
								previousStep={this.previousStep}
								onSubmit={onSubmit}
								handleStep={this.handleStep}
							/>
						)}

						{/* <FormValues /> */}
					</main>
				</CssBaseline>
			</Fragment>
		)
	}
}

StepperForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(StepperForm)
