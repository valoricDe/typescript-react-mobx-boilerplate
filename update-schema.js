console.log(__dirname+'/misc/utils/createGraphQLSchema');
var schema = require(__dirname+'/misc/utils/createGraphQLSchema');
schema.schemaPromise.then(function (schema) {
	console.log('GraphQL schema '+(schema ? 'updated' : 'not updated')+'.');

	if(schema) {
		require(__dirname+'/misc/utils/graphqlToTS');
		console.log('Type definitions updated.');
	}
});