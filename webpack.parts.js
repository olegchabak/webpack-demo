const path = require('path');

exports.devServer = ({host, port} = {}) => ({
	devServer: {
		// Отображать только ошибки, чтобы уменьшить количество вывода
		stats: 'errors-only',
		// Разбор хоста и порта из env для настройки
		// Если вы используете Docker, Vagrant или Cloud9, установите host: "0.0.0.0"
		// 0.0.0.0 доступен для всех сетевых устройств в отличие от `localhost` по умолчанию
		host, // По умолчанию `localhost`
		//port: process.env.PORT = 4200
		port, // по умолчанию 8080
		open: true, // Открываем страницу в браузере
		overlay: true, // errors on overlay,
		contentBase: path.join(__dirname, 'dist'),
		compress: true
	}
});

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
