import Router from 'koa-router';
import path from 'path';

import * as account from '../controllers/account';

function register(app) {
  const router = new Router();

  router
    .post('/signup', account.signup)
    .post('/signin', account.signin);

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
