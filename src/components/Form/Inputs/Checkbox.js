import React from "react"
import { useFormikContext, Field } from "formik"
import { FormControlLabel } from "@material-ui/core"

import { renderCheckbox } from "components/Form/Inputs/renderInputs"


const Checkbox = ({name,label}) => {

    const { setFieldValue,values } = useFormikContext()
    
    return (
        <FormControlLabel 
            checked={values.name} 
            control={<Field name={name} component={renderCheckbox} />}            
            label={label} />

    )
}


export default Checkbox