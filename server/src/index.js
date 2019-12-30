const express = require("express")
require("babel-polyfill");
const { ApolloServer, gql } = require("apollo-server-express")


const { existsSync, mkdirSync } = require("fs");  // added
const path = require("path"); //added


import db from "../models"
import schema from './schema'
import resolvers from './resolvers'
var cors = require("cors")

//***Begin file upload */



existsSync(path.join(__dirname, "../test")) || mkdirSync(path.join(__dirname, "../test"));

//***end file upload */


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

app.use("/test", express.static(path.join(__dirname, "../test")));  //added this dir
app.use("*", cors())

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
	console.log(`Server is running on localhost:4000${server.graphqlPath}`)
)
