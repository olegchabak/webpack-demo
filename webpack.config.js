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
	parts.setFreeVariable("HELLO", "hello from config")
]);

const productionConfig = merge([
	parts.clean(PATHS.build),
	parts.extractCSS({
		use: ['css-loader', parts.autoprefixer()]
	}),
	parts.purifyCSS({
		paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
	}),
	parts.loadImages({
		options: {
			limit: 10000,
			name: "./images/[name].[hash:4].[ext]"
		}
	}),
	parts.loadJavaScript({include: PATHS.app}),
	parts.generateSourceMaps({type: 'source-map'}),

	//это Настройка vendor комплекта
	{
		output: {
			path: PATHS.build,
			filename: "[name].[chunkhash:4].js",
			// изменить название чанка
			//chunkFilename: "chunk.[id].js"
			chunkFilename: "[name].[chunkhash:4].js"
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
			},
			runtimeChunk: {
				name: "manifest"
			}
		}
	},
	parts.minifyJavaScript(),
	parts.attachRevision(),
	parts.minifyCSS({
		options: {
			discardComments: {
				removeAll: true,
			},
			// Запустить cssnano в безопасном режиме, чтобы избежать
			// потенциально небезопасные преобразования
			safe: true
		}
	})
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