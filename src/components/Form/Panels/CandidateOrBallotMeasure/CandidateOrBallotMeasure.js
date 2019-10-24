import React, { Component, useState } from 'react'
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import FormControl from "@material-ui/core/FormControl"
import { renderTextField, renderRadioGroup } from "../../../Form/Inputs/renderInputs"
import { Field} from "formik"
import BallotMeasure from "../../../Form/Group/BallotMeasure/BallotMeasure"
import Candidate from "../../../Form/Group/Candidate/Candidate"

//need to take in initialization value. also needs to pass on selected props. spinner happens at candidate or ballot measure level?
//class CandidateOrBallotMeasure extends Component {
const CandidateOrBallotMeasure = props => {
    const showCandidateOrBallotmeasure = (
        props.values.SUBJECT === 'C' ? (
            <div><Candidate {...props} /></div>
        ) : (
            <div><BallotMeasure {...props} /></div>
        )
    )

    return (
        //have radio button here
        //which switches between candidate or ballot measure. could be a function maybe? but needs state
        // <Candidate {...this.props} />					
        <FormControl component="fieldset">
            <FormLabel component="legend">
                Choose Candidate or Ballot Measure
                </FormLabel>
            <Field name="SUBJECT" component={renderRadioGroup} row>
                <FormControlLabel
                    value="C"
                    control={
                        <Radio
                            color="primary"
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
                        />
                    }
                    label="Ballot Measure"
                    labelPlacement="end"
                />
            </Field>
            {showCandidateOrBallotmeasure}
        </FormControl>

    )
}

export default CandidateOrBallotMeasure