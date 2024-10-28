const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/, // Обработка .js и .jsx файлов
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.scss$/, // Для SCSS
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'], // Теперь Webpack будет искать оба расширения
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
            new webpack.ProvidePlugin({
                "React": "react",
            }),
        ],
    }
}