const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpg|svg)$/,
        exclude: /node_modules/,
        use: ["url-loader"],
      },
    ],
  },
  devServer: {
    open: true,
    // see https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
    writeToDisk: true,
    // watches html files for changes too
    // see https://stackoverflow.com/a/47611506
    // see https://webpack.js.org/configuration/dev-server/#devserverwatchcontentbase
    watchContentBase: true,
    // see https://webpack.js.org/configuration/dev-server/#devserverwatchoptions-
    watchOptions: {
      ignored: /node_modules/,
    },
  },
};
