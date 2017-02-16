const path = require('path');
const webpack = require('webpack');
const WebpackNotifier = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const server = require('../settings').server;
const babelRelayPlugin = path.join(__dirname, '../utils/babel-relay-plugin');

module.exports = (project, paths) => {
	return {
		entry: [
			'react-hot-loader/patch',
			// activate HMR for React

			'webpack-dev-server/client?'+server.protocol+'://'+server.host+':'+server.port,
			// bundle the client for webpack-dev-server
			// and connect to the provided endpoint

			'webpack/hot/only-dev-server',
			// bundle the client for hot reloading
			// only- means to only hot reload for successful updates

			path.join(paths.scripts.path, paths.scripts.file),
			path.join(paths.styles.path, paths.styles.file),
		],
		output: {
			filename: paths.build.files.script,
			path: paths.build.path,
			publicPath: '/',
		},
		resolve: {
			extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.scss', '.woff', '.woff2', '.eot', '.ttf'],
		},
		module: {
			rules: [
				{
					test: /\.(tsx|ts)$/,
					exclude: [/node_modules/, /build/, /misc/, /vendor/, /data/, /__test__/], // exlude also in tsconfig
					// transformation order is from down to up
					use: [
						{
							loader: 'babel',
							options: {
								presets: ['es2015', 'react', 'stage-0'],
								plugins: [babelRelayPlugin]
							}
						},
						{
							loader: 'awesome-typescript-loader'
						},
					]
				},
				{
					test: /\.(jsx|js)$/,
					exclude: [/node_modules/, /build/, /misc/, /vendor/, /data/, /__test__/], // exlude also in tsconfig
					// transformation order is from down to up
					use: [
						{
							loader: 'babel',
							options: {
								presets: ['es2015', 'react', 'stage-0'],
								plugins: [babelRelayPlugin],
							}
						}
					],
				},
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							{
								loader: 'css-loader'
							},
							{
								loader: 'postcss-loader'
							},
							{
								loader: 'sass',
								options: {
									precision: 8
								}
							}
						]
					})
				},
				{
					test: /plugin\.css$/,
					use: ['style', 'css'],
				},
				{
					test: /mention.*\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							{
								loader: 'css-loader',
								options: {
									modules: true,
									importLoaders: 1,
									localIdentName: 'draftJsMentionPlugin__[local]__[hash:base64:5]',
								}
							},
							{
								loader: 'postcss-loader'
							},
						]
					})
				},
				{
					test: /\.(woff|woff2|eot|ttf)(\?.*)?$/,
					loader: 'url',
					options: {
						limit: 100000,
						name: './css/fonts/font-[hash].[ext]',
					}
				},
				{
					test: /\.(png|svg)$/,
					loader: 'url',
					options: {
						limit: 100000,
						name: './img/[ext]/img-[hash].[ext]',
					}
				},
			],
		},
		resolveLoader: {
			moduleExtensions: ["-loader"]
		},
		plugins: [
			new CheckerPlugin(),
			new ExtractTextPlugin({
				    filename: paths.build.files.style,
		    allChunks: true
	  }),
			new webpack.DefinePlugin({
				'process.env': {
					root: JSON.stringify(project.root),
				},
			}),
			new WebpackNotifier({
				title: project.title,
			}),
		],
	};
};
