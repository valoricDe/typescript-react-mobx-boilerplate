const fs = require('fs');
const path = require('path');
var babelRelayPlugin   = require('babel-relay-plugin');
const {
	buildClientSchema,
	introspectionQuery,
	printSchema,
} = require('graphql/utilities');
var request            = require('sync-request');

const schemaPath = path.join(__dirname, '../schema');
const g = require('../settings').graphql;

var graphqlUrl = 'http://'+g.host+':'+g.port+'/graphql';
var response = request('POST', graphqlUrl, {
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({'query': introspectionQuery}),
});

var schemaJSON = JSON.parse(response.body.toString('utf-8'));

fs.writeFileSync(
	`${schemaPath}.json`,
	JSON.stringify(schemaJSON.data, null, 2)
);

// Save user readable type system shorthand of schema
const graphQLSchema = buildClientSchema(schemaJSON.data);
fs.writeFileSync(
	`${schemaPath}.graphql`,
	printSchema(graphQLSchema)
);

module.exports = babelRelayPlugin(schemaJSON.data, {
	abortOnError: true,
});