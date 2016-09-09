import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import convert from 'koa-convert';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';

import * as account from './controllers/account';
import * as articles from './controllers/articles';

const app = new Koa();

app.use(convert(session(app)));
app.use(convert(bodyParser()));
app.use(json());

const router = new Router();

router
  .get('/', articles.list)
  .get('/articles/:id', articles.show)
  .post('/articles', articles.create)
  .post('/signup', account.signup)
  .post('/signin', account.signin);

app.use(router.routes());

app.listen(8081, () => {
  console.log('listening on port 8081');
});
