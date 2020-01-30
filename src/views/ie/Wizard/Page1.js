import React, { Fragment } from "react"
import { Field } from "formik"
import { useMutation } from "@apollo/react-hooks"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import { renderRadioGroup, renderTextField, renderDatePicker } from "components/Form/Inputs/renderInputs"

import ContentBox from "components/UI/Content/ContentBox"

import { purpose_box } from "views/ie/Wizard"

import WizardNextButton from "components/Wizard/WizardNextButton"
import OnChangeHandler from "components/UI/Utils/OnChangeHandler"

import CandidateOrBallotMeasure from "components/Form/Panels/CandidateOrBallotMeasure/CandidateOrBallotMeasure"
import * as pageValidations from "validation/ie/indexpSchema"

import { graphqlFilter } from "utils/graphqlUtil"
import { filteredIEUpsert} from "graphql/ie/FilterQueries"
import { UPSERT_IND_EXP } from "graphql/ie/Mutations"

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
	const { errors, touched, values, setFieldValue } = props

    const [upsertIndExp] = useMutation(UPSERT_IND_EXP)
    
	const upsertIEData = async () => {
		if (values.DATE_DISTRIBUTED && (values.ELEC_SEAT_CAND_ID || values.BM_ID)) {
            let filteredResult = graphqlFilter(filteredIEUpsert, values)                        
            const { data } = await upsertIndExp({ variables: { ie: {...filteredResult} } })
            if (!values.IE_ID) {
                setFieldValue("IE_ID", data.upsertIndExp.IE_ID)
                setFieldValue("ORIG_IE_ID", data.upsertIndExp.IE_ID)
            }
			
			
		}
	}

	return (
		<Fragment>
			<ContentBox>{purpose_box}</ContentBox>
			<OnChangeHandler handleChange={upsertIEData}>
				<Grid container spacing={3} style={{ marginTop: 10 }}>
					<Grid item xs={12} sm={2}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Purpose</FormLabel>
							<Field name="SUPPORT_OPPOSE_FLG" component={renderRadioGroup} row>
								<FormControlLabel value="S" control={<Radio color="primary" />} label="Support" labelPlacement="end" />
								<FormControlLabel value="O" control={<Radio color="primary" />} label="Oppose" labelPlacement="end" />
							</Field>							
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6}>
						<CandidateOrBallotMeasure {...props} />
						{touched.SUBJECT && Boolean(errors.SUBJECT) ? <FormHelperText error>{errors.SUBJECT}</FormHelperText> : null}
					</Grid>

					<Grid item xs={12} sm={4}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Type</FormLabel>
							<Field name="MC_FLG" component={renderRadioGroup} row>
								<FormControlLabel value="0" control={<Radio color="primary" />} label="Independent Expenditure" labelPlacement="end" />
								<FormControlLabel value="1" control={<Radio color="primary" />} label="Membership Communication" labelPlacement="end" />
							</Field>							
						</FormControl>
					</Grid>
				</Grid>

				<Grid container spacing={3} className={classes.grid} style={{ marginTop: 10 }}>
					<Grid item xs={12} style={{ marginTop: 20 }}>
						<Typography variant="body2">Distribution:</Typography>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Field
							name="DATE_DISTRIBUTED"
                            label="Date First Distributed"       
                            required
							component={renderDatePicker}
							
						/>
					</Grid>

					<Grid item xs={12} sm={8}>
						<Field type="number" name="NUM_DISTRIBUTED" component={renderTextField} fullWidth label="Number of Pieces"                         
                        />
					</Grid>
				</Grid>
			</OnChangeHandler>
			<WizardNextButton {...props} validationGroup={pageValidations.Page1} />
		</Fragment>
	)
}

export default Page1
