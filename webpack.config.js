const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  context: path.join(__dirname),
  entry: "./src/js/main.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ['@babel/plugin-proposal-class-properties'],
          }
        }
      }
    ]
  },
  resolve: {
      extensions: ['.jsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
  ],
};
