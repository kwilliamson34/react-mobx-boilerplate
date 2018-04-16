const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const precss = require("precss");
const autoprefixer = require("autoprefixer");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  output: {
		filename: 'js/bundle.[hash].js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/'
		// necessary for HMR to know where to load the hot update chunks
	},
  resolve: {
		extensions: ['.js', '.jsx']
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

    new webpack.ProvidePlugin({
			'jQuery': 'jquery',
			'$': 'jquery'
		}),

    new ExtractTextPlugin({
			filename: 'css/styles.[contenthash].css',
			disable: process.env.npm_lifecycle_event === 'start'
		}),

    new webpack.LoaderOptionsPlugin({
			test: /\.scss$/,
			debug: true,
			options: {
				context: path.join(__dirname, "src"),
				output: { path: path.join(__dirname, "build") }
			}
		})
  ]
};
