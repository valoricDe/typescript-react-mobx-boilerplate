const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (paths, server, html) => {
	return {
		devtool: 'source-map',
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin(html),
		],
		devServer: {
			host: server.host,
			port: server.port,
			inline: true,
			contentBase: paths.build.path,
			proxyTable: {
				'/horizon': {
					target: 'ws://127.0.0.1:8181',
					changeOrigin: true,
					ws: true
				},
				'/horizon/*': {
					target: 'http://127.0.0.1:8181',
					changeOrigin: true
				}
			},
		},
	};
};