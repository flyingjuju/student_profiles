var path = require('path');

module.exports = {
  mode: 'development',
  watch: true,
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname,'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader:[ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['*','.js','.jsx']
  }
}