const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: ['./client', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
                    plugins: ['transform-runtime', 'add-module-exports'],
                    cacheDirectory: true
                }
            },
            {
                test: /\.(css|scss)$/,
                loaders: ['style', 'css?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]', 'sass']
            },
            {
                test: /\.(jpg|png|gif|webp)$/,
                loader: 'url?limit=8000'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'html?minimize=false'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
        new HtmlWebpackPlugin({
            filename: '../views/dev/index.html',
            template: './views/template/index.html'
        }),
        new ProgressBarPlugin({ summary: true })
    ]
};
