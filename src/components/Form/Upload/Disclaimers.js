import React, { Fragment } from "react"
import { commTypes, disclaimers, defaultDisclaimers } from "views/ie/Wizard"
import Grid from "@material-ui/core/Grid"
import Checkbox from "components/Form/Inputs/Checkbox"
import { useFormikContext } from 'formik';

const Disclaimers = props => {
    const {index} = props
    let {DISCLAIMERS} = props
    const {setFieldValue} = useFormikContext()

     //check if all required files have been uploaded.
    let isRequiredUploaded = true
    for (let commType of commTypes) {
        if (!!props[commType + "_FILE_TYPES"]) {
            isRequiredUploaded = isRequiredUploaded && !!props[commType + "_FILE_NAME"] ? true : false
        }
    }

    // if no disclaimers on communication, then create default.
    DISCLAIMERS = DISCLAIMERS || defaultDisclaimers
    //setFieldValue(`comms.${index}.DISCLAIMERS`, DISCLAIMERS)

    //if all required files have been uploaded and the required disclaimer checkbox was checked, then set required disclaimer value to false.
    isRequiredUploaded && DISCLAIMERS.required && setFieldValue(`comms.${index}.DISCLAIMERS.required`, false)
   
    //check if any files have been uploaded
    let fileAdded = false
    for (let commType of commTypes) {
        if (props[commType + "_FILE_NAME"]) {
            fileAdded = true
            break
        }
    }

	const renderDisclaimers = disclaimers.map(disclaimer => {
        let show = false

        /*show = disclaimer.isRequired && !isRequiredUploaded ? true : !disclaimer.isRequired && fileAdded ? true : false */ 
        show = ((disclaimer.isRequired && !isRequiredUploaded)      // Show disclaimers for "Required file" if any required file is missing.
                || (!disclaimer.isRequired && fileAdded) )          // ..or other disclaimers if any file has been uploaded
                &&
                (disclaimer.comm_file_type.some(comm_file_type => comm_file_type==props.COMM_FILE_TYPE))    // filter by disclaimers specific to the type (DOC, AUDIO, VIDEO)
	    return show && <Checkbox key={disclaimer.name} name={`comms.${index}.DISCLAIMERS.${disclaimer.name}`} label={disclaimer.description} />

	})

	return (		
			<Grid item xs={12}>
				{renderDisclaimers}            
			</Grid>
		
	)
}

export default Disclaimers
