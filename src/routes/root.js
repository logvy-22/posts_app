import Router from 'koa-router';
import Root from '../controllers/root';

const router = new Router();

router.get('/', Root.getIndex);

export default router;
