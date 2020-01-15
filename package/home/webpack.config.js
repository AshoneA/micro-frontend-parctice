const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'home.js',
    library: 'home',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      { parser: { System: false } },
      {
        // Webpack style loader added so we can use materialize
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      },
      {
        // This plugin will allow us to use AngularJS HTML templates
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  plugins: [
    // A webpack plugin to remove/clean the output folder before building
    new CleanWebpackPlugin()
  ],
  devtool: 'source-map',
  externals: ['react', 'react-dom', 'single-spa-react'],
  devServer: {
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};
