/**
 * Created by velten on 18.10.16.
 */
/*const express = require('express');
const postgraphql = require('../forks/postgraphql/build/postgraphql').postgraphql;

const app = express();

app.use(postgraphql('http://forum_example_postgraphql:xyz@localhost:5432/admin', 'public',
{
	'classicIds': true,
	'graphiql': true,
	'pgDefaultRole': 'forum_example_anonymous',
	'jwtSecret': 'myspecialunknowablesecret',
	'jwtPgTypeIdentifier': 'public.jwt_token',
	'enableCors': true,
	//'dynamicJson': true,
}));*/

// DEBUG="" ./scripts/dev -c http://admin:test1234@localhost:5432/admin --schema public --classic-ids --default-role forum_example_anonymous --secret myspecialunknowablesecret --token "public.jwt_token" --cors

//app.listen(5000, function (error) {
	/*if (error) {
		console.log("Unable to listen on port", port, error);
		return;
	}*/
	//console.log('PostGraphQL server started.');

	console.log(__dirname+'/misc/utils/createGraphQLSchema');
	var schema = require(__dirname+'/misc/utils/createGraphQLSchema');
	schema.schemaPromise.then(function (schema) {
		console.log('GraphQL schema '+(schema ? 'updated' : 'not updated')+'.');

		if(schema) {
			require(__dirname+'/misc/utils/graphqlToTS');
			console.log('Type definitions updated.');
		}
	});
//});