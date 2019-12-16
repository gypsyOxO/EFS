import React, { Component, useState,useEffect } from 'react'
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import FormControl from "@material-ui/core/FormControl"
import { renderTextField, renderRadioGroup } from "../../../Form/Inputs/renderInputs"
import { Field} from "formik"
import BallotMeasure from "../../../Form/Group/BallotMeasure/BallotMeasure"
import Candidate from "../../../Form/Group/Candidate/Candidate"




//needs to hold state and handle previous in case it changes from one to the other
const CandidateOrBallotMeasure = props => {    

    const {setFieldValue, values: {SUBJECT}} = props
    const [prevSubject, setPrevSubject] = useState(null)

    useEffect(() => {

        if (prevSubject === "C" && SUBJECT === "B") {
            setFieldValue("ELECTION_ID",null)        
            setFieldValue("ELEC_SEAT_ID",null)        
            setFieldValue("ELEC_SEAT_CAND_ID",null)        
        }
        if (prevSubject === "B" && SUBJECT === "C") {
            setFieldValue("ELECTION_ID",null)                
            setFieldValue("BM_ID",null)        
        }
         
        setPrevSubject(SUBJECT) 
        
    }, [SUBJECT])

    let showControl = null

    if (SUBJECT === 'C') {
        showControl = <div><Candidate {...props} /></div>
    } else if (SUBJECT === 'B') {
        showControl = <div><BallotMeasure {...props} /></div>
    }

    return (			
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
            {showControl}
        </FormControl>

    )
}

export default CandidateOrBallotMeasure