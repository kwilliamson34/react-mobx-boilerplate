const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const precss = require("precss");
const autoprefixer = require("autoprefixer");

// Set environment to prod; allowed ['dev','stage','prod']
const env = 'stage';

console.log('Built for the \x1b[34m' + env + '\x1b[30m environment');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: [
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
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'config': path.join(__dirname, `config/${env}.endpoints.js`)
		},
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
		new webpack.optimize.UglifyJsPlugin(), //minify everything
		new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
		new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/),

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
		}),

		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
};
