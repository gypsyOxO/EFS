import gql from "graphql-tag"


import {GET_CANDIDATE_NAMES, GET_BALLOTMEASURE_NAMES} from "graphql/ie/Queries"

export const typeDefs = gql`
	extend type Query {
		isFolded: Boolean!
	}
`

export const resolvers = {
	Query: {
		getCandidateOrBallotMeasureName: (_, { id, type }, { cache }) => {
            
            //candidate
            if (type === "C") {
                
                const {getCandidates : gc} = cache.readQuery({ query: GET_CANDIDATE_NAMES })                
                const {PER_FNAME, PER_LNAME} = gc.find(candidate => candidate.ELEC_SEAT_CAND_ID === id)
                return {"name" : PER_FNAME + " " + PER_LNAME, "type" : "Candidate", __typename: "candidate"}
            }

            //ballotmeasure
            if (type === "B") {                
                const {getBallotmeasures : gb} = cache.readQuery({ query: GET_BALLOTMEASURE_NAMES })
                const {BM_FULL_NAME} = gb.find(bm => bm.BM_ID === id)               
                return {"name" : BM_FULL_NAME, "type" : "Ballot Measure", __typename: "ballotmeasure"}
            }
			
		},

	}
}
