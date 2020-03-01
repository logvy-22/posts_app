import Koa from 'koa';
import logger from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import bearerToken from 'koa-bearer-token';
import jwtMiddleware from 'koa-jwt';
import serve from 'koa-static';
import error from './middleware/error';
import router from './routes';

const app = new Koa();

app
  .use(logger('lite'))
  .use(serve('../public'))
  .use(
    bodyParser({
      multipart: true,
    })
  )
  .use(bearerToken())
  .use(error)
  .use(
    jwtMiddleware({ secret: process.env.JWT_SECRET }).unless({
      path: [/^\/auth/],
    })
  )
  .use(router())
  .listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
