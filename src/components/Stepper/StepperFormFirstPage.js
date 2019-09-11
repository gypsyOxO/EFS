import React, { useState } from "react"
import { Field, reduxForm } from "redux-form"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import FormControl from "@material-ui/core/FormControl"
import { renderTextField, renderRadioGroup } from "../Form/Inputs/renderInputs"
import StepperNextButton from "./StepperNextButton"
import ReactSelectMaterialUi from "react-select-material-ui"

import CandidateOrBallotMeasure from "../Form/Panels/CandidateOrBallotMeasure/CandidateOrBallotMeasure"
//import GetCandidates from '../Form/Panels/GetCandidates';

const useStyles = makeStyles(theme => ({
	root: {
		width: "10%",
		marginTop: theme.spacing(3),
		overflowX: "auto"
	},
	header: {
		display: "flex",
		justifyContent: "center",
		marginBottom: theme.spacing(4)
	}
}))

const initialValues = {
	subject: "C",
	position: "S",
	type: "IE"
}

const StepperFormFirstPage = props => {
	const classes = useStyles()
	const { handleSubmit } = props
	const [isCandidate, setIsCandidate] = useState(true)

	/*const options: string[] = [
		"2019 LAUSD Ballot Measure",
		"2018 City Ballot Measures",
        "2017 City and LAUSD Ballot Measures",
        "2016 City Ballot Measures"
	]

	const options2: string[] = [
		"EE-Quality Teacher, Class Size Reductions, and Local School Safety Measure"
	]*/

	return (
		<form onSubmit={handleSubmit}>
			<Typography variant="h6" gutterBottom className={classes.header}>
				Purpose
			</Typography>

			<Grid container spacing={3} style={{ marginTop: 10 }}>
				<Grid item xs={12} sm={4}>
					<FormControl component="fieldset">
						<FormLabel component="legend">Purpose</FormLabel>
						<Field name="position" component={renderRadioGroup} row>
							<FormControlLabel
								value="S"
								control={<Radio color="primary" />}
								label="Support"
								labelPlacement="end"
							/>
							<FormControlLabel
								value="O"
								control={<Radio color="primary" />}
								label="Oppose"
								labelPlacement="end"
							/>
						</Field>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={4}>
					<CandidateOrBallotMeasure />
				</Grid>

				<Grid item xs={12} sm={4}>
					<FormControl component="fieldset">
						<FormLabel component="legend">Type</FormLabel>
						<Field name="type" component={renderRadioGroup} row>
							<FormControlLabel
								value="IE"
								control={<Radio color="primary" />}
								label="Independent Expenditure"
								labelPlacement="end"
							/>
							<FormControlLabel
								value="MC"
								control={<Radio color="primary" />}
								label="Membership Communication"
								labelPlacement="end"
							/>
						</Field>
					</FormControl>
				</Grid>
			</Grid>

			<StepperNextButton />
		</form>
	)
}

export default reduxForm({
	form: "stepperForm", // <------ same form name
	destroyOnUnmount: false, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	initialValues
})(StepperFormFirstPage)
