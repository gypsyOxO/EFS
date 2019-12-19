import React, { Fragment } from "react"
import { Field, FieldArray, getIn } from "formik"
import { renderTextField, renderDatePicker } from "components/Form/Inputs/renderInputs"
import { useMutation } from "@apollo/react-hooks"

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
import * as pageValidations from "validation/ie/indexpSchema"
import OnChangeHandler from "components/UI/Utils/OnChangeHandler"
import { UPSERT_IND_EXP_PAYMENT, DELETE_IND_EXP_PAYMENT } from "graphql/ie/Mutations"


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

	const initValues = { payee_vendor: "", IE_PAYMENT_VENDOR_LNAME: "" }
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
					<Grid container spacing={1} key={index} alignItems="flex-end" className={classes.added}>
						<Grid item>
							<DeleteForeverIcon className={classes.cancel} onClick={() => arrayHelpers.remove(index)} />
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

const RenderPayments = props => {
	const { arrayHelpers, upsertPaymentData, deletePaymentData } = props

	const classes = useStyles()
	const initValues = {
		IE_PAYEE: "",
		IE_PAYMENT_ID: "",
		IE_PAYMENT_DESC: ""
	}
	const payments = getIn(arrayHelpers.form.values, arrayHelpers.name)
	const errors = getIn(arrayHelpers.form.errors, arrayHelpers.name)
	const touched = getIn(arrayHelpers.form.touched, arrayHelpers.name)

	return (
		<div>
			<div className={classes.buttons} style={{ marginRight: 10 }}>
				<Fab onClick={() => arrayHelpers.push(initValues)} variant="extended" size="medium" color="secondary" className={classes.button}>
					<AddIcon className={classes.extendedIcon} />
					&nbsp;Add Payment
				</Fab>

				{/* {(touched || submitFailed) && error && <span>{error}</span>} */}
			</div>

			{payments &&
				payments.map((payment, index) => {
					const isError = Array.isArray(errors) && errors.length 
					const isTouched = Array.isArray(touched) && typeof touched[index] !== "undefined"

					return (
						<OnChangeHandler key={index} handleChange={() => upsertPaymentData(index, payment)}>
							<Paper key={index} className={classes.paper}>
								<Grid container>
									<Grid item xs={12} sm={11}>
										<Typography variant="h6" gutterBottom>
											{`Payee #${index + 1}`}
										</Typography>
									</Grid>
									<Grid item xs={12} sm={1}>
										<IconButton
											onClick={() => {
                                                payment.IE_PAYMENT_ID && deletePaymentData(payment)
												arrayHelpers.remove(index)												
											}}
											aria-label="delete">
											<DeleteIcon />
										</IconButton>
									</Grid>
								</Grid>
								<Typography variant="body2" gutterBottom>
									Payee Info:
								</Typography>
								<Grid container spacing={3} className={classes.grid}>
									{/* <Grid item xs={12}>                   
                            index: {index}             
								{isError
									? JSON.stringify(errors)
									: null}
								<br />
								{isTouched > 0
									? JSON.stringify(touched[index])
									: null}
							</Grid> */}
									<Grid item xs={12} sm={3}>
										<Field
											name={`payments.${index}.IE_PAYMENT_DATE`}
											//helperText={isTouched && typeof touched[index].IE_PAYMENT_DATE !== "undefined" ? isError ? errors[index].IE_PAYMENT_DATE : null : null}
											//error={isTouched && typeof touched[index].IE_PAYMENT_DATE !== "undefined" ? isError ? Boolean(errors[index].IE_PAYMENT_DATE) : null : null}
											component={renderDatePicker}
											fullWidth
											label="Enter Date"
										/>
									</Grid>

									<Grid item xs={12} sm={3}>
										<Field
											name={`payments.${index}.IE_PAYMENT_AMT`}
											type="text"
											//helperText={isTouched && typeof touched[index].IE_PAYMENT_AMT !== "undefined" ? isError ? errors[index].IE_PAYMENT_AMT : null : null}
											//error={isTouched && typeof touched[index].IE_PAYMENT_AMT !== "undefined" ? isError ? Boolean(errors[index].IE_PAYMENT_AMT) : null : null}
											component={renderTextField}
											fullWidth
											label="Enter Amount"
										/>
									</Grid>

									<Grid item xs={12} sm={6}>
										<Field
											name={`payments.${index}.IE_PAYEE`}
											type="text"
											// helperText={
											// 	isTouched && typeof touched[index].IE_PAYEE !== "undefined"
											// 		? isError
											// 			? errors[index].IE_PAYEE
											// 			: null
											// 		: null
											// }
											// error={
											// 	isTouched && typeof touched[index].IE_PAYEE !== "undefined"
											// 		? isError
											// 			? Boolean(errors[index].IE_PAYEE)
											// 			: null
											// 		: null
											// }
											component={renderTextField}
											fullWidth
											label="Enter Payee"
										/>
									</Grid>
								</Grid>
								<Grid container spacing={3} className={classes.grid}>
									<Grid item xs={12}>
										<Typography variant="body2">Payee Services: (All services provided by payee for reported amount)</Typography>
										<Field
											name={`payments.${index}.IE_PAYMENT_DESC`}
											type="text"
											// helperText={
											// 	isTouched && typeof touched[index].IE_PAYMENT_DESC !== "undefined"
											// 		? isError
											// 			? errors[index].IE_PAYMENT_DESC
											// 			: null
											// 		: null
											// }
											// error={
											// 	isTouched && typeof touched[index].IE_PAYMENT_DESC !== "undefined"
											// 		? isError
											// 			? Boolean(errors[index].IE_PAYMENT_DESC)
											// 			: null
											// 		: null
											// }
											component={renderTextField}
											fullWidth
											label="Enter Payee Services"
										/>
									</Grid>
								</Grid>

								<Grid container spacing={3} className={classes.grid}>
									<Grid item xs={12}>
										<Typography variant="body2">
											Payee Vendors: (name and address of each vendor used by payee for reported amount)
										</Typography>
										<FieldArray name={`payments.${index}.IE_PAYEE_VENDORS`} component={RenderVendors} />
									</Grid>
								</Grid>
							</Paper>
						</OnChangeHandler>
					)
				})}
		</div>
	)
}

