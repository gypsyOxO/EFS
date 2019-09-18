
export default `   

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
    
    type IndExp {
        IE_ID: ID!
        ELECTION_ID: Int!
        ELEC_SEAT_ID: Int
        ELEC_SEAT_CAND_ID: Int!
        CAND_PER_ID: Int
        SUPPORT_OPPOSE_FLG: String   
        indexpcomms: [IndExpComm]     
    }

    type T1 {
        IE_ID: ID
        CAND_PER_ID: Int
        SUPPORT_OPPOSE_FLG: String   
        comms: [T1S1]     
    }



    input T1Input {        
        CAND_PER_ID: Int
        SUPPORT_OPPOSE_FLG: String
        t1s1s: [T1S1Input]
    }

    input T1S1Input {
        COMM_TYPE: String
        DOC_FILE_NAME: String

    }


    type user {
        id: ID!
        firstname: String
    }

    type address {
        id: ID!
        type: String
        userId: Int
    }

    input addressInput {        
        type: String
        userId: Int
    }



    input IEInput {
        CAND_PER_ID: Int
        SUPPORT_OPPOSE_FLG: String
        ELECTION_ID: Int!,
        BM_ID: Int,
        MC_FLG: Int!
        ind_exp_communications: [CommsInput]        
    }

    input CommsInput {                        
        COMM_TYPE: String
        DOC_FILE_NAME: String
    }

    type IE {
        IE_ID: ID! 
        CAND_PER_ID: Int
        SUPPORT_OPPOSE_FLG: String        
    }

    type T1S1 {
        IE_COMM_ID: ID!
        IE_ID: Int!        
        COMM_TYPE: String
        DOC_FILE_NAME: String
    }

    type IndExpComm {
        IE_COMM_ID: ID!
        IE_ID: Int!        
        COMM_TYPE: String
        DOC_FILE_NAME: String
    }

	type Query {
        candidates: [Candidate!]! 
        indexp(IE_ID: Int!): IndExp! 
        indexps(limit: Int): [IndExp!]!
        t1(IE_ID: Int!): T1! 
        ballotmeasures: [BallotMeasure!]!
        ballotmeasure(BM_ID: Int!): BallotMeasure!         
        
    }

        
    type Mutation {
        createComms(IE_ID: Int!, COMM_TYPE: String!, DOC_FILE_NAME: String!): [T1S1!]!
        createIE(ie: IEInput ): IE      
        createUser(firstname: String, addresses: [addressInput]):  user
    }
`
