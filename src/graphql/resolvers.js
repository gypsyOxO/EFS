import gql from 'graphql-tag';

import { graphqlFilter } from 'utils/graphqlUtil';
import {useQuery} from "@apollo/react-hooks"
import { filteredIEUpdate } from "graphql/ie/FilterQueries"


export const typeDefs = gql`
  extend type Query {
    isFolded: Boolean!
  }
`

const GET_DEFAULT_DATA = gql`
    query GetDefaultData {
        IE_ID @client
    }
`

export const resolvers = {
    Query: {
        getBlankForm: (parent, {args}, {cache}, info) => {
            console.log("args",args)
            const{val} = cache.readQuery({
                query: GET_DEFAULT_DATA
            })

            return val
        },
        addIndExp: (_, {args}, {cache}) => {
            console.log("local resolver:", args)
        }
    }


}


// export const typeDefs = gql`
//   extend type Query {
//     isFolded: Boolean
//     # isLoggedIn: Boolean!
//     # cartItems: [ID!]!
//   }


// # ***** TODO: need to handle folded values.
// #   extend type comms {

// #   }

// #   extend type Launch {
// #     isInCart: Boolean!
// #   }

//   extend type Mutation {
//     # addOrRemoveFromCart(id: ID!): [Launch]
//   }
// `
