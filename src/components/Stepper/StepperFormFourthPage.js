import React from "react"
import { Field, FieldArray, reduxForm } from "redux-form"
import { renderTextField } from "../Form/Inputs/renderInputs"

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import AddIcon from "@material-ui/icons/Add"

import DeleteIcon from "@material-ui/icons/Delete"

import IconButton from "@material-ui/core/IconButton"

import Fab from "@material-ui/core/Fab"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import StepperNextButton from "./StepperNextButton"
import StepperBackButton from "./StepperBackButton"
import ContributionMadeBox from "../../assets/IE/contributions/ContributionMadeBox"

import FormControlLabel from "@material-ui/core/FormControlLabel"


import { makeStyles } from "@material-ui/core/styles"

import Radio from "@material-ui/core/Radio"
import FormControl from "@material-ui/core/FormControl"
import { renderRadioGroup } from "../Form/Inputs/renderInputs"


const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(1),
		overflowX: "auto"
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		marginLeft: theme.spacing(1)
	},
	paper: {
		padding: 10,
		marginBottom: theme.spacing(3)
	},
	grid: {
		marginBottom: theme.spacing(3)
	},
	expand: {
		display: "flex",
		justifyContent: "flex-end"
	},
	rightIcon: {
		marginLeft: theme.spacing(1)
	},
	header: {
		display: "flex",
		justifyContent: "center",
		marginBottom: theme.spacing(4)
	}
}))

//const renderPayments = ({ fields, meta: { touched, error, submitFailed } }) => {

const RenderContributions = ({
	fields,
	meta: { touched, error, submitFailed }
}) => {
	const classes = useStyles()
	return (
		<div>
			<div className={classes.buttons} style={{ marginRight: 10 }}>
				<Fab
					onClick={() => fields.push()}
					variant="extended"
					size="medium"
					color="secondary"
					className={classes.button}>
					<AddIcon className={classes.extendedIcon} />
					&nbsp;Add Contribution Made
				</Fab>

				{(touched || submitFailed) && error && <span>{error}</span>}
			</div>

			{fields.map((contribution, index) => (
				<Paper key={index} className={classes.paper}>
					<Grid container alignItems="center">
						<Grid item xs={12} sm={11}>
							<Typography variant="body1">
								<b>{`Contribution Made #${index + 1}`}</b>
							</Typography>
						</Grid>
						<Grid item xs={12} sm={1}>
							<IconButton
								onClick={() => fields.remove(index)}
								aria-label="delete">
								<DeleteIcon />
							</IconButton>
						</Grid>
					</Grid>

					<Grid container spacing={3} className={classes.grid}>
						<Grid item xs={12} sm={6}>
							<Field
								name={`${contribution}.candidateOrCommitteeName`}
								type="text"
								component={renderTextField}
								fullWidth
								label="Candidate or Committee Name"
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<Field
								name={`${contribution}.dateContributed`}
								type="text"
								component={renderTextField}
								fullWidth
								label="Date Contributed"
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<Field
								name={`${contribution}.amountContributed`}
								type="text"
								component={renderTextField}
								fullWidth
								label="Amount Contributed"
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3} className={classes.grid}>
						<Grid item xs={12} sm={12}>
							<Field
								name={`${contribution}.officeSought`}
								type="text"
								component={renderTextField}
								fullWidth
								label="For candidates, identify office sought (including district number)"
							/>
						</Grid>
					</Grid>
				</Paper>
			))}
		</div>
	)
}

const StepperFormFourthPage = props => {
	const { handleSubmit, previousStep } = props
	const classes = useStyles()
	return (
		<form onSubmit={handleSubmit}>
			<Typography variant="h6" gutterBottom className={classes.header}>
				Add Contribution(s) Made
			</Typography>
			<ContributionMadeBox />
			<Grid container spacing={3} style={{ marginTop: 10, marginLeft: 10 }}>
				<Grid item>
					<FormControl component="fieldset">
						<Field name="isContributionsMade" component={renderRadioGroup}>
							<FormControlLabel
								value="N"
								control={<Radio color="primary" />}
								label="I did not make any reportable contributions"
								labelPlacement="end"
							/>
							<FormControlLabel
								value="Y"
								control={<Radio color="primary" />}
								label="I made the following reportable contributions"
								labelPlacement="end"
							/>
						</Field>
					</FormControl>
				</Grid>
            </Grid>    


			<FieldArray
				name="contributionsMade"
				component={RenderContributions}
			/>

			<div className={classes.buttons}>
				<StepperBackButton previousStep={previousStep} />
				<StepperNextButton />
			</div>
		</form>
	)
}

export default reduxForm({
	form: "stepperForm", // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
	forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(StepperFormFourthPage)
