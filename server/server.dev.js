require('babel-polyfill');
require('source-map-support').install();
require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
});
require('@babel/core').transform('code', {
    plugins: ['@babel/plugin-transform-runtime']
});
require('css-modules-require-hook')({
    extensions: ['.less'],
    processorOpts: { parser: require('postcss-less').parse },
    camelCase: true,
    generateScopedName: '[local]_[hash:base64:10]'
});
require('asset-require-hook')({
    name: '/[hash].[ext]',
    extensions: ['jpg', 'png', 'gif', 'webp'],
    limit: 8192
});

const fs = require('fs');
const path = require('path');
const views = require('koa-views');
const convert = require('koa-convert');
const webpack = require('webpack');
const config = require('../build/webpack.dev.config');
const compiler = webpack(config);
const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');
const app = require('./app.js').default;
const router = require('./routes').default;
const clientRoute = require('./middlewares/clientRoute').default;
const port = process.env.port || 3000;

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

app.use(convert(devMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath })));
app.use(convert(hotMiddleware(compiler)));

app.listen(port, () => {
    console.log(`\n==> open up http://localhost:${port}/ in your browser.\n`);
});

module.exports = app;
