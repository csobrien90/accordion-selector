const path = require('path');

const config = (env) => {
	const mode = env.production ? 'production' : 'development';
	const watch = env.watch || false;

	return {
		mode,
		watch,
		entry: './src/scripts.ts',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'dist'),
		}
	}
}

module.exports = config;