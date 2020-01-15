import React, { Fragment } from "react"
import { commTypes, disclaimers } from "views/ie/Wizard"
import Grid from "@material-ui/core/Grid"
import Checkbox from "components/Form/Inputs/Checkbox"
import { useFormikContext } from 'formik';





const Disclaimers = props => {

    const {index} = props

    const {setFieldValue} = useFormikContext()
    
    let isRequiredUploaded = true
    
     //check if one or both files have been uploaded.
    for (let commType of commTypes) {
        if (!!props[commType + "_FILE_TYPES"]) {
            isRequiredUploaded = isRequiredUploaded && !!props[commType + "_FILE_NAME"] ? true : false
        }
    }

    isRequiredUploaded && props.DISCLAIMERS.required && setFieldValue(`comms.${index}.DISCLAIMERS.required`, false)
   

    //check if a file has been uploaded
    let fileAdded = false
    for (let commType of commTypes) {
        if (props[commType + "_FILE_NAME"]) {
            fileAdded = true
            break
        }
    }

	const renderDisclaimers = disclaimers.map(disclaimer => {
        let show = false

        show = disclaimer.isRequired && !isRequiredUploaded ? true : !disclaimer.isRequired && fileAdded ? true : false

	    return show && <Checkbox key={disclaimer.name} name={`comms.${index}.DISCLAIMERS.${disclaimer.name}`} label={disclaimer.description} />

	})

	return (		
			<Grid item xs={12}>
				{renderDisclaimers}            
			</Grid>
		
	)
}

export default Disclaimers
