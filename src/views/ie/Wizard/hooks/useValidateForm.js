import { useFormikContext } from 'formik';
import isEmpty from "lodash/isEmpty"


function useValidateForm() {
    const {validateForm} = useFormikContext()

    
    async function validate () {
        const errors = await validateForm() 
        return isEmpty(errors)
    }

    return validate

}

export default useValidateForm