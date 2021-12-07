const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

module.exports = {
    mode: mode,
    entry: './src/index.js',
    output: {
        filename: (mode === 'production') ? '[name].js' : '[name].[contenthash].js',
        assetModuleFilename: (mode === 'production') ? 'images/[name][ext][query]' : 'images/[hash][ext][query]',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        clean: true,
    },
    devtool: mode != 'production' && 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                removeComments: mode === 'production',
                collapseWhitespace: mode === 'production',
            }
        }),
        new MiniCssExtractPlugin({
            filename: (mode === 'production') ? '[name].css' : '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: (mode === 'production') ? 'fonts/[name][ext][query]' : 'fonts/[hash][ext][query]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ],
    },
    devServer: {
        // hot: true,
        port: 9000,
        static: './dist',
    },
}