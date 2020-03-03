import Router from 'koa-router';
import datalize from 'datalize';
import Posts from '../controllers/posts';
import Files from '../controllers/files';

datalize.set('autoValidate', true);

const router = new Router({ prefix: '/posts' });

router
  .get('/', Posts.getAll)

  .get('/:id', Posts.validate('getById'), Posts.getById)

  .post('/', Posts.validate('create'), Posts.create)

  .post('/:id/attachFile', Files.validate('idInParams'), Files.uploadPostFile, Files.attachToPost)

  .delete('/deleteFile/:id', Files.validate('idInParams'), Files.deleteFromDB, Files.deleteFile)

  .delete('/:id', Posts.validate('delete'), Posts.delete);

export default router;
