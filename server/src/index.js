const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")

import db from "../models"
import schema from './schema'
import resolvers from './resolvers'
var cors = require("cors")


const server = new ApolloServer({
	cors: {
		origin: "*",
		credentials: true
	},
	typeDefs: schema,
	resolvers,
	context: { db }
})

const app = express()
app.use("*", cors())

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
	console.log(`Server is running on localhost:4000${server.graphqlPath}`)
)
