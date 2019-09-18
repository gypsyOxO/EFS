import React, { useState, Fragment } from "react"
import { Field } from "formik"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import FormControl from "@material-ui/core/FormControl"
import {
	renderTextField,
	renderRadioGroup
} from "components/Form/Inputs/renderInputs"
import WizardNextButton from "components/Wizard/WizardNextButton"
import ReactSelectMaterialUi from "react-select-material-ui"

import CandidateOrBallotMeasure from "components/Form/Panels/CandidateOrBallotMeasure/CandidateOrBallotMeasure"
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

const Page1 = props => {
	const classes = useStyles()

	return (
		<Fragment>
			<Typography variant="h6" gutterBottom className={classes.header}>
				Purpose
			</Typography>

			<Grid container spacing={3} style={{ marginTop: 10 }}>
				<Grid item xs={12} sm={4}>
					<FormControl component="fieldset">
						<FormLabel component="legend">Purpose</FormLabel>
						<Field
							name="SUPPORT_OPPOSE_FLG"
							component={renderRadioGroup}
							row>
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
			<WizardNextButton {...props} />
		</Fragment>
	)
}

export default Page1
