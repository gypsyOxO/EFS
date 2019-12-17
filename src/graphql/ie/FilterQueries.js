import gql from "graphql-tag"

export const filteredSubmit = gql`
	query {
		indexp
		CMT_PER_ID
		MC_FLG
		ELECTION_ID
		SUPPORT_OPPOSE_FLG
		BM_ID
	}
`

export const filteredIEUpdate = gql`
	query {			
		CMT_PER_ID
		MC_FLG
		ELECTION_ID
        ELEC_SEAT_ID
        ELEC_SEAT_CAND_ID
		SUPPORT_OPPOSE_FLG
		BM_ID
        REP_CONT_MADE
        REP_CONT_RECEIVED
        CONTRIBUTIONS_MADE
        CONTRIBUTIONS_RECEIVED
        DATE_DISTRIBUTED
        NUM_DISTRIBUTED

	}
`

export const filteredPaymentUpdate = gql`
	query {			
		CMT_PER_ID
		MC_FLG
		ELECTION_ID
		SUPPORT_OPPOSE_FLG
		BM_ID
        CONTRIBUTIONS_MADE
        CONTRIBUTIONS_RECEIVED
	}
`

