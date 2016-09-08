import Koa from 'koa';
import Router from 'koa-router';
import session from 'koa-session';
import convert from 'koa-convert';

const app = new Koa();
const router = new Router();

router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello Koa';
  })
  .get('/articles', (ctx, next) => {
    ctx.body = 'articles';
  });

app.use(router.routes());
app.use(convert(session(app)));

app.listen(8081, () => {
  console.log('listening on port 8081');
});
