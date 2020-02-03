import Router from 'koa-router';
import Users from '../controllers/users';

const router = new Router({ prefix: '/users' });

router
  .get('/', Users.getAll)

  .get('/:id', Users.validate('getById'), Users.getById)

  .delete('/:id', Users.validate('delete'), Users.delete);

export default router;
