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
	devServer: require('./config/dev-s'),
	prod: require('./config/prod'),
};

const TARGET = process.env.npm_lifecycle_event;

const base = config.base(
	project,
	paths
);

if (TARGET === 'watch') {
	module.exports = merge(
		base,
		config.dev(
			paths,
			server,
			html
		)
	);
} else if (TARGET === 'server') {
	module.exports = merge(
		base,
		config.devServer(
			paths,
			server,
			html
		)
	);
} else if (TARGET === 'build') {
	module.exports = merge(
		base,
		config.prod(
			html
		)
	);
}