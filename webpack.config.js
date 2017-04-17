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
	entry: './src/index.jsx',
	output: {
		filename: 'js/bundle.[hash].js',
		path: path.resolve(__dirname, 'build')
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
					{loader: 'babel-loader'},
					{loader: 'eslint-loader'}
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
	          {loader: 'css-loader'},
	          {loader: 'sass-loader'},
						{loader: 'postcss-loader'},
						{loader: 'sass-loader'}
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
					path.resolve(__dirname, 'assets')
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
          template: 'index.ejs'
        })
  ],
	devServer: {
		port: 3030,
		historyApiFallback: true,
		proxy: {
			'/api/sauron': {
				target: 'http://mordor.me'
			}
		}
	}
};
