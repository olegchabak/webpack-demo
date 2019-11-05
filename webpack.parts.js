const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCssPlugin = require("purifycss-webpack");

exports.devServer = ({host, port} = {}) => ({
	devServer: {
		// Отображать только ошибки, чтобы уменьшить количество вывода
		stats: 'errors-only',
		// Разбор хоста и порта из env для настройки
		// Если вы используете Docker, Vagrant или Cloud9, установите host: "0.0.0.0"
		// 0.0.0.0 доступен для всех сетевых устройств в отличие от `localhost` по умолчанию1
		host, // По умолчанию `localhost`
		//port: process.env.PORT = 4200
		port, // по умолчанию 8080
		open: true, // Открываем страницу в браузере
		overlay: true, // errors on overlay,
		contentBase: path.join(__dirname, 'dist'),
		compress: true
	}
});

exports.extractCSS = ({include, exclude, use = []}) => {
	const plugin = new MiniCssExtractPlugin({
		filename: "[name].css",
	});
	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					include,
					exclude,
					use: [
						MiniCssExtractPlugin.loader
					].concat(use),
				},
				{
					test: /\.s[ac]ss$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
				}
			]
		},
		plugins: [plugin],
	}
};

exports.loadCSS = ({include, exclude} = {}) => ({
	module: {
		rules: [
			{
				test: /\.css$/,
				include,
				exclude,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	}
});

exports.loadSass = () => ({
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	}
});

exports.purifyCSS = ({paths}) => ({
	plugins: [new PurifyCssPlugin({paths})]
});

exports.autoprefixer = () => ({
	loader: "postcss-loader",
	options: {
		plugins: () => [require("autoprefixer")()]
	}
});

exports.loadImages = ({include, exclude, options} = {}) => ({
	module: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				include,
				exclude,
				use: {
					loader: "url-loader",
					options,
				}
			},
			{
				test: /\.svg$/,
				include,
				exclude,
				use: "file-loader"

			}
		]
	}
});

exports.loadFonts = ({include, exclude, options} = {}) => ({
	module: {
		rules: [
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				include,
				exclude,
				use: {
					loader: "url-loader",
					options,
				}
			},
		]
	}
});

exports.loadJavaScript = ({include, exclude} = {}) => ({
	module: {
		rules: [
			{
				test: /\.js$/,
				include,
				exclude,
				use: 'babel-loader'
			}
		]
	}
});

exports.generateSourceMaps = ({type}) => ({
	devtool: type
});

