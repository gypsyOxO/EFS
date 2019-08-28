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
        
	}
`