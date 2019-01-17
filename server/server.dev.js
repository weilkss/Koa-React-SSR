require('babel-polyfill');
require('source-map-support').install();

require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports']
});

require('css-modules-require-hook')({
    extensions: ['.scss'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    generateScopedName: '[name]__[local]__[hash:base64:8]'
});

require('asset-require-hook')({
    name: '/[hash].[ext]',
    extensions: ['jpg', 'png', 'gif', 'webp'],
    limit: 8000
});

const app = require('./app.js'),
    convert = require('koa-convert'),
    webpack = require('webpack'),
    fs = require('fs'),
    path = require('path'),
    devMiddleware = require('koa-webpack-dev-middleware'),
    hotMiddleware = require('koa-webpack-hot-middleware'),
    views = require('koa-views'),
    router = require('./routes'),
    clientRoute = require('./middlewares/clientRoute'),
    config = require('../build/webpack.dev.config'),
    port = process.env.port || 3000,
    compiler = webpack(config);

compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets;
    let file, data;

    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key);
            data = assets[key].source();
            fs.writeFileSync(file, data);
        }
    });
    callback();
});

app.use(views(path.resolve(__dirname, '../views'), { map: { html: 'ejs' } }));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(clientRoute);

app.use(
    convert(
        devMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath
        })
    )
);

app.use(convert(hotMiddleware(compiler)));
app.listen(port, () => {
    console.log(`\n==> 🌎  Open up http://localhost:${port}/ in your browser.\n`);
});

module.exports = app;
