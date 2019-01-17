import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import compress from 'koa-compress';
import convert from 'koa-convert';
import cors from 'koa2-cors';

const app = new Koa();
app.use(convert(session(app)));
app.use(compress());
app.use(bodyParser());
app.use(cors());
app.use(json());
app.use(logger());

export default app;
