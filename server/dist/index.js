"use strict";

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _schema = require("./schema");

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require("./resolvers");

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
require("babel-polyfill");

var _require = require("apollo-server-express"),
    ApolloServer = _require.ApolloServer,
    gql = _require.gql;

var _require2 = require("fs"),
    existsSync = _require2.existsSync,
    mkdirSync = _require2.mkdirSync; // added


var path = require("path"); //added


var cors = require("cors");

//***Begin file upload */


existsSync(path.join(__dirname, "../test")) || mkdirSync(path.join(__dirname, "../test"));

//***end file upload */


var server = new ApolloServer({
	cors: {
		origin: "*",
		credentials: true
	},
	typeDefs: _schema2.default,
	resolvers: _resolvers2.default,
	context: { db: _models2.default }
});

var app = express();

app.use("/test", express.static(path.join(__dirname, "../test"))); //added this dir
app.use("*", cors());

server.applyMiddleware({ app: app });

app.listen({ port: 4000 }, function () {
	return console.log("Server is running on localhost:4000" + server.graphqlPath);
});