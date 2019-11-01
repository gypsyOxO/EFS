import gql from "graphql-tag"

export const GET_BLANK_FORM = gql`
	query GetDefaultData {
		IE_ID
		SUBJECT
		ELECTION_ID
		BM_ID
		MC_FLG
		SUPPORT_OPPOSE_FLG
		CMT_PER_ID
		ELEC_SEAT_ID
		ELEC_SEAT_CAND_ID
	}
`

export const GET_IND_EXP = gql`
	query indexp($IE_ID: Int!) {
		indexp(IE_ID: $IE_ID) {
			IE_ID
			SUBJECT
			CMT_PER_ID
			MC_FLG
			ELECTION_ID
			SUPPORT_OPPOSE_FLG
			BM_ID
			payments {
				IE_PAYEE
                IE_PAYMENT_DESC
                IE_PAYMENT_AMT
                IE_PAYMENT_DATE
                vendors {
                    IE_PAYMENT_VENDOR_ID
                    IE_PAYMENT_ID
                    IE_ID
                    IE_PAYMENT_VENDOR_LNAME

                }
			}
		}
	}
`

// ====================================================
// Auxiliary Queries
// ====================================================

export const GET_CANDIDATES = gql`
	query {
		candidates {
			ELECTION_ID
			ELECTION_DESC
			ELEC_SEAT_ID
			ELEC_SEAT_CAND_ID
			CAND_PER_ID
			PER_FNAME
			PER_LNAME
			ELEC_SEAT_LABEL
			JURIS_ID
		}
	}
`

export const GET_COMM_TYPES = gql`
    query {
        commtypes {
            COMM_TYPE
            COMM_TYPE_DESC
            DOC_FILE_TYPES
            AUDIO_FILE_TYPES
            VIDEO_FILE_TYPES
        }
    }

`
