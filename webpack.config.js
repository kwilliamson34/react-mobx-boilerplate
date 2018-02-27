const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//portal config
const proxyTarget = 'https://troy-localcontrol.sapientfirst.net';
const localhostPort = 8443;

module.exports = (env) => {
  const _env = env || 'prod';
  console.log('Built for the \x1b[34m' + _env + '\x1b[30m environment');

  //environments specific switches
  const showConsole = (_env != 'prod' && _env != 'uat' && _env != 'stage');

  if (process.env.npm_lifecycle_event === 'start') {
    return (merge(common, {
      entry: [
        'react-hot-loader/patch',
        // activate HMR for React

        `webpack-dev-server/client?https://localhost:${localhostPort}`,
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        './index.jsx'
      ],
      devtool: 'eval',
      devServer: {
        https: true,
        port: localhostPort,
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,

        contentBase: path.resolve(__dirname, 'build'),
        // match the output path

        publicPath: '/',
        proxy: {
          '/api': {
            target: proxyTarget,
            secure: false
          },
          '/oauth/validate': {
            target: proxyTarget,
            secure: false
          }
        }
      },
      resolve: {
        alias: {
          'config': path.join(__dirname, 'config/dev.endpoints.js')
        }
      },
      plugins: [new HtmlWebpackPlugin({template: './index.dev.ejs', hash: false})]
    }))
  } else {
    return (merge(common, {
      entry: [
        'babel-polyfill',
        // babel doesn't handle Promise by default
        // this enables promise polyfills for IE
        './index.jsx'
      ],
      resolve: {
        alias: {
          'config': path.join(__dirname, `config/${_env}.endpoints.js`)
        }
      },
      node: {
        console: showConsole,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      },
      plugins: [
        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
           test: /\.js$|\.css$|\.html$/,
           threshold: 10240,
           minRatio: 0.8
         })
       ]
    }))
  }
}
