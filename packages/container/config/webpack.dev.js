const { merge } = require("webpack-merge"); //merge fct merges two webpack configs
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
  },
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
        auth: "auth@http://localhost:8082/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); //listing devConfig second place: will overwrite similiar options we might have setup in commonConfig
