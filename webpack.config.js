const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: 'app.min.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer:{
    port: 7777
  },
  plugins: [HtmlWebpackPluginConfig]
}
