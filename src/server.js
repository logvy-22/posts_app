import Koa from 'koa';
import logger from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import router from './routes';

const app = new Koa();

app
  .use(logger('lite'))
  .use(bodyParser())
  .use(router())
  .listen(3000, () => {
    console.log('listening on port 3000');
  });
