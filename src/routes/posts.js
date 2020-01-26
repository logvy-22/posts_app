import Router from 'koa-router';
import posts from '../models/posts';

const router = new Router({ prefix: '/posts' });

router
  .get('/', async ctx => {
    ctx.body = await posts.getAll();
  })

  .get('/:id', async ctx => {
    const result = await posts.getById(ctx.params.id);
    if (result) {
      ctx.body = result;
    } else {
      ctx.status = 204;
    }
  })

  .post('/', async ctx => {
    ctx.status = 201;
    ctx.body = await posts.create(ctx.request.body);
  })

  .put('/:id', async ctx => {
    ctx.status = 204;
    ctx.body = await posts.update(ctx.params.id, ctx.request.body);
  })

  .delete('/:id', async ctx => {
    ctx.status = 204;
    await posts.delete(ctx.params.id);
  });

export default router;
