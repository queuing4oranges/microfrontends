const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN; //this env variable will contain string that says where prod is hostet

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", //when files are build for prod, they use this as template when naming the files - primarly done for caching issues
    publicPath: "/container/latest/", //is used any time you have some part of webpack that tries to refer to a file that has been build by webpack; whenever html plugin figures script tags out, it will take the filename and prepend them with publicPath
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container", //not required to provide a name for a host module
      remotes: {
        //where to go to to get source code
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`, //assuming that marketing is nested inside folder
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
