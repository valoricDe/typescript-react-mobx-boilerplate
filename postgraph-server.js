/**
 * Created by velten on 18.10.16.
 */
const express = require('express');
const postgraphql = require('./vendor/postgraphql/build/postgraphql').postgraphql;

const app = express();

app.use(postgraphql('http://forum_example_postgraphql:xyz@localhost:5432/admin', 'public',
{
	'classicIds': true,
	'graphiql': true,
	'pgDefaultRole': 'forum_example_anonymous',
	'jwtSecret': 'myspecialunknowablesecret',
	'jwtPgTypeIdentifier': 'public.jwt_token',
	'enableCors': true
}));

app.listen(3000, function (error) {
	if (error) {
		console.log("Unable to listen on port", port, error);
		return;
	}
	console.log('PostGraphQL server started.');

	console.log(__dirname+'/misc/utils/createGraphQLSchema');
	var schema = require(__dirname+'/misc/utils/createGraphQLSchema');
	schema.schemaPromise.then(function (schema) {
		console.log('GraphQL schema '+(schema ? 'updated' : 'not updated')+'.');

		if(schema) {
			require(__dirname+'/misc/utils/graphqlToTS');
			console.log('Type definitions updated.');
		}
	});
});