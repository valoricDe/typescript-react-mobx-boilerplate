const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (paths, server, html) => {
	return {
		devtool: 'cheap-module-source-map',
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
			// prints more readable module names in the browser console on HMR updates
			new HtmlWebpackPlugin(html),
		],
		devServer: {
			hot: true,
			host: server.host,
			port: server.port,
			contentBase: paths.build.path,
			historyApiFallback: true,
		},
	};
};