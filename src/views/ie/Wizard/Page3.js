import React, { Fragment } from "react";
import { Field, FieldArray, getIn } from "formik";
import { renderTextField, renderDatePicker } from "components/Form/Inputs/renderInputs";
import { useMutation } from "@apollo/react-hooks";

import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteIcon from "@material-ui/icons/Delete";

import IconButton from "@material-ui/core/IconButton";

import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import WizardNextButton from "components/Wizard/WizardNextButton";
import WizardBackButton from "components/Wizard/WizardBackButton";

import ContentBox from "components/UI/Content/ContentBox";

import { spendinginfo_box } from "views/ie/Wizard";

import { makeStyles } from "@material-ui/core/styles"
import * as pageValidations from "validation/ie/indexpSchema"
import OnChangeHandler from "components/UI/Utils/OnChangeHandler"
import { UPSERT_IND_EXP_PAYMENT, DELETE_IND_EXP_PAYMENT } from "graphql/ie/Mutations"
import useExpandClick from "components/UI/Paper/Hooks/useExpandClick"
import useUpsertPaymentData from "graphql/ie/hooks/useUpsertPaymentData"
import Collapse from "@material-ui/core/Collapse"
import { convertISODateToJsDate } from "utils/dateUtil"


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
		marginBottom: theme.spacing(2)
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
}));

const RenderVendors = arrayHelpers => {
	const classes = useStyles();

	const initValues = {
		vendorLastName: "",
		vendorFirstName: "",
		vendorAddressStreet: "",
		vendorAddressStreet2: "",
		vendorAddressCity: "",
		vendorAddressState: "",
		vendorAddressZip5: "",
		vendorAddressZip4: ""
	};
	const vendors = getIn(arrayHelpers.form.values, arrayHelpers.name);

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
					<Fragment key={index}>
						{index ? (
							<Grid item xs={12}>
								<hr />
							</Grid>
						) : null}

						<Grid item>
							<DeleteForeverIcon className={classes.cancel} onClick={() => arrayHelpers.remove(index)} />
						</Grid>
						<Grid item xs={11}>
							<Typography variant="body1" gutterBottom>
								Vendor #{index + 1}:
							</Typography>
						</Grid>
						<Grid item xs={6} sm={6}>
							<Field
								name={`${arrayHelpers.name}.${index}.vendorLastName`}
								component={renderTextField}
								type="text"
								label={`Last/Business Name`}
								fullWidth
							/>
						</Grid>
						<Grid item xs={6} sm={6}>
							<Field
								name={`${arrayHelpers.name}.${index}.vendorFirstName`}
								component={renderTextField}
								type="text"
								label={`First Name (if individual)`}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<Field
								name={`${arrayHelpers.name}.${index}.vendorAddressStreet`}
								component={renderTextField}
								type="text"
								label={`Street Address`}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<Field
								name={`${arrayHelpers.name}.${index}.vendorAddressStreet2`}
								component={renderTextField}
								type="text"
								label={`Street Address (Line 2)`}
								fullWidth
							/>
						</Grid>
						<Grid item xs={5} sm={5}>
							<Field name={`${arrayHelpers.name}.${index}.vendorAddressCity`} component={renderTextField} type="text" label={`City`} fullWidth />
						</Grid>
						<Grid item xs={2} sm={2}>
							<Field
								name={`${arrayHelpers.name}.${index}.vendorAddressState`}
								component={renderTextField}
								type="text"
								label={`State`}
								fullWidth
							/>
						</Grid>
						<Grid item xs={3} sm={3}>
							<Field
								name={`${arrayHelpers.name}.${index}.vendorAddressZip5`}
								component={renderTextField}
								type="text"
								label={`Zip Code`}
								fullWidth
							/>
						</Grid>
						<Grid item xs={2} sm={2}>
							<Field
								name={`${arrayHelpers.name}.${index}.vendorAddressZip4`}
								component={renderTextField}
								type="text"
								label={`4 Digit Ext.`}
								fullWidth
							/>
						</Grid>
					</Fragment>
				))}
			{/* {error && <li className="error">{error}</li>} */}
		</Grid>
	);
};

//const renderPayments = ({ fields, meta: { touched, error, submitFailed } }) => {

