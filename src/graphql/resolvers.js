import gql from 'graphql-tag';

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
