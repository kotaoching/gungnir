import Router from 'koa-router';

import * as account from '../controllers/account';

function register(app) {
  const router = new Router();

  router
    .post('/signup', account.signup)
    .post('/signin', account.signin)
    .post('/signout', account.signout);

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
