const path = require('path');

const project = {
	title: 'politbase', // your awesome app title
	root: 'root', // root where your react app will be rendered
};

const paths = {
	misc: __dirname,
	node_modules: {
		path: path.join(__dirname, '../node_modules'),
	},
	sources: {
		path: path.join(__dirname, '../source'),
	},
	scripts: {
		path: path.join(__dirname, '../source/scripts'),
		file: 'index.tsx',
	},
	styles: {
		path: path.join(__dirname, '../source/styles'),
		file: 'index.scss',
	},
	build: {
		path: path.join(__dirname, '../build'),
		files: {
			script: 'js/bundle.js',
			style: 'css/style.css',
		},
	},
};

const server = {
	protocol: 'http',
	host: 'localhost',
	port: 7070,
};

const graphqlServer = {
	host: 'localhost',
	port: 5000,
	schemaLocation: {json: path.join(paths.misc, 'schema.json'), graphql: path.join(paths.misc, 'schema.graphql')},
};

const postgresServer = {
	host: 'localhost',
	port: '5432',
	user: 'admin',
	password: '1234',
	db: 'admin',
};

const html = {
	title: project.title,
	favicon: path.join(paths.misc, 'favicon.ico'),
	template: path.join(paths.misc, 'template.ejs'),
	inject: 'body',
	root: project.root,
};

module.exports.project = project;
module.exports.paths = paths;
module.exports.server = server;
module.exports.graphql = graphqlServer;
module.exports.postgres = postgresServer;
module.exports.html = html;