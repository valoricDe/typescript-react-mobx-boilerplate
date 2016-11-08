/**
 * Created by velten on 05.11.16.
 */
error = null
if (error) {
	console.log("Unable to listen on port", port, error);
	return;
}

console.log('PostGraphQL server started.');

var schema = require(__dirname+'/misc/utils/createGraphQLSchema');
console.log('GraphQL schema '+(schema ? 'updated' : 'not updated')+'.');

if(schema) {
	require(__dirname+'/misc/utils/graphqlToTS');
	console.log('Type definitions updated.');
}