const webpack = require("webpack");

module.exports = () => {
  return {
    entry: {
      dll: ["./src/dll.js"]
    },
    output: {
      library: "[name]",
      publicPath: 'dist/',
    },
    mode: "production",
    optimization: {
      namedModules: true,
      minimize: false,
    },
    plugins: [
      new webpack.DllPlugin({
        path: "dist/[name]-manifest.json",
        name: "[name]"
      })
    ]
  };
};
