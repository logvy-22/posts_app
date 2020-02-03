import Router from 'koa-router';
import Auth from '../controllers/auth';

const router = new Router({ prefix: '/auth' });

router
  .post('/login', Auth.validate('authenticate'), Auth.authenticate)

  .post('/registration', Auth.validate('create'), Auth.create);

export default router;