const initValues = {
	IE_PAYMENT_ID: "",
	IE_PAYEE: "",
	IE_PAYEE_LNAME: "",
	IE_PAYEE_FNAME: "",
	IE_PAYEE_ADDR_STR: "",
	IE_PAYEE_ADDR_STR2: "",
	IE_PAYEE_ADDR_CITY: "",
	IE_PAYEE_ADDR_ST: "",
	IE_PAYEE_ADDR_ZIP_5: "",
	IE_PAYEE_ADDR_ZIP_4: "",
	IE_PAYMENT_DESC: "",
	IE_PAYMENT_AMT: ""
};

const RenderPayments = props => {
	const { arrayHelpers, upsertPaymentData, deletePaymentData } = props;

	const classes = useStyles();

	const payments = getIn(arrayHelpers.form.values, arrayHelpers.name);
	const errors = getIn(arrayHelpers.form.errors, arrayHelpers.name);
	const touched = getIn(arrayHelpers.form.touched, arrayHelpers.name);

	const [expanded, ExpandButton, { handleExpandClick, addItem, deleteItem }] = useExpandClick(payments);

	return (
		<div>
			<div className={classes.buttons} style={{ marginRight: 10 }}>
				<Fab
					onClick={() => {
						arrayHelpers.unshift(initValues);
						addItem(payments);
					}}
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
				payments.map((payment, index) => {
					// const isError = Array.isArray(errors) && errors.length
					// const isTouched = Array.isArray(touched) && typeof touched[index] !== "undefined"

					return (
						<Paper key={index} className={classes.paper} onClick={() => handleExpandClick(index)}>
							<OnChangeHandler handleChange={() => upsertPaymentData(index, payment)}>
								<Grid container>
									{expanded[index] ? (
										<Grid item xs={12} sm={10}>
											<Typography variant="body1">
												<b>Enter Payment Information:</b>
											</Typography>
										</Grid>
									) : (
										<Fragment>
											<Grid item xs={12} sm={3}>
												<Typography variant="body1">
													<b>Date:&nbsp;</b>
													{payment.IE_PAYMENT_DATE ? convertISODateToJsDate(payment.IE_PAYMENT_DATE) : "N/A"}
												</Typography>
											</Grid>
											<Grid item xs={12} sm={3}>
												<Typography variant="body1">
													<b>Amount:&nbsp;</b>
													{payment.IE_PAYMENT_AMT}
												</Typography>
											</Grid>
											<Grid item xs={12} sm={4}>
												<Typography variant="body1">
													<b>Payee:&nbsp;</b>

													{payment.IE_PAYEE_FNAME ? payment.IE_PAYEE_FNAME + " " + payment.IE_PAYEE_LNAME : payment.IE_PAYEE_LNAME}
												</Typography>
											</Grid>
										</Fragment>
									)}
									<Grid item xs={12} sm={1}>
										<IconButton
											onClick={() => {
												payment.IE_PAYMENT_ID && deletePaymentData(payment);
												arrayHelpers.remove(index);
												deleteItem(payments);
											}}
											aria-label="delete">
											<DeleteIcon />
										</IconButton>
									</Grid>
									<Grid item xs={12} sm={1}>
										<ExpandButton index={index} />
									</Grid>
								</Grid>
								<Collapse in={expanded[index]} unmountOnExit>
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
										<Grid item xs={12} sm={4}>
											<Field
												name={`payments.${index}.IE_PAYMENT_DATE`}
												//helperText={isTouched && typeof touched[index].IE_PAYMENT_DATE !== "undefined" ? isError ? errors[index].IE_PAYMENT_DATE : null : null}
												//error={isTouched && typeof touched[index].IE_PAYMENT_DATE !== "undefined" ? isError ? Boolean(errors[index].IE_PAYMENT_DATE) : null : null}
												component={renderDatePicker}
												fullWidth
												label="Date"
											/>
										</Grid>

										<Grid item xs={12} sm={4}>
											<Field
												name={`payments.${index}.IE_PAYMENT_AMT`}
												type="number"
												//helperText={isTouched && typeof touched[index].IE_PAYMENT_AMT !== "undefined" ? isError ? errors[index].IE_PAYMENT_AMT : null : null}
												//error={isTouched && typeof touched[index].IE_PAYMENT_AMT !== "undefined" ? isError ? Boolean(errors[index].IE_PAYMENT_AMT) : null : null}
												component={renderTextField}
												fullWidth
												label="Amount"
											/>
										</Grid>

										<Grid item xs={12} sm={4}>
											&nbsp;
										</Grid>

										<Grid item xs={12} sm={6}>
											<Field
												name={`payments.${index}.IE_PAYEE_LNAME`}
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
												label="Payee Last/Business Name"
											/>
										</Grid>

										<Grid item xs={12} sm={6}>
											<Field
												name={`payments.${index}.IE_PAYEE_FNAME`}
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
												label="Payee First Name (if individual)"
											/>
										</Grid>
										<Grid item xs={12} sm={12}>
											<Field
												name={`payments.${index}.IE_PAYEE_ADDR_STR`}
												component={renderTextField}
												type="text"
												label={`Payee Street Address`}
												fullWidth
											/>
										</Grid>
										<Grid item xs={12} sm={12}>
											<Field
												name={`payments.${index}.IE_PAYEE_ADDR_STR2`}
												component={renderTextField}
												type="text"
												label={`Payee Street Address (Line 2)`}
												fullWidth
											/>
										</Grid>
										<Grid item xs={5} sm={5}>
											<Field
												name={`payments.${index}.IE_PAYEE_ADDR_CITY`}
												component={renderTextField}
												type="text"
												label={`City`}
												fullWidth
											/>
										</Grid>
										<Grid item xs={2} sm={2}>
											<Field
												name={`payments.${index}.IE_PAYEE_ADDR_ST`}
												component={renderTextField}
												type="text"
												label={`State`}
												fullWidth
											/>
										</Grid>
										<Grid item xs={3} sm={3}>
											<Field
												name={`payments.${index}.IE_PAYEE_ADDR_ZIP_5`}
												component={renderTextField}
												type="text"
												label={`Zip Code`}
												fullWidth
											/>
										</Grid>
										<Grid item xs={2} sm={2}>
											<Field
												name={`payments.${index}.IE_PAYEE_ADDR_ZIP_4`}
												component={renderTextField}
												type="text"
												label={`4 Digit Ext.`}
												fullWidth
											/>
										</Grid>
										<Grid item xs={12}>
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
												label="Payee Services: (All services provided by payee for reported amount)"
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
								</Collapse>
							</OnChangeHandler>
						</Paper>
					);
				})}
		</div>
	);
};

