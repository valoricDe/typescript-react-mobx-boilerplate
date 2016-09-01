const merge = require('webpack-merge');

const {
	project,
	paths,
	server,
	html,
} = require('./settings');

const config = {
	base: require('./config/base'),
	dev: require('./config/dev'),
	prod: require('./config/prod'),
};

const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'server') {
	module.exports = merge(
		config.base(
			project,
			paths
		),
		config.dev(
			paths,
			server,
			html
		)
	);
} else if (TARGET === 'build') {
	module.exports = merge(
		config.base(
			project,
			paths
		),
		config.prod(
			html
		)
	);
}