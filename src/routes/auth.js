import Router from 'koa-router';
import datalize from 'datalize';
import Auth from '../controllers/auth';

datalize.set('autoValidate', true);

const router = new Router({ prefix: '/auth' });

router
  .post('/login', Auth.validate('authenticate'), Auth.authenticate)

  .post('/registration', Auth.validate('create'), Auth.create);

export default router;