const Page3 = props => {
	const { values } = props
	const classes = useStyles()

    //const [upsertIndExpPayment] = useMutation(UPSERT_IND_EXP_PAYMENT)
    const [{upsertPayment}] = useUpsertPaymentData()

    const { IE_ID } = values


	const upsertPaymentData = async (index, payment) => {
		

		const paymentPayload = {
			...payment,
			IE_ID,
			IE_PAYEE_VENDORS: payment.IE_PAYEE_VENDORS ? [...payment.IE_PAYEE_VENDORS] : null
        }
        

        upsertPayment(index,paymentPayload)
    

		//if IE_PAYMENT_ID = "" (which is default), strip it out, so it isn't sent in graphql to server which will cause error
		// if (paymentPayload.IE_PAYMENT_ID === "") {
		// 	delete paymentPayload.IE_PAYMENT_ID
		// }

		// paymentPayload.__typename && delete paymentPayload.__typename

		// const { data } = await upsertIndExpPayment({ variables: { payment: paymentPayload } })
		// setFieldValue(`payments.${index}.IE_PAYMENT_ID`, data.upsertIndExpPayment.IE_PAYMENT_ID)
	}



	// const upsertPaymentData = async (index, payment) => {
		

	// 	const paymentPayload = {
	// 		...payment,
	// 		IE_ID,
	// 		IE_PAYEE_VENDORS: payment.IE_PAYEE_VENDORS ? [...payment.IE_PAYEE_VENDORS] : null
	// 	}

	// 	//if IE_PAYMENT_ID = "" (which is default), strip it out, so it isn't sent in graphql to server which will cause error
	// 	if (paymentPayload.IE_PAYMENT_ID === "") {
	// 		delete paymentPayload.IE_PAYMENT_ID
	// 	}

	// 	paymentPayload.__typename && delete paymentPayload.__typename

	// 	const { data } = await upsertIndExpPayment({ variables: { payment: paymentPayload } })
	// 	setFieldValue(`payments.${index}.IE_PAYMENT_ID`, data.upsertIndExpPayment.IE_PAYMENT_ID)
	// }

	//handle IE Payment deletes
	const [deleteIndExpPayment] = useMutation(DELETE_IND_EXP_PAYMENT);

	const deletePaymentData = payment => {
		deleteIndExpPayment({ variables: { IE_PAYMENT_ID: payment.IE_COMM_ID } });
	};

	return (
		<Fragment>
			<ContentBox>{spendinginfo_box}</ContentBox>

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
	);
};

export default Page3;
