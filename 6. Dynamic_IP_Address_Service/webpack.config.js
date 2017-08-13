const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
	source: path.join(__dirname, "./src"),
	dist: path.resolve(__dirname, "./dist")
};

const devServer = {
	historyApiFallback: true,
}

module.exports = {
	devtool: "source-map",
	devServer: devServer,
	entry: ["babel-polyfill", `${PATHS.source}/index.js`, `${PATHS.source}/index.scss`],
	output: {
		path: PATHS.dist,
		filename: "[name].bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: {
					presets: ["es2015", "stage-0", "react"]
				}
			},
			{
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
			}
		]
	},
	plugins: [
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
