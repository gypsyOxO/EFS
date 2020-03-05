import * as yup from "yup"

const required = "* Required"
const invalidDate = "* Invalid date"
const invalidNumber = "* Must be numeric"

const page1 = yup.object().shape({
	DATE_DISTRIBUTED: yup
		.date()
		.required(required)
		.typeError(invalidDate),
	NUM_DISTRIBUTED: yup
		.number()
		.nullable()
		.typeError(invalidNumber),
	ELECTION_ID: yup
		.number()
		.nullable()
		.required(required),
	ELEC_SEAT_ID: yup
		.number()
		.nullable()
		.when("SUBJECT", { is: "C", then: yup.number().required(required) }),
	ELEC_SEAT_CAND_ID: yup
		.number()
		.nullable()
		.when("SUBJECT", { is: "C", then: yup.number().required(required) }),
	BM_ID: yup
		.number()
		.nullable()
		.when("SUBJECT", { is: "B", then: yup.number().required(required) }),
	SUBJECT: yup.string()
})

const page2 = yup.object().shape({
	comms: yup.lazy(value => {
		if (value && value.length) {
			return yup.array().of(
				yup.object().shape({
					COMM_TYPE: yup.string().required(required)
				})
			)
		}

		return yup.mixed().notRequired()
	})
})

const page3 = yup.object().shape({
	payments: yup.lazy(value => {
		if (value && value.length) {
			return yup.array().of(
				yup.object().shape({
					IE_PAYMENT_DATE: yup
						.date()
						.required(required)
						.typeError(invalidDate),
					IE_PAYEE_LNAME: yup.string().required(required),
					/*IE_PAYEE_FNAME: yup.string().nullable(),
                    IE_PAYEE_ADDR_STR: yup.string().required(required),
                    IE_PAYEE_ADDR_STR2: yup.string().nullable(),
                    IE_PAYEE_ADDR_CITY: yup.string().required(required),
                    IE_PAYEE_ADDR_ST: yup.string().required(required),
                    IE_PAYEE_ADDR_ZIP_5: yup.number().required(required).typeError(invalidNumber),
                    IE_PAYEE_ADDR_ZIP_4: yup.number().nullable().typeError(invalidNumber),
                    IE_PAYMENT_DESC: yup.string().required(required),*/
					IE_PAYMENT_AMT: yup
						.number()
						.required(required)
						.typeError(invalidNumber),
					IE_PAYEE_VENDORS: yup.lazy(value => {
						if (value && value.length) {
							return yup.array().of(
								yup.object().shape({
									vendorLastName: yup
										.string()
										.required(
											required
										) /*,
                                    vendorAddressStreet: yup.string().required(required),
                                    vendorAddressStreet2: yup.string().nullable(),
                                    vendorAddressCity: yup.string().required(required),
                                    vendorAddressState: yup.string().required(required),
                                    vendorAddressZip5: yup.number().required(required).typeError(invalidNumber),
                                    vendorAddressZip4: yup.number().nullable().typeError(invalidNumber)*/
								})
							)
						} else {
							return yup.mixed().notRequired()
						}
					})
				})
			)
		}

		return yup.mixed().notRequired()
	})
})


const page4 = yup.object().shape({
	CONTRIBUTIONS_MADE: yup.lazy(value => {
		if (value && value.length) {
			return yup.array().of(
				yup.object().shape({
					//  CMT_PER_ID: yup.number().nullable().required(required),
					amountContributed: yup.number().required(required),
					dateContributed: yup
						.date()
						.required(required)
						.typeError(invalidDate)
				})
			)
		}

		return yup.mixed().notRequired()
	})
})


const page5 = yup.object().shape({
	CONTRIBUTIONS_RECEIVED: yup.lazy(value => {
		if (value && value.length) {
			return yup.array().of(
				yup.object().shape({
					contributorLastName: yup.string().required(required),
					dateReceived: yup
						.date()
						.required(required)
						.typeError(invalidDate),
					amountReceived: yup
						.number()
						.required(required)
						.typeError(invalidNumber),
					contributorAddressStreet: yup.string().required(required),
					contributorAddressStreet2: yup.string().nullable(),
					contributorAddressCity: yup.string().required(required),
					contributorAddressState: yup.string().required(required),
					contributorAddressZip5: yup
						.number()
						.required(required)
						.typeError(invalidNumber),
					contributorAddressZip4: yup
						.number()
						.nullable()
						.typeError(invalidNumber),
					contributorEmployer: yup.string().required(required),
					contributorOccupation: yup.string().required(required)
				})
			)
		}

		return yup.mixed().notRequired()
	})
})


export const indexpSchema = [page1, page2, page3, page4, page5]

export const Page1 = ["DATE_DISTRIBUTED", "ELECTION_ID", "ELEC_SEAT_ID", "ELEC_SEAT_CAND_ID", "BM_ID"]
export const Page2 = []
export const Page3 = []
export const Page4 = []
export const Page5 = []

//Field group validations page1

//export const page1 =
