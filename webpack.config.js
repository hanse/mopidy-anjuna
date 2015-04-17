var webpack = require('webpack');
var nib = require('nib');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.styl']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: 'node_modules' },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
    ]
  },
  stylus: {
    use: [nib()]
  }
}
