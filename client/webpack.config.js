const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { arrHtml, entry } = require('./webpack.html');
const devServer = require('./webpack.devServer');

module.exports = {
    mode: 'development',
    entry,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/[id]_bundle.js',
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.(css|sass|less|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            //表示当css-loader遇到import一个scss文件时，可以向前多使用一级loader来处理
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env'
                                    ],
                                ],
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'//使用这个预设，会根据浏览器来选择插件转化ES5
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|bmp)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1024
                    }
                },
                generator: {
                    filename: 'images/[contenthash][ext]'
                }
            },
            {
                test: /\.(woff|eot|ttf|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[contenthash][ext]'
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ],
        minimize: true
    },
    plugins: [
        ...arrHtml,
        new MiniCssExtractPlugin({
            filename: 'css/main_[id].css'
        })
    ],
    target: 'web',
    devServer
}