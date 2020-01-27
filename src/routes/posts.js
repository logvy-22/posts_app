import Router from 'koa-router';
import datalize from 'datalize';
import Posts from '../controllers/posts';

const { field } = datalize;

const router = new Router({ prefix: '/posts' });

router
  .get('/', Posts.getAll)

  .get(
    '/:id',
    datalize.params([
      field('id')
        .required()
        .int(),
    ]),
    Posts.getById
  )

  .post(
    '/',
    datalize([
      field('title')
        .trim()
        .required()
        .minLength(5),
      field('text')
        .trim()
        .required()
        .minLength(10),
      field('authorId')
        .required()
        .int(),
    ]),
    Posts.create
  )

  .put(
    '/:id',
    datalize.params([
      field('id')
        .required()
        .int(),
    ]),
    Posts.update
  )

  .delete(
    '/:id',
    datalize.params([
      field('id')
        .required()
        .int(),
    ]),
    Posts.delete
  );

export default router;
