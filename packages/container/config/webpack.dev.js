const { merge } = require("webpack-merge"); //merge fct merges two webpack configs
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      //here, container must be set up as 'host' to the other apps
      name: "container",
      remotes: {
        //keys are the diff modules we try to require into our project - value is where that remote entry file is for that module
        marketing: "marketing@http://localhost:8081/remoteEntry.js", //from localhost8081 we want to load up the remoteEntry.js file
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); //listing devConfig second place: will overwrite similiar options we might have setup in commonConfig
