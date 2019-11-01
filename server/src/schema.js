import gql from "graphql-tag"

export default gql`   

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
        IE_ID: Int!
        SUBJECT: String
        ELECTION_ID: Int!
        ELEC_SEAT_ID: Int
        ELEC_SEAT_CAND_ID: Int!
        CAND_PER_ID: Int
        BM_ID: Int
        MC_FLG: String
        CMT_PER_ID: Int!
        SUPPORT_OPPOSE_FLG: String   
        indexpcomms: [IndExpComm]     
        payments: [Payment]
    }


    input IECreate {
        CAND_PER_ID: Int
        CMT_PER_ID: Int!
        SUPPORT_OPPOSE_FLG: String
        ELECTION_ID: Int!
        MC_FLG: String!
        BM_ID: Int                
        ind_exp_communications: [CommInput]        

    }

    input IEUpdate {
        IE_ID: Int!
        CAND_PER_ID: Int        
        CMT_PER_ID: Int!
        SUPPORT_OPPOSE_FLG: String
        ELECTION_ID: Int!
        MC_FLG: String!
        BM_ID: Int        
        communications: [CommInput]        
        payments: [PaymentInput]
    }


    input CommInput {                        
        COMM_TYPE: String
        DOC_FILE_NAME: String
        AUDIO_FILE_NAME: Upload
        
    }

    

    type IE {
        IE_ID: ID
        CAND_PER_ID: Int
        SUPPORT_OPPOSE_FLG: String        
    }

    type IndExpComm {
        IE_COMM_ID: Int!        
        COMM_TYPE: String
        DOC_FILE_NAME: String
    }

    type Payment {
        IE_PAYMENT_ID: Int!
        IE_PAYEE: String
        IE_PAYMENT_DESC: String
        IE_PAYMENT_DATE: String
        IE_PAYMENT_AMT: String
        vendors: [Vendor]        
    }


    input PaymentInput {
        IE_PAYMENT_ID: Int!
        IE_PAYEE: String
        IE_PAYMENT_DESC: String
        IE_PAYMENT_DATE: String
        IE_PAYMENT_AMT: String
        # vendors: [VendorInput]
    }


    type Vendor {
        IE_PAYMENT_VENDOR_ID: Int!
        IE_PAYMENT_ID: Int!
        IE_ID: Int!      
        IE_PAYMENT_VENDOR_LNAME: String
    }

    # input VendorInput {        
    #     IE_PAYMENT_ID: Int!
    #     IE_ID: Int!      
    #     IE_PAYMENT_VENDOR_LNAME: String
    # }


    type CommType {        
        COMM_TYPE: String!
        COMM_TYPE_DESC: String!
        DOC_FILE_TYPES: String
        AUDIO_FILE_TYPES: String
        VIDEO_FILE_TYPES: String
    }    

	type Query {
        files: [String]
        candidates: [Candidate!]! 
        indexp(IE_ID: Int!): IndExp! 
        indexps(limit: Int): [IndExp!]!
        ballotmeasures: [BallotMeasure!]!
        commtypes: [CommType!]!
        ballotmeasure(BM_ID: Int!): BallotMeasure!         
        
    }

        
    type Mutation {
        uploadFile(file: Upload!): Boolean        
        createIE(ie: IECreate ): IndExp   
        updateIE(ie: IEUpdate): ID        


    }
`

//createComms(IE_ID: Int!, COMM_TYPE: String!, DOC_FILE_NAME: String!): [T1S1!]!