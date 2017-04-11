const path = require('path');
const webpack = require('webpack');

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	hotStatic: '/static/'
};

module.exports = {
	entry: './src/index.jsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [
					path.resolve(__dirname, 'src')
				],
				use: [
					{loader: 'babel-loader'},
					{loader: 'eslint-loader'}
				]
			},
			{
				test: /\.scss$/,
				include: [
					path.resolve(__dirname, 'styles')
				],
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{loader: 'sass-loader'}
				]
			},
			{
			    test: /\.(jpg|jpeg|gif|png)$/,
			    exclude: /node_modules/,
			    loader:'url-loader?limit=1024&name=images/[name].[ext]'
			},
			{
			    test: /\.(woff|woff2|eot|ttf|svg)$/,
			    exclude: /node_modules/,
			    loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
			}
		]
	},
	devServer: {
		port: 3030
	}
};