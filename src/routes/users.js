import Router from 'koa-router';
import datalize from 'datalize';
import Users from '../controllers/users';

const { field } = datalize;

const router = new Router({ prefix: '/users' });

router.delete(
  '/:id',
  datalize.params([
    field('id')
      .required()
      .int(),
  ]),
  Users.delete
);

export default router;
