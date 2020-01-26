import combineRouters from 'koa-combine-routers';
import rootRouter from './root';
import postsRouter from './posts';

const router = combineRouters(rootRouter, postsRouter);

export default router;
