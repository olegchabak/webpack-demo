const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');

const PATHS = {
	app: path.join(__dirname, 'src')
};

const commonConfig = merge([
	{
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Webpack demo!',
			}),
		]
	},
	//parts.loadCSS(),
	//parts.loadSass(),
	parts.loadFonts({
		options: {
			limit: 40000,
			name: "./fonts/[name].[ext]",
			publicPath: "./"
		}
	}),
]);

const productionConfig = merge([
	parts.clean(),
	parts.extractCSS({
		use: ['css-loader', parts.autoprefixer()]
	}),
	parts.purifyCSS({
		paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
	}),
	parts.loadImages({
		options: {
			limit: 10000,
			name: "./images/[name].[ext]"
		}
	}),
	parts.loadJavaScript({include: PATHS.app}),
	parts.generateSourceMaps({type: 'source-map'}),

	//это Настройка vendor комплекта
	{
		output: {
			// изменить название чанка
			chunkFilename: "chunk.[id].js"
		},
		optimization:{
			splitChunks:{
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						chunks: "initial"
					}
				}
			}
		}
	},
	parts.attachRevision()

]);

const developmentConfig = merge([
	parts.devServer({
		host: process.env.HOST, // По умолчанию `localhost`
		//port: process.env.PORT = 4200, // по умолчанию 8080
		port: process.env.PORT, // по умолчанию 8080
	}),
	parts.loadCSS(),
	parts.loadSass(),
	parts.loadImages(),
]);

module.exports = mode => {
	if (mode === "production") {
		return merge( commonConfig, productionConfig, {mode} );
	}
	return merge( commonConfig, developmentConfig, {mode} );
};