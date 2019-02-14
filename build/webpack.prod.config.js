const path = require('path');
const fs = require('fs');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
        mode: 'development',
        stats: 'none',
        devtool: 'eval-source-map',
        context: path.resolve(__dirname, '..'),
        entry: {
            bundle: './client'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'js/[chunkhash:8].[name].js',
            chunkFilename: 'js/chunk.[chunkhash:8].js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                },
                {
                    test: /\.(css|less)$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } },
                        { loader: 'less-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } }
                    ]
                },
                { test: /\.(png|jpg|gif|webp)$/, use: [{ loader: 'url-loader', options: { limit: 8192 } }] },
                { test: /\.json$/, loader: 'json-loader' },
                { test: /\.html$/, loader: 'html-loader' }
            ]
        },
        plugins: [
            new ProgressBarPlugin({ summary: true }),
            new MiniCssExtractPlugin({
                filename: 'css/[contenthash:8].[name].css'
            }),
            new HtmlWebpackPlugin({
                filename: './views/index.html',
                template: './views/template.html',
                chunksSortMode: 'none'
            })
        ]
    },
    {
        stats: 'none',
        context: path.resolve(__dirname, '..'),
        entry: {
            server: './server/server.prod.js'
        },
        output: {
            path: path.resolve(__dirname, '../dist/server'),
            filename: '[name].js',
            chunkFilename: 'chunk.[name].js'
        },
        target: 'node',
        node: {
            __filename: true,
            __dirname: true
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                },
                {
                    test: /\.(css|less)$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'isomorphic-style-loader' },
                        { loader: 'css-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } },
                        { loader: 'less-loader', options: { modules: true, localIdentName: '[local]_[hash:base64:10]' } }
                    ]
                },
                { test: /\.(png|jpg|gif|webp)$/, use: [{ loader: 'url-loader', options: { limit: 8192 } }] }
            ]
        },
        externals: fs
            .readdirSync(path.resolve(__dirname, '../node_modules'))
            .filter(filename => !filename.includes('.bin'))
            .reduce((externals, filename) => {
                externals[filename] = `commonjs ${filename}`;
                return externals;
            }, {}),

        plugins: [new ProgressBarPlugin({ summary: true })]
    }
];
