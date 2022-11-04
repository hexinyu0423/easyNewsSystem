const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { arrHTML, entry } = require('./webpack.html');
const devServer = require('./webpack.devServer');

const TerserPlugin = require('terser-webpack-plugin')

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
    // 如果没有这个设置项，则以生产模式打包时，会自动使用内置的优化方案来打包
    // 如果设置了这个选项，则webpack打包时会自动忽略默认选项
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
        minimize: true,
    },
    plugins: [
        ...arrHTML,
        new MiniCssExtractPlugin({
            filename: 'css/main_[id].css'
        })
    ],
    devServer
}