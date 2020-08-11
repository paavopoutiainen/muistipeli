var path = require('path');

module.exports = {

  //define entry point
  entry: "./src/client/js/script.js",

  //define output point
  output: {
    path: path.resolve(__dirname, 'src/client/js'),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }


}