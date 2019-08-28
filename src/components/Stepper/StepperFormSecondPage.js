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

import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"

import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Input from "@material-ui/core/Input"

import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import CommunicationBox from "../../assets/IE/communcations/CommunicationBox"

import { makeStyles } from "@material-ui/core/styles"

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
	script: {
		marginLeft: theme.spacing(4),
		marginTop: theme.spacing(1)
	},
	upload: {
		marginRight: theme.spacing(1)
	},
	icon: {
		margin: theme.spacing(2),
		color: "red"
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

const RenderCommunications = ({
	fields,
	meta: { touched, error, submitFailed }
}) => {
	const classes = useStyles()
	return (
		<div>
			<Typography variant="h6" gutterBottom className={classes.header}>
				Add Communication(s)
			</Typography>
			<CommunicationBox />

			<Grid container spacing={3} className={classes.grid}>
				<Grid item xs={12} style={{ marginTop: 20 }}>
					<Typography variant="body2">Distribution:</Typography>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Field
						name="DatefirstDistributed"
						type="text"
						component={renderTextField}
						fullWidth
						label="Date First Distributed"
					/>
				</Grid>
				<Grid item xs={12} sm={9}>
					<Field
						name="numberOfPieces"
						type="text"
						component={renderTextField}
						fullWidth
						label="Number of Pieces"
					/>
				</Grid>
			</Grid>

			<div className={classes.buttons} style={{ marginRight: 10 }}>
				<Fab
					onClick={() => fields.push()}
					variant="extended"
					size="medium"
					color="secondary"
					className={classes.button}>
					<AddIcon className={classes.extendedIcon} />
					&nbsp;Add Communication
				</Fab>

				{(touched || submitFailed) && error && <span>{error}</span>}
			</div>

			{fields.map((communication, index) => (
				<Paper key={index} className={classes.paper}>
					<Grid container>
						<Grid item xs={12} sm={11}>
							<Typography variant="body1" gutterBottom>
								<b>{`Communication #${index + 1}`}</b>
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
							<FormControl
								className={classes.formControl}
								fullWidth>
								<InputLabel htmlFor="age-simple">
									Enter Communication Format
								</InputLabel>
								<Select
									input={
										<Input
											name="format"
											value="Television"
										/>
									}>
									<MenuItem value="Television">
										Television
									</MenuItem>
									<MenuItem value="Web Video">
										Web Video
									</MenuItem>
									<MenuItem value="Radio">Radio</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid
							container
							alignItems="center"
							className={classes.script}
							gutterTop>
							<Grid item sm={4} className={classes.upload}>
								<input
									accept="image/*"
									className={classes.input}
									style={{ display: "none" }}
									id="raised-button-file"
									multiple
									type="file"
								/>
								<label htmlFor="raised-button-file">
									<Button
										variant="contained"
										className={classes.upload}
										component="span"
										color="primary"
										fullWidth>
										Upload Script (<b>PDF</b>)
										<CloudUploadIcon
											className={classes.rightIcon}
										/>
									</Button>
								</label>
							</Grid>

							<Grid item>
								<Typography variant="body1">
									No File Chosen
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							alignItems="center"
							className={classes.script}
							gutterTop>
							<Grid item className={classes.upload} sm={4}>
								<input
									accept="image/*"
									className={classes.input}
									style={{ display: "none" }}
									id="raised-button-file"
									multiple
									type="file"
								/>
								<label htmlFor="raised-button-file">
									<Button
										color="primary"
										variant="contained"
										component="span"
										fullWidth>
										Upload Video (<b>MP4</b>)
										<CloudUploadIcon
											className={classes.rightIcon}
										/>
									</Button>
								</label>
							</Grid>

							<Grid item>
								<Typography variant="body1">
									No File Chosen
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			))}
		</div>
	)
}

const StepperFormSecondPage = props => {
	const { handleSubmit, previousStep } = props
	const classes = useStyles()
	return (
		<form onSubmit={handleSubmit}>
			<FieldArray
				name="communications"
				component={RenderCommunications}
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
})(StepperFormSecondPage)
