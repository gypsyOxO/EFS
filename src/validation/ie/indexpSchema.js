import * as yup from "yup"

const required = "* Required"
const invalidDate="* Invalid date"
const invalidNumber="* Must be numeric"

export const indexpSchema = yup.object().shape({
    DATE_DISTRIBUTED: yup.date().required(required).typeError(invalidDate),
    NUM_DISTRIBUTED: yup.number().nullable().typeError(invalidNumber),
	ELECTION_ID: yup.number().nullable().required(required),
	ELEC_SEAT_ID: yup.number().nullable().when("SUBJECT", { is: "C", then: yup.number().required(required) }),
	ELEC_SEAT_CAND_ID: yup.number().nullable().when("SUBJECT", { is: "C", then: yup.number().required(required) }),
	BM_ID: yup.number().nullable().when("SUBJECT", { is: "B", then: yup.number().required(required) }),
    SUBJECT: yup.string(),
    CONTRIBUTIONS_MADE: yup.lazy(value => {
        if (value.length) {
            return yup.array().of(
                yup.object().shape({
                  //  CMT_PER_ID: yup.number().nullable().required(required),
                    amountContributed: yup.number().required(required),
                    dateContributed: yup.date().required(required).typeError(invalidDate)
                })
            )
        }
    }),
    CONTRIBUTIONS_RECEIVED: yup.lazy(value => {
        if (value.length) {
            return yup.array().of(
                yup.object().shape({
					contributorLastName: yup.string().required(required),
					dateReceived: yup.date().required(required).typeError(invalidDate),
					amountReceived: yup.number().required(required).typeError(invalidNumber),
					contributorAddressStreet: yup.string().required(required),
					contributorAddressStreet2: yup.string().nullable(),
					contributorAddressCity: yup.string().required(required),
					contributorAddressState: yup.string().required(required),
					contributorAddressZip5: yup.number().required(required).typeError(invalidNumber),
					contributorAddressZip4: yup.number().nullable().typeError(invalidNumber),
					contributorEmployer: yup.string().required(required),
					contributorOccupation :yup.string().required(required)
                })
            )
        }
    })
    // comms: yup.lazy(value => {
    //     if (value.length) {
    //         return yup.array().of(
    //             yup.object().shape({
    //                 COMM_TYPE: yup.string().required(required)
    //             })
    //         )
    //     }
    // })




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
