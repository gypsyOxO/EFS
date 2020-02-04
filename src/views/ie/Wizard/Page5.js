import React, { Fragment } from "react"
import { Field, FieldArray } from "formik"

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

import { contributions_received_box } from "views/ie/Wizard"



import { makeStyles } from "@material-ui/core/styles"


import FormControl from "@material-ui/core/FormControl"
import { renderRadioGroup, renderTextField, renderDatePicker } from "components/Form/Inputs/renderInputs"
import useExpandClick from "components/UI/Paper/Hooks/useExpandClick"
import Collapse from "@material-ui/core/Collapse"
import { convertISODateToJsDate } from "utils/dateUtil"
import * as pageValidations from "validation/ie/indexpSchema"

import OnChangeHandler from "components/UI/Utils/OnChangeHandler"
import { graphqlFilter } from "utils/graphqlUtil"
import { filteredIEUpsert } from "graphql/ie/FilterQueries"
import { UPSERT_IND_EXP } from "graphql/ie/Mutations"
import { useMutation } from "@apollo/react-hooks"
import { disclaimer_cont_rec} from "views/ie/Wizard"
import Checkbox from "components/Form/Inputs/Checkbox"


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
		marginBottom: theme.spacing(1)
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



const initValues = {
	contributorFirstName: "",
	contributorLastName: "",
	contributorEmployer: "",
	contributorOccupation: "",
	contributorAddressStreet: "",
	contributorAddressStreet2: "",
	contributorAddressCity: "",
    contributorAddressState: "",
    contributorAddressZip4: "",
	contributorAddressZip5: "",	
	dateReceived: "",
	amountReceived: "",
}

const RenderContributions = props => {
	const classes = useStyles()
	const { arrayHelpers } = props
	const { CONTRIBUTIONS_RECEIVED } = arrayHelpers.form.values

	const [expanded, ExpandButton, { handleExpandClick, addItem, deleteItem }] = useExpandClick(CONTRIBUTIONS_RECEIVED)

	return (
		<div>
			<div className={classes.buttons} style={{ marginRight: 10 }}>
				<Fab
					onClick={() => {
						arrayHelpers.unshift(initValues)
						addItem(CONTRIBUTIONS_RECEIVED)
					}}
					variant="extended"
					size="medium"
					color="secondary"
					className={classes.button}>
					<AddIcon className={classes.extendedIcon} />
					&nbsp;Add Contribution Received
				</Fab>

				{/* {(touched || submitFailed) && error && <span>{error}</span>} */}
			</div>

			{CONTRIBUTIONS_RECEIVED &&
				CONTRIBUTIONS_RECEIVED.map((contribution, index) => (
					<Paper key={index} className={classes.paper} onClick={() => handleExpandClick(index)}>
						<Grid container alignItems="center">
							{expanded[index] ? (
								<Grid item xs={12} sm={10}>
									<Typography variant="body1" gutterBottom>
										<b>Enter Contributions Received:</b>
									</Typography>
								</Grid>
							) : (
								<Fragment>
									<Grid item xs={12} sm={5}>
										<Typography variant="body1" gutterBottom>
											<b>Name:&nbsp;</b>

											{contribution.contributorFirstName}&nbsp;{contribution.contributorLastName}
										</Typography>
									</Grid>
									<Grid item xs={12} sm={3}>
										<Typography variant="body1" gutterBottom>
											<b>Date:&nbsp;</b>
											{contribution.dateReceived ? convertISODateToJsDate(contribution.dateReceived) : "N/A"}
										</Typography>
									</Grid>
									<Grid item xs={12} sm={2}>
										<Typography variant="body1" gutterBottom>
											<b>Amount:&nbsp;</b>
											{contribution.amountReceived}
										</Typography>
									</Grid>
								</Fragment>
							)}
							<Grid item xs={12} sm={1}>
								<IconButton
									onClick={() => {
										arrayHelpers.remove(index)
										deleteItem(CONTRIBUTIONS_RECEIVED)
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
								<Grid item xs={12} sm={3}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.contributorFirstName`}
										type="text"
										component={renderTextField}
										fullWidth
										label="First Name"
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.contributorLastName`}
										type="text"
										component={renderTextField}
										fullWidth
										label="Last Name"
									/>
								</Grid>                                
								<Grid item xs={12} sm={3}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.dateReceived`}
										type="text"
										component={renderDatePicker}
										fullWidth
										label="Date"
									/>
								</Grid>
								<Grid item xs={12} sm={2}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.amountReceived`}
										type="number"
										component={renderTextField}
										fullWidth
										label="Amount"
									/>
								</Grid>
							</Grid>
							<Grid container spacing={3} className={classes.grid}>
								<Grid item xs={12} sm={12}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.contributorAddressStreet`}
										type="text"
										component={renderTextField}
										fullWidth
										label="Street Address"
									/>
								</Grid>  
								<Grid item xs={12} sm={12}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.contributorAddressStreet2`}
										type="text"
										component={renderTextField}
										fullWidth
										label="Street Address, Line 2"
										
									/>
								</Grid>                                                              
							</Grid>
                            <Grid container spacing={3} className={classes.grid}>
								<Grid item xs={12} sm={6}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.contributorAddressCity`}
										type="text"
										component={renderTextField}
										fullWidth
										label="City"
									/>
								</Grid>                                
								<Grid item xs={12} sm={2}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.contributorAddressState`}
										type="text"
										component={renderTextField}
										fullWidth
										label="State"
									/>
								</Grid>                                
								<Grid item xs={12} sm={2}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.contributorAddressZip5`}
										type="text"
										component={renderTextField}
										fullWidth
										label="Zip"
									/>
								</Grid> 
                                               
								<Grid item xs={12} sm={2}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.contributorAddressZip4`}
										type="text"
										component={renderTextField}
										fullWidth
										label="Ext"
									/>
								</Grid>   
							</Grid>

							<Grid container spacing={3} className={classes.grid}>
                            <Grid item xs={12} sm={6}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.contributorEmployer`}
										type="text"
										component={renderTextField}
										fullWidth
										label="Employer"
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<Field
										name={`CONTRIBUTIONS_RECEIVED.${index}.contributorOccupation`}
										type="text"
										component={renderTextField}
										fullWidth
										label="Occupation"
									/>
								</Grid>
							</Grid>
						</Collapse>
					</Paper>
				))}
		</div>
	)
}

const Page5 = props => {
	const { values } = props
	const classes = useStyles()

	const [upsertIndExp] = useMutation(UPSERT_IND_EXP)

	const upsertIEData = () => {
		const filteredResult = graphqlFilter(filteredIEUpsert, values)
		upsertIndExp({ variables: { ie: filteredResult } })
	}

	return (
		<Fragment>
			<ContentBox>{contributions_received_box}</ContentBox>
			<OnChangeHandler handleChange={() => upsertIEData()}>
				<Grid container spacing={3} style={{ marginTop: 10, marginLeft: 10 }}>
					<Grid item>						
						<FormControl component="fieldset">
							<Checkbox name="REP_CONT_RECEIVED" label={disclaimer_cont_rec} />
						</FormControl>						
					</Grid>
				</Grid>

				<FieldArray name="CONTRIBUTIONS_RECEIVED" render={arrayHelpers => <RenderContributions arrayHelpers={arrayHelpers} />} />
			</OnChangeHandler>
			<div className={classes.buttons}>
				<WizardBackButton {...props} />
				<WizardNextButton {...props} validationGroup={pageValidations.Page5} />
			</div>
		</Fragment>
	)
}

export default Page5
