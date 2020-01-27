import Router from 'koa-router';
import datalize from 'datalize';
import Auth from '../controllers/auth';

const { field } = datalize;

const router = new Router();

router
  .post(
    '/login',
    datalize([
      field('password')
        .trim()
        .required()
        .minLength(7),
      field('email')
        .required()
        .email(),
    ]),
    Auth.authenticate
  )

  .post(
    '/registration',
    datalize([
      field('password')
        .trim()
        .required()
        .minLength(7),
      field('email')
        .required()
        .email(),
      field('userName')
        .trim()
        .required(),
    ]),
    Auth.create
  );

export default router;
