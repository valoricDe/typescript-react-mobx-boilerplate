const path = require('path');
const webpack = require('webpack');
const WebpackNotifier = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { CheckerPlugin } = require('awesome-typescript-loader');
const babelRelayPlugin = path.join(__dirname, '../utils/babel-relay-plugin');

module.exports = (project, paths) => {
	return {
		entry: [
			path.join(paths.scripts.path, paths.scripts.file),
			path.join(paths.styles.path, paths.styles.file),
		],
		output: {
			path: paths.build.path,
			filename: paths.build.files.script,
			publicPath: '/',
		},
		resolve: {
			extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.scss'],
		},
		module: {
			loaders: [
				{
					test: /\.(js|tsx|ts)$/,
					exclude: [/node_modules/, /build/, /misc/, /vendor/, /data/, /__test__/], // exlude also in tsconfig
					// transformation order is from down to up
					loaders: [
						'babel?'+JSON.stringify({
							presets: ['es2015', 'react', 'stage-0'],
							plugins: [babelRelayPlugin],
						}),
						'awesome-typescript-loader'],
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract('style', [
						'css',
						'postcss',
						'sass?'+JSON.stringify({
							precision: 8
						})
					]),
				},
				{
					test: /plugin\.css$/,
					loaders: ['style', 'css'],
				},
				{
					test: /mention.*\.css$/,
					loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=draftJsMentionPlugin__[local]__[hash:base64:5]!postcss-loader'),
				},
				{
					test: /\.(woff|woff2|eot|ttf)(\?.*)?$/,
					loader: 'url?limit=100000&name=./css/fonts/font-[hash].[ext]',
				},
				{
					test: /\.(png|svg)$/,
					loader: 'url?limit=100000&name=./img/[ext]/img-[hash].[ext]',
				},
			],
		},
		plugins: [
			new CheckerPlugin(),
			new ExtractTextPlugin(paths.build.files.style, {
				allChunks: true,
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
