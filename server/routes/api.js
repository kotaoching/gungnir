import Router from 'koa-router';

import * as articles from '../controllers/articles';

function register(app) {
  const router = new Router({
    prefix: '/api'
  });

  router
    .get('/articles', articles.list)
    .get('/articles/:id', articles.show)
    .post('/articles', articles.create);

  app.use(router.routes());
  app.use(router.allowedMethods());
};

export default register;
