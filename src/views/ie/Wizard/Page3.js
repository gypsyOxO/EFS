import React, { Fragment } from "react"
import { Field, FieldArray, getIn } from "formik"
import { renderTextField } from "components/Form/Inputs/renderInputs"

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
import WizardNextButton from "components/Wizard/WizardNextButton"
import WizardBackButton from "components/Wizard/WizardBackButton"

import ContentBox from "components/UI/Content/ContentBox"

import { payment_box } from "views/ie/Wizard"

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

const RenderVendors = arrayHelpers => {

    const classes = useStyles()
	const initValues = { payee_vendor: "" }
	const vendors = getIn(arrayHelpers.form.values, arrayHelpers.name)

	return (
		<Grid container spacing={3} className={classes.grid}>
			<Grid item xs={12}>
				<div className={classes.buttons}>
					<Fab
						onClick={() => arrayHelpers.push(initValues)}
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
			{vendors &&
				vendors.map((vendor, index) => (
					<Grid
						container
						spacing={1}
						key={index}
						alignItems="flex-end"
						className={classes.added}>
						<Grid item>
							<DeleteForeverIcon
								className={classes.cancel}
								onClick={() => arrayHelpers.remove(index)}
							/>
						</Grid>
						<Grid item xs={11}>
							<Field
								name={`${arrayHelpers.name}.${index}.IE_PAYMENT_VENDOR_LNAME`}
								component={renderTextField}
								type="text"
								label={`Payee Vendor #${index + 1}`}
								fullWidth
							/>
						</Grid>
					</Grid>
				))}
			{/* {error && <li className="error">{error}</li>} */}
		</Grid>
	)
}

//const renderPayments = ({ fields, meta: { touched, error, submitFailed } }) => {

const RenderPayments = arrayHelpers => {

	const classes = useStyles()
	const initValues = {
		payeeDate: "",
		payeeAmount: "",
		payeeInfo: "",
		payeeServices: ""
	}
	const payments = getIn(arrayHelpers.form.values, arrayHelpers.name)

	return (
		<div>
			<div className={classes.buttons} style={{ marginRight: 10 }}>
				<Fab
					onClick={() => arrayHelpers.push(initValues)}
					variant="extended"
					size="medium"
					color="secondary"
					className={classes.button}>
					<AddIcon className={classes.extendedIcon} />
					&nbsp;Add Payment
				</Fab>

				{/* {(touched || submitFailed) && error && <span>{error}</span>} */}
			</div>

			{payments &&
				payments.map((payment, index) => (
					<Paper key={index} className={classes.paper}>
						<Grid container>
							<Grid item xs={12} sm={11}>
								<Typography variant="h6" gutterBottom>
									{`Payee #${index + 1}`}
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
						<Typography variant="body2" gutterBottom>
							Payee Info:
						</Typography>
						<Grid container spacing={3} className={classes.grid}>
							<Grid item xs={12} sm={2}>
								<Field
									name={`payments.${index}.IE_PAYMENT_DATE`}
									type="text"
									component={renderTextField}
									fullWidth
									label="Enter Date"
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<Field
									name={`payments.${index}.IE_PAYMENT_AMT`}
									type="text"
									component={renderTextField}
									fullWidth
									label="Enter Amount"
								/>
							</Grid>

							<Grid item xs={12} sm={8}>
								<Field
									name={`payments.${index}.IE_PAYEE`}
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
									Payee Services: (All services provided by
									payee for reported amount)
								</Typography>
								<Field
									name={`payments.${index}.IE_PAYMENT_DESC`}
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
									Payee Vendors: (name and address of each
									vendor used by payee for reported amount)
								</Typography>
								<FieldArray
									name={`payments.${index}.vendors`}
									component={RenderVendors}
								/>
							</Grid>
						</Grid>
					</Paper>
				))}
		</div>
	)
}

const Page3 = props => {
	const { handleSubmit } = props
	const classes = useStyles()
	return (
		<Fragment>
			<Typography variant="h6" gutterBottom className={classes.header}>
				Add Payment(s)
			</Typography>
			<ContentBox>{payment_box}</ContentBox>

			<FieldArray name="payments" component={RenderPayments} />

			<div className={classes.buttons}>
				<WizardBackButton {...props} />
				<WizardNextButton {...props} />
			</div>
		</Fragment>
	)
}

export default Page3
