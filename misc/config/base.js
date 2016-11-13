const path = require('path');
const webpack = require('webpack');
const WebpackNotifier = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
			extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.scss'],
		},
		module: {
			loaders: [
				{
					test: /\.(js|tsx|ts)$/,
					exclude: [/node_modules/, /vendor/], // exlude also in tsconfig
					// transformation order is from down to up
					loaders: [
						'babel?'+JSON.stringify({
							presets: ['es2015', 'react', 'stage-0'],
							plugins: [babelRelayPlugin],
						}),
						'ts'],
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
					test: /\.(woff|woff2|eot|ttf)$/,
					loader: 'url?limit=100000&name=./css/fonts/font-[hash].[ext]',
				},
				{
					test: /\.(png|svg)$/,
					loader: 'url?limit=100000&name=./img/[ext]/img-[hash].[ext]',
				},
			],
		},
		plugins: [
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
