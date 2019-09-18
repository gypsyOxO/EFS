import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ThemeProvider } from "@material-ui/styles"
import theme from "./theme/theme"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import * as serviceWorker from "./serviceWorker"

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' })

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
serviceWorker.register()
