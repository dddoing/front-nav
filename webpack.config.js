const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
    entry: "./src/index",
    mode: "development",
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 3003,
    },
    output: {
        publicPath: "http://localhost:3003/", //
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "Navigation", //domain name
            library: {type: "var", name: "Navigation"},
            filename: "remoteEntry.js", //bundle
            exposes: { //외부연결
                './Navigation': "./src/Component/Navigation/Container"
            },
            shared: {
                ...deps,
                "@material-ui/core":{singleton: true, strictVersion: true, eager: true},
                "react": {singleton: true, strictVersion: true, eager: true},
                "react-dom": {singleton: true, strictVersion: true, eager: true},
                "react-router-dom": {singleton: true, strictVersion: true, eager: true}
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};