import {useEffect} from "react"
import { useFormikContext } from 'formik';

export default function useCleanErrorsOnUnmount () {    
    const {setErrors} = useFormikContext()
    useEffect(() => {
        return function cleanup() {                
            setErrors({})
        }
    }, [setErrors])

}