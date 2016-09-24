import Router from 'koa-router'

import * as users from '../api/users'
import * as articles from '../api/articles'
import * as comments from '../api/comments'

import { requireAuth } from '../utils/account'

function register(app) {
  const router = new Router({
    prefix: '/api'
  })

  router
    .get('/me', users.me)
    .get('/articles', articles.list)
    .get('/articles/:slug', articles.show)
    .post('/articles', articles.create)
    .put('/articles', requireAuth, articles.update)
    .get('/articles/:slug/comments', comments.list)
    .post('/articles/:slug/comments', comments.create)

  app.use(router.routes())
  app.use(router.allowedMethods())
}

export default register
