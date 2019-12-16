import React from "react"

import { useFormikContext } from 'formik';

function RequestHandler(req) {
    
    const {values} = useFormikContext()

    console.log("values", values)
    switch (req) {
        case 'updateIndExp':
            alert(req)
            break
        default: 
        
    }

}

export default RequestHandler