import combineRouters from 'koa-combine-routers';
import rootRouter from './root';
import postsRouter from './posts';
import usersRouter from './users';
import authRouter from './auth';

const router = combineRouters(rootRouter, postsRouter, usersRouter, authRouter);

export default router;
