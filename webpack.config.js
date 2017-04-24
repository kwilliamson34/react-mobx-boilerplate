const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.jsx',
	output: {
		filename: 'js/bundle.[hash].js',
		path: path.resolve(__dirname, 'build')
	},
	resolve: {
    extensions: ['.js', '.jsx']
  },
	devServer: {
		port:3030,
		historyApiFallback: true,
		hot: true,

		contentBase: path.resolve(__dirname, 'build'),
    // match the output path

		publicPath: '/',
		proxy: {
			'/api/sauron': {
				target: 'http://mordor.me'
			}
		}
	},
	module: {
		rules: [
			{
				test: require.resolve('jquery'),
				use: [
					{
						loader: 'expose-loader',
						options: 'jQuery'
					}
				]
			},
			{
				test: /\.jsx?$/,
				include: [
					path.resolve(__dirname, 'src')
				],
				use: [
					{ loader: 'babel-loader' },
					{ loader: 'eslint-loader' }
				]
			},
			{
				test: /\.scss$/,
				include: [
					path.resolve(__dirname, 'styles')
				],
				use: ExtractTextPlugin.extract({
					fallback: { loader: 'style-loader', options: { convertToAbsoluteUrls: false } },
					use: [
						{ loader: 'css-loader', options: { sourceMap: false } },
						{ loader: 'sass-loader', options: { sourceMap: false } }
					]
				})
			},
			{
				test: /\.png$/,
				include: [
					path.resolve(__dirname, 'images')
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(eot|woff2|woff|ttf|svg)$/,
				include: [
					path.resolve(__dirname, 'fonts')
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: '../',
							name: 'fonts/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'css/styles.[contenthash].css',
			disable: process.env.npm_lifecycle_event === 'start'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.ejs'
		})
	],
	devServer: {
		port: 3030,
		historyApiFallback: true,
		proxy: {
			'/api-services': {
				target: 'http://34.204.23.33'
			}
		}
	}
}
