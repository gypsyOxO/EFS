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
	subject: "C"
}

const StepperFormFirstPage = props => {
	const classes = useStyles()
	const { handleSubmit } = props
	const [isCandidate, setIsCandidate] = useState(true)

	const options: string[] = [
		"2019 LAUSD Ballot Measure",
		"2018 City Ballot Measures",
        "2017 City and LAUSD Ballot Measures",
        "2016 City Ballot Measures"
	]

	const options2: string[] = [
		"EE-Quality Teacher, Class Size Reductions, and Local School Safety Measure"
	]

	const showCandidateOrBallotmeasure = isCandidate ? (
		<CandidateOrBallotMeasure />
	) : (
		<Grid container>
			<Grid item style={{ marginBottom: 8 }} xs={12}>
				<ReactSelectMaterialUi
					fullWidth
					value="2019 LAUSD Ballot Measure"
					options={options}
				/>
			</Grid>
			<Grid item xs={12}>
				<ReactSelectMaterialUi
					fullWidth
					placeholder="Select one or more"
					options={options2}
				/>
			</Grid>
		</Grid>
	)

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

				<Grid item xs={12} sm={6}>
					<FormControl component="fieldset">
						<FormLabel component="legend">
							Choose Candidate or Ballot Measure
						</FormLabel>
						<Field name="subject" component={renderRadioGroup} row>
							<FormControlLabel
								value="C"
								control={
									<Radio
										color="primary"
										onClick={() => setIsCandidate(true)}
									/>
								}
								label="Candidate"
								labelPlacement="end"
							/>
							<FormControlLabel
								value="B"
								control={
									<Radio
										color="primary"
										onClick={() => setIsCandidate(false)}
									/>
								}
								label="Ballot Measure"
								labelPlacement="end"
							/>
						</Field>
						{/* <Field
							id="name"
							name="name"
							component={renderTextField}
							label="Enter candidate or Ballot Measure to support or oppose"
							fullWidth
                        /> */}
					</FormControl>
					{showCandidateOrBallotmeasure}
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
