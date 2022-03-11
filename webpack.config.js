const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PROD = !IS_DEV

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    }

    if (IS_PROD) {
        config.minimizer = [new OptimizeCssAssetWebpackPlugin(), new TerserWebpackPlugin()]
    }

    return config
}

const filename = (ext) => (IS_DEV ? `[name].${ext}` : `${ext === 'css' ? 'css' : 'js'}/[name].[hash].${ext}`)

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        {
            loader: 'css-loader',
            options: {
                modules: {
                    mode: 'local',
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                },
            },
        },
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: '../public/index.html',
            minify: {
                collapseWhitespace: IS_PROD,
            },
            favicon: '../public/favicon.ico',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/favicon.ico'),
                    to: path.resolve(__dirname, 'build'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ]

    if (IS_PROD) {
        base.push(new BundleAnalyzerPlugin())
    }
    if (IS_DEV) {
        base.push(new webpack.HotModuleReplacementPlugin())
    }

    return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: {
        main: ['@babel/polyfill', './index.tsx'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png', '.jpg'],
        alias: {
            'components': path.resolve(__dirname, 'src/components'),
            types: path.resolve(__dirname, 'src/types'),
        },
    },
    optimization: optimization(),
    devServer: {
        port: 7001,
        hot: IS_DEV,
        historyApiFallback: true,
    },
    target: IS_DEV ? 'web' : 'browserslist',
    devtool: IS_DEV ? 'source-map' : false,
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        },
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [path.resolve(__dirname, 'src/styles/colors.scss')],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'img',
                    },
                },
            },
            { test: /\.(ts|tsx)$/, loader: 'ts-loader' },
        ],
    },
}
