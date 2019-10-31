const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');

const commonConfig = merge([
	{
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Webpack demo!',
			}),
		]
	},
	parts.loadCSS(),
	parts.loadSass()
]);

const productionConfig = merge([]);

const developmentConfig = merge([
	parts.devServer({
		host: process.env.HOST, // По умолчанию `localhost`
		//port: process.env.PORT = 4200, // по умолчанию 8080
		port: process.env.PORT, // по умолчанию 8080
	})
]);

module.exports = mode => {
	if (mode === "production") {
		return merge( commonConfig, productionConfig, {mode} );
	}
	return merge( commonConfig, developmentConfig, {mode} );
};