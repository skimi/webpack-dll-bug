const webpack = require("webpack");

module.exports = () => {
  return {
    entry: {
      index: ["./src/index.js"]
    },
    output: {
      publicPath: 'dist',
    },
    mode: "production",
    optimization: {
      minimize: false,
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: ".",
        manifest: require("./dist/dll-manifest.json")
      })
    ]
  };
};
