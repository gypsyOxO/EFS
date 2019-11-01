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

export const filteredUpdate = gql`
	query {
		IE_ID		
		CMT_PER_ID
		MC_FLG
		ELECTION_ID
		SUPPORT_OPPOSE_FLG
		BM_ID
        communications {
            COMM_TYPE
            AUDIO_FILE_NAME
        }
	}
`
