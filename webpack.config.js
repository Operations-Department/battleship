const path = require('path');

module.exports = {
  entry: './src/index.js',  //entry point
  output: {
    filename: 'bundle.js',  //output bundle
    path: path.resolve(__dirname, 'dist')  //output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,  //files to test
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  //transpile ES6+
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: 'development',  //*later* production
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000
  }
};
