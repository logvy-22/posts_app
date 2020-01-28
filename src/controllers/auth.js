import Users from '../models/users';

class AuthController {
  static async authenticate(ctx) {
    try {
      const isValid = await Users.authenticate(ctx.request.body);
      if (isValid) {
        throw new Error('Email or password is not correct');
      }
      ctx.status = 200;
    } catch (err) {
      ctx.throw(401, err.message);
    }
  }

  static async create(ctx) {
    ctx.status = 201;
    ctx.body = await Users.create(ctx.request.body);
  }
}
export default AuthController;
