export default `   
	type Candidate {
        ELECTION_ID: Int!
        ELECTION_DESC: String!
        ELEC_SEAT_ID: Int!
        ELEC_SEAT_CAND_ID: Int!
        CAND_PER_ID: Int!
        PER_FNAME: String
        PER_LNAME: String
        ELEC_SEAT_LABEL: String!
        JURIS_ID: Int
    }

    type BallotMeasure {
        BM_ID: Int!
        BM_NUM_OR_LETTER: String
        BM_NAME: String
        ELECTION_ID: Int
        ELECTION_DESC: String
        ELECTION_DATE: String
        BM_FULL_NAME: String
        BM_GROUP_LABEL: String
        JURIS_ID: Int
    }

    type IndExp {
        IE_ID: ID!
        ELECTION_ID: Int!
        ELEC_SEAT_ID: Int
        ELEC_SEAT_CAND_ID: Int!
        CAND_PER_ID: Int
        SUPPORT_OPPOSE_FLG: String   
        indexpcomms: [IndExpComm]     
    }


    type IndExpComm {
        IE_COMM_ID: Int!
        IE_ID: Int!        
        COMM_TYPE: String
    }

	type Query {
        candidates: [Candidate!]! 
        indexp(IE_ID: Int!): IndExp! 
        indexps(limit: Int): [IndExp!]!
        ballotmeasures: [BallotMeasure!]!
        ballotmeasure(BM_ID: Int!): BallotMeasure! 
	}
`