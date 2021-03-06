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

import { contributions_made_box } from "views/ie/Wizard"

import { makeStyles } from "@material-ui/core/styles"

import FormControl from "@material-ui/core/FormControl"
import renderAutoComplete, { renderRadioGroup, renderTextField, renderDatePicker } from "components/Form/Inputs/renderInputs"
import useExpandClick from "components/UI/Paper/hooks/useExpandClick"
import Collapse from "@material-ui/core/Collapse"
import { convertISODateToJsDate } from "utils/dateUtil"

import * as pageValidations from "validation/ie/indexpSchema"

import OnChangeHandler from "components/UI/Utils/OnChangeHandler"
import { graphqlFilter } from "utils/graphqlUtil"
import { filteredIEUpsert } from "graphql/ie/FilterQueries"
import { UPSERT_IND_EXP } from "graphql/ie/Mutations"
import { useMutation } from "@apollo/react-hooks"

import { disclaimer_cont_made } from "views/ie/Wizard"
import Checkbox from "components/Form/Inputs/Checkbox"
import useAddDeleteCard from "./hooks/useAddDeleteCard"
import useCleanErrorsOnUnmount from './hooks/useCleanErrosOnUnmount';

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
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(3)
	},
	paper: {
		padding: 10,
		marginBottom: theme.spacing(2)
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

const initValues = { CMT_PER_ID: "", dateContributed: "", amountContributed: "", officeSought: "", candidateOrCommitteeName: "" }

const RenderContributions = props => {
	const classes = useStyles()
	const {
		arrayHelpers,
        arrayHelpers: { push, remove },
        arrayHelpers: {form: {isValid}}
	} = props
	const { CONTRIBUTIONS_MADE } = arrayHelpers.form.values

	const {expanded, ExpandButton,  handleExpandClick, addItem, deleteItem } = useExpandClick(CONTRIBUTIONS_MADE)
	const [{ addCard, deleteCard }] = useAddDeleteCard()

	return (
		<div>
			{CONTRIBUTIONS_MADE &&
				CONTRIBUTIONS_MADE.map((contribution, index) => {
					const autocompleteDependentFields = [
						{ name: `CONTRIBUTIONS_MADE.${index}.officeSought`, key: "officeSought" },
						{ name: `CONTRIBUTIONS_MADE.${index}.candidateOrCommitteeName`, key: "candidateOrCommitteeName" }
					]

					return (
						<Paper key={index} className={classes.paper} onClick={() => handleExpandClick(index)}>
							<Grid container alignItems="center" className={classes.grid}>
								{expanded[index] ? (
									<Grid item xs={12} sm={10}>
										<Typography variant="body1" gutterBottom>
											<b>Enter Contributions Made:</b>
										</Typography>
									</Grid>
								) : (
									<Fragment>
										<Grid item xs={12} sm={5}>
											<Typography variant="body1" gutterBottom>
												<b>Name:&nbsp;</b>

												{contribution.candidateOrCommitteeName}
											</Typography>
										</Grid>
										<Grid item xs={12} sm={3}>
											<Typography variant="body1" gutterBottom>
												<b>Date:&nbsp;</b>
												{contribution.dateContributed ? convertISODateToJsDate(contribution.dateContributed) : "N/A"}
											</Typography>
										</Grid>
										<Grid item xs={12} sm={2}>
											<Typography variant="body1" gutterBottom>
												<b>Amount:&nbsp;</b>
												{contribution.amountContributed}
											</Typography>
										</Grid>
									</Fragment>
								)}
								<Grid item xs={12} sm={1}>
									<IconButton
										onClick={() => {
											deleteCard(index, remove, deleteItem)
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
									<Grid item xs={12} sm={6}>
										<Field
											name={`CONTRIBUTIONS_MADE.${index}.CMT_PER_ID`}
											type="text"
											component={renderAutoComplete}
											fullWidth
											width="380"
											option_key="CMT_PER_ID"
											dependent_fields={autocompleteDependentFields}
											option_label="candidateOrCommitteeName"
											label="Select Committee"
										/>
									</Grid>
									<Grid item xs={12} sm={3}>
										<Field
											name={`CONTRIBUTIONS_MADE.${index}.dateContributed`}
											type="text"
											component={renderDatePicker}
											fullWidth
											label="Date"
										/>
									</Grid>
									<Grid item xs={12} sm={3}>
										<Field
											name={`CONTRIBUTIONS_MADE.${index}.amountContributed`}
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
											name={`CONTRIBUTIONS_MADE.${index}.officeSought`}
											type="text"
											readOnly="true"
											component={renderTextField}
											fullWidth
											label="For candidates, identify office sought (including district number)"
										/>
									</Grid>
								</Grid>
							</Collapse>
						</Paper>
					)
				})}
			<div className={classes.buttons} style={{ marginRight: 10 }}>
				<Fab
					onClick={() => addCard(initValues, CONTRIBUTIONS_MADE, push, addItem)}
					variant="extended"
					size="medium"
					color={isValid ? "secondary" : "default"}
					className={classes.button}>
					<AddIcon className={classes.extendedIcon} />
					&nbsp;Add Contribution Made
				</Fab>

				{/* {(touched || submitFailed) && error && <span>{error}</span>} */}
			</div>
		</div>
	)
}

const Page4 = props => {
	const {
		values,
		values: { CONTRIBUTIONS_MADE = [] }
    } = props    
	const classes = useStyles()

    useCleanErrorsOnUnmount()

	const [upsertIndExp] = useMutation(UPSERT_IND_EXP)

	const upsertIEData = () => {
		const filteredResult = graphqlFilter(filteredIEUpsert, values)
		upsertIndExp({ variables: { ie: filteredResult } })
	}

	return (
		<Fragment>
			<ContentBox>{contributions_made_box}</ContentBox>
			<OnChangeHandler handleChange={() => upsertIEData()}>
				{!CONTRIBUTIONS_MADE.length && (
					<Grid container spacing={3} style={{ marginTop: 10, marginLeft: 10 }}>
						<Grid item>
							<FormControl component="fieldset">
								<Checkbox name="REP_CONT_MADE" label={disclaimer_cont_made} />
							</FormControl>
						</Grid>
					</Grid>
				)}
				<FieldArray name="CONTRIBUTIONS_MADE" render={arrayHelpers => <RenderContributions arrayHelpers={arrayHelpers} />} />
			</OnChangeHandler>

			<div className={classes.buttons}>
				<WizardBackButton {...props} />
				<WizardNextButton {...props} validationGroup={pageValidations.Page4} />
			</div>
		</Fragment>
	)
}

export default Page4
