const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const precss = require("precss");
const autoprefixer = require("autoprefixer");

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	hotStatic: '/static/'
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: [
		'react-hot-loader/patch',
		// activate HMR for React

		'webpack-dev-server/client?http://localhost:3030',
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint

		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates

		'babel-polyfill',
		// babel doesn't handle Promise by default
		// this enables promise polyfills for IE
		'./index.jsx'
	],
	output: {
		filename: 'js/bundle.[hash].js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/'
		// necessary for HMR to know where to load the hot update chunks
	},
	devtool: 'eval',
	devServer: {
		port: 3030,
		historyApiFallback: true,
		hot: true,

		contentBase: path.resolve(__dirname, 'build'),
		// match the output path

		publicPath: '/',
		proxy: {
			'/api': {
				target: 'http://pse-qa.sapientfirst.net'
			}
		}
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
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
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader' },
						{ loader: 'sass-loader' },
						{ loader: 'postcss-loader' },
						{ loader: 'sass-loader' }
					]
				})
			},
			{
				test: /\.(png|svg)$/,
				include: [
					path.resolve(__dirname, 'images')
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: './',
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
		new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/),
		
		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.ProvidePlugin({
			'jQuery': 'jquery',
			'$': 'jquery'
		}),

		new ExtractTextPlugin({
			filename: 'css/styles.[contenthash].css',
			disable: process.env.npm_lifecycle_event === 'start'
		}),

		new HtmlWebpackPlugin({
			template: './index.ejs',
			hash: false
		}),

		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
		new webpack.LoaderOptionsPlugin({
			test: /\.scss$/,
			debug: true,
			options: {
				postcss: function () {
					return [precss, autoprefixer];
				},
				context: path.join(__dirname, "src"),
				output: { path: path.join(__dirname, "build") }
			}
		})
	]
};