const Page3 = props => {
	const { values, setFieldValue } = props
	const classes = useStyles()

	const [upsertIndExpPayment] = useMutation(UPSERT_IND_EXP_PAYMENT)

	const upsertPaymentData = async (index, payment) => {
		const { IE_ID } = values

		const paymentPayload = {
			...payment,
			IE_ID,
			IE_PAYEE_VENDORS: payment.IE_PAYEE_VENDORS ? [...payment.IE_PAYEE_VENDORS] : null
		}

		//if IE_PAYMENT_ID = "" (which is default), strip it out, so it isn't sent in graphql to server which will cause error
		if (paymentPayload.IE_PAYMENT_ID === "") {
			delete paymentPayload.IE_PAYMENT_ID
		}

		paymentPayload.__typename && delete paymentPayload.__typename

		const { data } = await upsertIndExpPayment({ variables: { payment: paymentPayload } })
		setFieldValue(`payments.${index}.IE_PAYMENT_ID`, data.upsertIndExpPayment.IE_PAYMENT_ID)
	}

	//handle IE Payment deletes
	const [deleteIndExpPayment] = useMutation(DELETE_IND_EXP_PAYMENT)

	const deletePaymentData = payment => {
		deleteIndExpPayment({ variables: { IE_PAYMENT_ID: payment.IE_COMM_ID } })
	}

	return (
		<Fragment>
			<Typography variant="h6" gutterBottom className={classes.header}>
				Add Payment(s)
			</Typography>
			<ContentBox>{payment_box}</ContentBox>

			<FieldArray
				name="payments"
				render={arrayHelpers => (
					<RenderPayments
						arrayHelpers={arrayHelpers}
						upsertPaymentData={(index, payment) => upsertPaymentData(index, payment)}
						deletePaymentData={comm => deletePaymentData(comm)}
					/>
				)}
			/>

			<div className={classes.buttons}>
				<WizardBackButton {...props} />
				<WizardNextButton {...props} validationGroup={pageValidations.Page3} />
			</div>
		</Fragment>
	)
}

export default Page3
