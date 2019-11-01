import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ThemeProvider } from "@material-ui/styles"
import theme from "./theme/theme"

import ApolloClient from "apollo-boost"
//import {InMemoryCache} from "apollo-cache-inmemory"
import { ApolloProvider } from "react-apollo"
//import { resolvers,typeDefs } from "./graphql/resolvers"
import {client} from "./graphql/apollo"
//import {createHttpLink} from "apollo-link-http"

//import * as serviceWorker from "./serviceWorker"

// const client = new ApolloClient({
//     uri: "http://localhost:4000/graphql",    
//     typeDefs,
//     resolvers
// })



// ***setup a blank form***
const initData = () => {
	client.writeData({
		data: {
			IE_ID: 6443,
			SUBJECT: "B",
			ELECTION_ID: 37,
			BM_ID: 72,
			MC_FLG: "1",
			SUPPORT_OPPOSE_FLG: "S",
			CMT_PER_ID: 14389,
			ELEC_SEAT_ID: 0,
			ELEC_SEAT_CAND_ID: 0
		}
	})
}

initData()

client.onResetStore(async () => {
    initData();
  });

  client.onClearStore(async () => {
    initData();
  });


//console.log("client:", client)

ReactDOM.render(
	<ApolloProvider client={client}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</ApolloProvider>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//serviceWorker.register()
