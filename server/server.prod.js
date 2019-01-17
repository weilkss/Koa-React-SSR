import 'babel-polyfill';
import serve from 'koa-static';
import path from 'path';
import views from 'koa-views';
import app from './app';
import router from './routes';
import clientRoute from './middlewares/clientRoute';

const port = process.env.port || 3000;

app.use(views(path.resolve(__dirname, '../views'), { map: { html: 'ejs' } }));
app.use(serve(path.resolve(__dirname, '../dist/client')));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(clientRoute);
app.listen(port, () => {
    console.log(`Open up http://localhost:${port}/ in your browser.`);
});
