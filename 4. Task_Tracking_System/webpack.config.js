const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
	source: path.join(__dirname, "./src"),
	dist: path.resolve(__dirname, "./dist")
};

const devServer = {
	compress: true
};

module.exports = {
	devtool: "source-map",
	devServer: devServer,
	entry: [`${PATHS.source}/app.js`, `${PATHS.source}/app.scss`],
	output: {
		path: PATHS.dist,
		filename: "[name].bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["env"]
				}
			},
			{
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
			}
		]
	},
	plugins: [
		//new UglifyJSPlugin({}),	// minify js file
		new WriteFilePlugin(),
		new HtmlWebpackPlugin({
			template: "./index.html"
		}),
		new ExtractTextPlugin({
			filename: "[name].bundle.css",
			allChunks: true
		}),
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery",
			jquery: "jquery",
			Tether: "tether"
		})
	]
};
