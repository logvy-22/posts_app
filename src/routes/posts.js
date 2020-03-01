import Router from 'koa-router';
import datalize from 'datalize';
import Posts from '../controllers/posts';

datalize.set('autoValidate', true);

const router = new Router({ prefix: '/posts' });

router
  .get('/', Posts.getAll)

  .get('/:id', Posts.validate('getById'), Posts.getById)

  .post('/', Posts.validate('create'), Posts.create)

  .put('/:id', Posts.validate('idInParams'), Posts.validate('update'), Posts.update)

  .delete('/:id', Posts.validate('delete'), Posts.delete);

export default router;
