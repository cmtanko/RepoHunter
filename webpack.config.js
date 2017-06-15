let path = require ('path');

module.exports = {
  entry: './src/client/app.js',
  output: {
    path: path.join(__dirname, './public/admin/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.js$/, exclude: /node-modules/, loaders: ['babel-loader']},
      {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader', query: {name: 'fonts/[name].[ext]'}},
      {test: /\.(jpg|png)$/, loader: 'file-loader', query: {name: 'img/[name].[ext]'}},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'}
    ]
  }
}
