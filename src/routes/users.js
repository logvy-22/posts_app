import Router from 'koa-router';
import datalize from 'datalize';
import Users from '../controllers/users';
import Files from '../controllers/files';

datalize.set('autoValidate', true);

const router = new Router({ prefix: '/users' });

router
  .get('/', Users.getAll)

  .get('/:id', Users.validate('getById'), Users.getById)

  .post('/:id/attachFile', Files.validate('idInParams'), Files.uploadUserFile, Files.attachToUser)

  .delete('/:id', Users.validate('delete'), Users.delete);

export default router;
