import combineRouters from 'koa-combine-routers';
import rootRouter from './root';
import postsRouter from './posts';
import usersRouter from './users';
import authRouter from './auth';
import filesRouter from './files';

const router = combineRouters(rootRouter, postsRouter, usersRouter, authRouter, filesRouter);

export default router;
