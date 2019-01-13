const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');
module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${config.app.host}:${config.app.port}`,
    'webpack/hot/only-dev-server',
    'app/index.js'
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.(jpe?g|gif|png|wav|mp3|svg)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=static/fonts/[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'KLPQ 2018 React Seed'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  stats: 'errors-only',
  devtool: 'source-map',
  devServer: {
    hot: false,
    host: config.app.host,
    historyApiFallback: true,
    publicPath: '/',
    port: config.app.port,
    proxy: {
      '/api': {
        target: config.api.host,
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      app: path.resolve(__dirname, './app'),
      static: path.resolve(__dirname, './static')
    }
  },
  node: {
    fs: 'empty'
  },
  output: {
    filename: 'dev_bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist')
  }
};
