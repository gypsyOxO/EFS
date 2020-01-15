import gql from "graphql-tag"
import { DateFnsUtils } from '@date-io/date-fns';
import { Input } from '@material-ui/core/Input';


export default gql`

    scalar JSON
    scalar Date
    scalar Time
    scalar DateTime

	type Query {
		getFiles: [String]
		getCandidates: [Candidate!]!
		getIndExp(IE_ID: Int!): IndExp!
		getIndExps(limit: Int): [IndExp!]!
		getBallotmeasures: [BallotMeasure!]!
		getCommtypes: [IndExpCommtype!]!		
		getBallotmeasure(BM_ID: Int!): BallotMeasure!
        getIndExpPayment(IE_PAYMENT_ID: Int!): IndExpPayment
	}

	type Mutation {
        deleteIndExpComm(IE_COMM_ID: Int!): Int
        deleteIndExpPayment(IE_PAYMENT_ID: Int!): Int
		uploadFile(file: Upload!,meta: FileMetaData!): Boolean
		addIndExp(ie: IndExpInput!): IndExp
		updateIndExp(IE_ID: Int!, ie: IndExpInput): IndExp        
        upsertIndExp(ie: IndExpInput!): IndExp
		upsertIndExpPayment(payment: IndExpPaymentInput): IndExpPayment
        upsertIndExpComm(comm: IndExpCommInput): IndExpComm
	}


    enum IndExpFileTypes {
        AUDIO
        VIDEO
        DOC
    }

    
    input FileMetaData {
        FILE_TYPE: IndExpFileTypes!
        MODIFIED_FILE_NAME: String!
    }


	type IndExp {
		IE_ID: Int!
		SUBJECT: String
		ELECTION_ID: Int
		ELEC_SEAT_ID: Int
		ELEC_SEAT_CAND_ID: Int
		CAND_PER_ID: Int
        AMEND_NUM: Int
		BM_ID: Int
        ORIG_IE_ID: Int
		MC_FLG: String
		CMT_PER_ID: Int
        REP_CONT_MADE: String
        REP_CONT_RECEIVED: String    
        DATE_DISTRIBUTED: String    
        NUM_DISTRIBUTED: Int
		SUPPORT_OPPOSE_FLG: String
		comms: [IndExpComm]
		payments: [IndExpPayment]
        CONTRIBUTIONS_MADE: JSON
        CONTRIBUTIONS_RECEIVED: JSON
        PRIMARY_GENERAL_FLG: String
	}

	input IndExpInput {
        IE_ID: Int
		CAND_PER_ID: Int
		CMT_PER_ID: Int  
        AMEND_NUM: Int      
		SUPPORT_OPPOSE_FLG: String
        ORIG_IE_ID: Int
		ELECTION_ID: Int
        ELEC_SEAT_ID: Int
        ELEC_SEAT_CAND_ID: Int
		MC_FLG: String
		BM_ID: Int
        DATE_DISTRIBUTED: String
        NUM_DISTRIBUTED: Int
        REP_CONT_MADE: String
        REP_CONT_RECEIVED: String
        CONTRIBUTIONS_MADE: JSON		
        CONTRIBUTIONS_RECEIVED: JSON	
        PRIMARY_GENERAL_FLG: String	
	}

	type IndExpComm {
        IE_ID: Int!
		IE_COMM_ID: Int!
		COMM_TYPE: String        
		DOC_FILE_NAME: String
        AUDIO_FILE_NAME: String
        VIDEO_FILE_NAME: String
        DISCLAIMERS: JSON
	}


	type IndExpCommtype {        
		COMM_TYPE: String
        COMM_TYPE_DESC: String        
		DOC_FILE_TYPES: String
        AUDIO_FILE_TYPES: String
        VIDEO_FILE_TYPES: String
        DISCLAIMERS: JSON
	}


	input IndExpCommInput {
        IE_COMM_ID: Int
        IE_ID: Int!
		COMM_TYPE: String!
		DOC_FILE_NAME: String
		AUDIO_FILE_NAME: String
        VIDEO_FILE_NAME: String
        DISCLAIMERS: JSON
	}

	type IndExpPayment {
		IE_PAYMENT_ID: Int
        IE_ID: Int!
		IE_PAYEE: String
		IE_PAYMENT_DESC: String
		IE_PAYMENT_DATE: String
		IE_PAYMENT_AMT: Float
        IE_PAYEE_VENDORS: JSON

	}

	input IndExpPaymentInput {
		IE_ID: Int!
        IE_PAYMENT_ID: Int
		IE_PAYEE: String
		IE_PAYMENT_DESC: String
		IE_PAYMENT_DATE: String
		IE_PAYMENT_AMT: Float
        IE_PAYEE_VENDORS: JSON
		
	}

	type BallotMeasure {
		BM_ID: Int!
		BM_NUM_OR_LETTER: String
		BM_NAME: String
        PRIMARY_GENERAL_FLG: String
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
        PRIMARY_FLG: Int!
        GENERAL_FLG: Int!
		ELEC_SEAT_ID: Int!
		ELEC_SEAT_CAND_ID: Int!
		CAND_PER_ID: Int!
		PER_FNAME: String
		PER_LNAME: String
		ELEC_SEAT_LABEL: String!
		JURIS_ID: Int
	}

`