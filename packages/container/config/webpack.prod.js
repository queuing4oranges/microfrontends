const { merge } = require("webpack-merge");
const ModulFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN; //this env variable will contain string that says where prod is hostet

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", //when files are build for prod, they use this as template when naming the files - primarly done for caching issues
  },
  plugins: [
    new ModulFederationPlugin({
      name: "container", //not required to provide a name for a host module
      remotes: {
        //where to go to to get source code
        marketing: `marketing@${domain}/marketing/remoteEntry.js`, //assuming that marketing is nested inside folder
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
