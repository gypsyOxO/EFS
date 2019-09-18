import React, { Fragment } from "react"
import { Field, FieldArray } from "formik"

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import AddIcon from "@material-ui/icons/Add"

import DeleteIcon from "@material-ui/icons/Delete"

import IconButton from "@material-ui/core/IconButton"

import Fab from "@material-ui/core/Fab"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import WizardNextButton from "components/Wizard/WizardNextButton"
import WizardBackButton from "components/Wizard/WizardBackButton"
import ContentBox from "components/UI/Content/ContentBox"

import { contributions_made_box } from "views/ie/Wizard"

import FormControlLabel from "@material-ui/core/FormControlLabel"

import { makeStyles } from "@material-ui/core/styles"

import Radio from "@material-ui/core/Radio"
import FormControl from "@material-ui/core/FormControl"
import {
	renderRadioGroup,
	renderTextField
} from "components/Form/Inputs/renderInputs"

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

const RenderContributions = arrayHelpers => {
	const classes = useStyles()
	const { madeContributions } = arrayHelpers.form.values
	return (
		<div>
			<div className={classes.buttons} style={{ marginRight: 10 }}>
				<Fab
					onClick={() => arrayHelpers.push()}
					variant="extended"
					size="medium"
					color="secondary"
					className={classes.button}>
					<AddIcon className={classes.extendedIcon} />
					&nbsp;Add Contribution Made
				</Fab>

				{/* {(touched || submitFailed) && error && <span>{error}</span>} */}
			</div>

			{madeContributions &&
				madeContributions.map((contribution, index) => (
					<Paper key={index} className={classes.paper}>
						<Grid container alignItems="center">
							<Grid item xs={12} sm={11}>
								<Typography variant="body1">
									<b>{`Contribution Made #${index + 1}`}</b>
								</Typography>
							</Grid>
							<Grid item xs={12} sm={1}>
								<IconButton
									onClick={() => arrayHelpers.remove(index)}
									aria-label="delete">
									<DeleteIcon />
								</IconButton>
							</Grid>
						</Grid>

						<Grid container spacing={3} className={classes.grid}>
							<Grid item xs={12} sm={6}>
								<Field
									name={`madeContributions.${index}.candidateOrCommitteeName`}
									type="text"
									component={renderTextField}
									fullWidth
									label="Candidate or Committee Name"
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Field
									name={`madeContributions.${index}.dateContributed`}
									type="text"
									component={renderTextField}
									fullWidth
									label="Date Contributed"
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Field
									name={`madeContributions.${index}.amountContributed`}
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
									name={`madeContributions.${index}.officeSought`}
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

const Page4 = props => {
	const { handleSubmit } = props
	const classes = useStyles()
	return (
		<Fragment>
			<Typography variant="h6" gutterBottom className={classes.header}>
				Add Contribution(s) Made
			</Typography>
			<ContentBox>{contributions_made_box}</ContentBox>
			<Grid
				container
				spacing={3}
				style={{ marginTop: 10, marginLeft: 10 }}>
				<Grid item>
					<FormControl component="fieldset">
						<Field
							name="isContributionsMade"
							component={renderRadioGroup}>
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
				name="madeContributions"
				component={RenderContributions}
			/>

			<div className={classes.buttons}>
				<WizardBackButton {...props} />
				<WizardNextButton {...props} />
			</div>
		</Fragment>
	)
}

export default Page4
