const babelRelayPlugin   = require('babel-relay-plugin');
const settings = require('../settings');
const schemaJSON = require(settings.graphql.schemaLocation.json);

module.exports = babelRelayPlugin(schemaJSON.data, {
	abortOnError: true,
});