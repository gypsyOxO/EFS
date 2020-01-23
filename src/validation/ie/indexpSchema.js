import * as Yup from "yup"

const required = "* Required"
const invalidDate="* Invalid date"

export const indexpSchema = Yup.object().shape({
	DATE_DISTRIBUTED: Yup.date().required(required).typeError(invalidDate),
	ELECTION_ID: Yup.number().nullable().required(required),
	ELEC_SEAT_ID: Yup.number().nullable().when("SUBJECT", { is: "C", then: Yup.number().required(required) }),
	ELEC_SEAT_CAND_ID: Yup.number().nullable().when("SUBJECT", { is: "C", then: Yup.number().required(required) }),
	BM_ID: Yup.number().nullable().when("SUBJECT", { is: "B", then: Yup.number().required(required) }),
    SUBJECT: Yup.string()
    // ,
    
    //  comms: Yup.array().of(
    //             Yup.object().shape({
    //                 COMM_TYPE: Yup.string()
    //             })
    

    //)
	// payments: Yup.array().of(
	//     Yup.object().shape({
	//         IE_PAYMENT_DATE: Yup.string().required("Required"),
	//         IE_PAYMENT_AMT: Yup.string().required("Required"),
	//         IE_PAYEE: Yup.string().required("Required"),
	//         IE_PAYMENT_DESC: Yup.string().required("Required")
	//     })

	// )
})

export const Page1 = ["DATE_DISTRIBUTED", "ELECTION_ID", "ELEC_SEAT_ID", "ELEC_SEAT_CAND_ID", "BM_ID"]
export const Page2 = []
export const Page3 = []
export const Page4 = []
export const Page5 = []

//Field group validations page1

//export const page1 =
