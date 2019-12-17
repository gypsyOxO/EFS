import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createUploadLink } from "apollo-upload-client"
// import { resolvers,typeDefs } from "./resolvers"
import { typeDefs, resolvers } from "./resolvers"
import gql from "graphql-tag"

const link = createUploadLink({ uri: "http://localhost:4000/graphql" })

// export const client = new ApolloClient({
//   link,
//   typeDefs,
//   resolvers,
//   cache: new InMemoryCache()
// });

const GET_SUBJECT = 
    gql`
        query GetSubject {
            ELECTION_ID @client
        }
    `


export const client = new ApolloClient({
	link,
	typeDefs,
	resolvers,
	cache: new InMemoryCache()
})

const initData = () => {
	client.writeData({
		data: {            			            
            MC_FLG: "0",   
            SUPPORT_OPPOSE_FLG: "S"
		}
	})
}

initData()

client.onResetStore(async () => {
	initData()
})

client.onClearStore(async () => {
	initData()
})
