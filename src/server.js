import Koa from 'koa';
import logger from 'koa-morgan';
import Router from 'koa-router';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = 'I am root!';
});

console.log(process.env.DB_DATABASE);
app
  .use(logger('lite'))
  .use(router.routes())
  .listen(3000, () => {
    console.log('listening on port 3000');
  });
