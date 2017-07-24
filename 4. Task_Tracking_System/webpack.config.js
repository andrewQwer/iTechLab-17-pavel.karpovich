const webpack = require("webpack");
const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: "source-map",
	entry: ["./src/app.js", "./src/app.scss"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env"]
					}
				}
			},
			{
				// sass / scss loader for webpack
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
			}
		]
	},
	watch: true,
	plugins: [
		new ExtractTextPlugin({
			// define where to save the file
			filename: "[name].bundle.css",
			allChunks: true
		}),
		new BrowserSyncPlugin({
			host: "localhost",
			port: 3000,
			proxy: "http://localhost:8080/",
			files: ["./dist/*.js", "./dist/*.css", "./index.html"]
		}),
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery",
			jquery: "jquery",
			Tether: "tether"
		})
	]
};
