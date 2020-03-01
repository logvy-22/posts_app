import Router from 'koa-router';
import datalize from 'datalize';
import Files from '../controllers/files';

datalize.set('autoValidate', false);

const router = new Router({ prefix: '/files' });

router.post('/upload', Files.upload, Files.attach);

export default router;
