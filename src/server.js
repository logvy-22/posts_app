import Koa from 'koa';
import logger from 'koa-morgan';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = 'I am root!';
});

app
  .use(logger('lite'))
  .use(router.routes())
  .listen(3000, () => {
    console.log('listening on port 3000');
  });
