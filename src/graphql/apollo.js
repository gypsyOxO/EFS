import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createUploadLink } from "apollo-upload-client"
// import { resolvers,typeDefs } from "./resolvers"
import { typeDefs, resolvers } from "./resolvers"

const link = createUploadLink({ uri: process.env.REACT_APP_SERVER_ENDPOINT })



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
            SUPPORT_OPPOSE_FLG: "S",
            SUBJECT: "C",
            NUM_DISTRIBUTED: "",
            DATE_DISTRIBUTED: "",
            ELECTION_ID: "",
            ELEC_SEAT_ID: "",
            ELEC_SEAT_CAND_ID: "",
            BM_ID: ""

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
