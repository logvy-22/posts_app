import jwt from 'jsonwebtoken';
import datalize from 'datalize';
import Users from '../models/users';

const { field } = datalize;

class AuthController {
  static async authenticate(ctx) {
    const user = await Users.authenticate(ctx.form);
    if (!user) {
      ctx.throw(403, 'Email or password is not correct');
    }

    ctx.status = 200;
    ctx.body = {
      token: jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_SECRET),
    };
  }

  static async create(ctx) {
    try {
      const user = await Users.create(ctx.form);
      ctx.status = 201;
      ctx.body = user;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static validate(method) {
    switch (method) {
      case 'authenticate':
        return datalize([
          field('password')
            .trim()
            .required()
            .minLength(7),
          field('email')
            .required()
            .email(),
        ]);
      case 'create':
        return datalize([
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
        ]);
      default:
    }

    return null;
  }
}
export default AuthController;
