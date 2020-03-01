import Router from 'koa-router';
import datalize from 'datalize';
import Users from '../controllers/users';

datalize.set('autoValidate', true);

const router = new Router({ prefix: '/users' });

router
  .get('/', Users.getAll)

  .get('/:id', Users.validate('getById'), Users.getById)

  .delete('/:id', Users.validate('delete'), Users.delete);

export default router;
