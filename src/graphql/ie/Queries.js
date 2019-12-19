import gql from "graphql-tag"

export const GET_BLANK_FORM = gql`
	query GetDefaultData {
		MC_FLG
		SUPPORT_OPPOSE_FLG
	}
`

// ELECTION_ID
// BM_ID
// CMT_PER_ID
// ELEC_SEAT_ID
// ELEC_SEAT_CAND_ID
// NUM_DISTRIBUTED
// SUPPORT_OPPOSE_FLG
// NUM_DISTRIBUTED
// DATE_DISTRIBUTED
// MC_FLG
// REP_CONT_MADE
// REP_CONT_RECEIVED

export const GET_IND_EXP = gql`
	query GetIndExp($IE_ID: Int!) {
		getIndExp(IE_ID: $IE_ID) {
			IE_ID
			SUBJECT
			CMT_PER_ID
			MC_FLG
			ELECTION_ID
			ELEC_SEAT_ID
			ELEC_SEAT_CAND_ID
			SUPPORT_OPPOSE_FLG
			BM_ID
			CONTRIBUTIONS_MADE
			CONTRIBUTIONS_RECEIVED
			NUM_DISTRIBUTED
			DATE_DISTRIBUTED
			REP_CONT_MADE
			REP_CONT_RECEIVED
			payments {
				IE_PAYMENT_ID
				IE_PAYEE
				IE_PAYMENT_DESC
				IE_PAYMENT_AMT
				IE_PAYMENT_DATE
				IE_PAYEE_VENDORS
			}
			comms {
				IE_COMM_ID
				COMM_TYPE
				AUDIO_FILE_NAME
				DOC_FILE_NAME
				VIDEO_FILE_NAME
			}
		}
	}
`

// ====================================================
// Auxiliary Queries
// ====================================================



//Candidate or Ballot Measures
export const GET_CANDIDATES = gql`
	query {
		getCandidates {
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

export const GET_BALLOTMEASURES = gql`
	query {
		getBallotmeasures {
			BM_ID
			BM_NUM_OR_LETTER
			BM_NAME
			BM_FULL_NAME
			BM_GROUP_LABEL
			ELECTION_ID
			ELECTION_DESC
			JURIS_ID
		}
	}
`

export const GET_COMM_TYPES = gql`
	query {
		getCommtypes {
			COMM_TYPE
			COMM_TYPE_DESC
			DOC_FILE_TYPES
			AUDIO_FILE_TYPES
			VIDEO_FILE_TYPES
		}
	}
`



// ====================================================
// Apollo Local Resolver (cache) Queries
// ====================================================
export const GET_CANDIDATE_OR_BALLOTMEASURE_NAME = gql`
	query GetCandidateOrBallotMeasureName($id: Int!, $type: String!) {
		getCandidateOrBallotMeasureName(id: $id, type: $type) @client {
			name
			type
		}
	}
`

export const GET_CANDIDATE_NAMES = gql`
	query getCandidates {
        getCandidates {
		PER_FNAME
		PER_LNAME
        ELEC_SEAT_CAND_ID
        }
	}
`

export const GET_BALLOTMEASURE_NAMES = gql`
    query getBallotmeasures {
        getBallotmeasures {
            BM_ID            
            BM_FULL_NAME
        }
    }
`


