const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const path = require("path");

const data = require("./package.json");

module.exports = {
  entry: {},
  mode: "development",
  devtool: false,
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3003,
  },
  output: {
    publicPath: "http://localhost:3003/",
    filename: "[name].[chunkhash].js",
    library: {
      type: "var",
      name: "LIBRARY_NAME",
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /provider/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "MODULE_FEDERATION_NAME",
      library: {
        type: "var",
        name: "LIBRARY_NAME",
      },
      filename: "remoteEntry.js",
      exposes: {
        "./ENTRY_POINT": `./${path.join(data.main)}`,
      },
      shared: {
        [data.name]: {
          // shareKey: "module-federation-share-self",
          requiredVersion: data.version,
          version: data.version,
          singleton: true,
          // value pulled from package.json, the main package entry point
          import: `./${path.join(data.main)}`,
        },
        [`${data.name}/otherimport`]: {
          requiredVersion: data.version,
          version: data.version,
          import: "./otherimport",
        },
      },
    }),
  ],
};
