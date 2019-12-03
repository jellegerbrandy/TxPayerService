const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  target: "node",
  optimization: {
    // We do not want to minimize our code.
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, "node_modules"),
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-transform-runtime"]
        }
      }
    ]
  },
  resolve: {
    alias: {
      // replace native `scrypt` module with pure js `scrypt-js`
      scrypt: "scrypt-js"
    }
  }
};
