import React from "react"
import {useMutation} from "@apollo/react-hooks"
import {UPSERT_IND_EXP_PAYMENT} from "graphql/ie/Mutations"
import {useFormikContext} from "formik"


function useUpsertPaymentData () {


    const [upsertIndExpPayment] = useMutation(UPSERT_IND_EXP_PAYMENT)
    const {setFieldValue} = useFormikContext()

    const upsertPayment = async (index, paymentPayload) => {
		//if IE_PAYMENT_ID = "" (which is default), strip it out, so it isn't sent in graphql to server which will cause error
		if (paymentPayload.IE_PAYMENT_ID === "") {
			delete paymentPayload.IE_PAYMENT_ID
		}

		paymentPayload.__typename && delete paymentPayload.__typename

		const { data } = await upsertIndExpPayment({ variables: { payment: paymentPayload } })
		setFieldValue(`payments.${index}.IE_PAYMENT_ID`, data.upsertIndExpPayment.IE_PAYMENT_ID)


    }

    return [{upsertPayment}]


}


export default useUpsertPaymentData 