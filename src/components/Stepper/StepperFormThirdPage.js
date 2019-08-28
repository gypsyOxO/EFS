import React from "react"
import { Field, FieldArray, reduxForm } from "redux-form"
import { renderTextField } from "../Form/Inputs/renderInputs"

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import AddIcon from "@material-ui/icons/Add"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import DeleteIcon from "@material-ui/icons/Delete"

import IconButton from "@material-ui/core/IconButton"

import Fab from "@material-ui/core/Fab"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import StepperNextButton from "./StepperNextButton"
import StepperBackButton from "./StepperBackButton"

import PaymentBox from "../../assets/IE/payments/PaymentBox"

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
	added: {
		marginLeft: theme.spacing(2)
	},
	cancel: {
		color: "red"
	},
	icon: {
		margin: theme.spacing(2),
		color: "red"
    },
    header: {
		display: "flex",
		justifyContent: "center",
		marginBottom: theme.spacing(4)
	}
}))

const RenderVendors = ({ fields, meta: { error } }) => {
	const classes = useStyles()
	return (
		<Grid container spacing={3} className={classes.grid}>        
			<Grid item xs={12}>
				<div className={classes.buttons}>
					<Fab
						onClick={() => fields.push()}
						display="flex"
						variant="extended"
						size="medium"
						color="secondary"
						className={classes.button}>
						<AddIcon />
						&nbsp;Add Payee Vendor
					</Fab>
				</div>
			</Grid>
			{fields.map((hobby, index) => (
				<Grid
					container
					spacing={1}
					key={index}
					alignItems="flex-end"
					className={classes.added}>
					<Grid item>
						<DeleteForeverIcon
							className={classes.cancel}
							onClick={() => fields.remove(index)}
						/>
					</Grid>
					<Grid item xs={11}>
						<Field
							name={hobby}
							type="text"
							component={renderTextField}
							label={`Payee Vendor #${index + 1}`}
							fullWidth
						/>
					</Grid>
				</Grid>
			))}
			{error && <li className="error">{error}</li>}
		</Grid>
	)
}

//const renderPayments = ({ fields, meta: { touched, error, submitFailed } }) => {

const RenderPayments = ({ fields, meta: { touched, error, submitFailed } }) => {
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
					&nbsp;Add Payment
				</Fab>

				{(touched || submitFailed) && error && <span>{error}</span>}
			</div>

			{fields.map((payment, index) => (
				<Paper key={index} className={classes.paper}>
					<Grid container>
						<Grid item xs={12} sm={11}>
							<Typography variant="h6" gutterBottom>
								{`Payee #${index + 1}`}
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
                    <Typography variant="body2" gutterBottom>
								Payee Info: 
							</Typography>
					<Grid container spacing={3} className={classes.grid}>
						<Grid item xs={12} sm={2}>
							<Field
								name={`${payment}.payeeDate`}
								type="text"
								component={renderTextField}
								fullWidth
								label="Enter Date"
							/>
						</Grid>
						<Grid item xs={12} sm={2}>
							<Field
								name={`${payment}.payeeAmount`}
								type="text"
								component={renderTextField}
								fullWidth
								label="Enter Amount"
							/>
						</Grid>

						<Grid item xs={12} sm={8}>
							<Field
								name={`${payment}.payeeInfo`}
								type="text"
								component={renderTextField}
								fullWidth
								label="Enter Payee"
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3} className={classes.grid}>
						<Grid item xs={12}>
							<Typography variant="body2">
								Payee Services: (All services provided by payee
								for reported amount)
							</Typography>
							<Field
								name={`${payment}.payeeServices`}
								type="text"
								component={renderTextField}
								fullWidth
								label="Enter Payee Services"
							/>
						</Grid>
					</Grid>

					<Grid container spacing={3} className={classes.grid}>
						<Grid item xs={12}>
							<Typography variant="body2">
								Payee Vendors: (name and address of each vendor
								used by payee for reported amount)
							</Typography>
							<FieldArray
								name={`${payment}.vendors`}
								component={RenderVendors}
							/>
						</Grid>
					</Grid>
				</Paper>
			))}
		</div>
	)
}

const StepperFormThirdPage = props => {
	const { handleSubmit, previousStep } = props
	const classes = useStyles()
	return (
		<form onSubmit={handleSubmit}>   
			<Typography variant="h6" gutterBottom className={classes.header}>
				Add Payment(s)
			</Typography>   
            <PaymentBox />            
			<FieldArray name="payments" component={RenderPayments} />

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
})(StepperFormThirdPage)


