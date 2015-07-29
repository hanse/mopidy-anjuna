/*eslint-disable*/
var path = require('path');
var webpack = require('webpack');
var nib = require('nib');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
    publicPath: ''
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src') },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
    ]
  },
  stylus: {
    use: [nib()]
  }
}
