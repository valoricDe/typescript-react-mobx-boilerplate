const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const TARGET = process.env.npm_lifecycle_event;

const HTML = {
	title: 'typescript-react-mobx-boilerplate',
	renderId: 'root',
};

const PATHS = {
	misc: __dirname,
	scripts: path.join(__dirname, '../source/scripts'),
	styles: path.join(__dirname, '../source/styles'),
	build: path.join(__dirname, '../build'),
};

const common = {
	entry: [PATHS.scripts, PATHS.styles],
	output: {
		path: PATHS.build,
		filename: 'js/bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.scss'],
	},
	module: {
		loaders: [
			{
				test: /\.(tsx|ts)$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass']),
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/,
				loader: 'url-loader?limit=100000&name=./css/fonts/font-[hash].[ext]',
			},
			{
				test: /\.(png|svg)$/,
				loader: 'url-loader?limit=100000&name=./images/[ext]/img-[hash].[ext]',
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('css/style.css', {
			allChunks: true,
		}),
		new HtmlWebpackPlugin({
			title: HTML.title,
			favicon: `${PATHS.misc}/favicon.ico`,
			template: `${PATHS.misc}/template.ejs`,
			inject: 'body',
			renderId: HTML.renderId,
		}),
	],
};

if (TARGET === 'server') {
	module.exports = merge(common, {
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
		],
		devServer: {
			host: 'localhost',
			port: 8080,
			inline: true,
			contentBase: PATHS.build,
		},
	});
}

if (TARGET === 'dev-build') {
	module.exports = merge(common, {
		watch: true,
	});
}

if (TARGET === 'prod-build') {
	module.exports = merge(common, {
		postcss: [
			autoprefixer({
				browsers: ['last 2 versions'],
			}),
		],
		plugins: [
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production'),
				},
			}),
			new webpack.NormalModuleReplacementPlugin(
				/mobx-react-devtools/, 'empty-module'
			),
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
				},
				output: {
					comments: false,
				},
			}),
		],
	});
}
