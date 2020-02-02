import Koa from 'koa';
import logger from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import jwtMiddleware from 'koa-jwt';
import error from './middleware/error';
import router from './routes';

const app = new Koa();

app
  .use(logger('lite'))
  .use(bodyParser())
  .use(error)
  .use(
    jwtMiddleware({ secret: process.env.JWT_SECRET }).unless({
      path: [/^\/auth/],
    })
  )
  .use(router())
  .listen(3000, () => {
    console.log('listening on port 3000');
  });
