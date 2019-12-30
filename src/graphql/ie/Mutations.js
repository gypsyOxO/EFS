import gql from "graphql-tag"



export const UPSERT_IND_EXP = gql`
	mutation UpsertIndExp($ie: IndExpInput!) {
		upsertIndExp(ie: $ie) {
			IE_ID
		}
	}
`

export const UPSERT_IND_EXP_PAYMENT = gql`
	mutation UpsertIndExpPayment($payment: IndExpPaymentInput!) {
		upsertIndExpPayment(payment: $payment) {
			IE_PAYMENT_ID
		}
	}
`

export const UPSERT_IND_EXP_COMM = gql`
	mutation UpsertIndExpComm($comm: IndExpCommInput!) {
		upsertIndExpComm(comm: $comm) {
			IE_COMM_ID
		}
	}
`

export const SINGLE_FILE_UPLOAD = gql`
	mutation UploadFile($file: Upload!, $meta: FileMetaData!) {
		uploadFile(file: $file, meta: $meta)
	}
`

export const DELETE_IND_EXP_COMM = gql`
    mutation DeleteIndExpComm($IE_COMM_ID: Int!) {
        deleteIndExpComm(IE_COMM_ID: $IE_COMM_ID)
    }
`
export const DELETE_IND_EXP_PAYMENT = gql`
    mutation DeleteIndExpPayment($IE_PAYMENT_ID: Int!) {
        deleteIndExpPayment(IE_PAYMENT_ID: $IE_PAYMENT_ID)
    }
`

// export const ADD_IND_EXP = gql`
// 	mutation AddIndEXP($ie: IndExpInput!) {
// 		addIndExp(ie: $ie) {
// 			IE_ID
// 			SUBJECT
// 			ELECTION_ID
// 			ELEC_SEAT_ID
// 			ELEC_SEAT_CAND_ID
// 			CAND_PER_ID
// 			BM_ID
// 			MC_FLG
// 			CMT_PER_ID
// 			REP_CONT_MADE
// 			REP_CONT_RECEIVED
// 			DATE_DISTRIBUTED
// 			NUM_DISTRIBUTED
// 			SUPPORT_OPPOSE_FLG
// 		}
// 	}
// `


