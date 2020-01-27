import Users from '../models/users';

class AuthController {
  static async authenticate(ctx) {
    ctx.body = await Users.authenticate(ctx.request.body);
  }

  static async create(ctx) {
    ctx.status = 201;
    ctx.body = await Users.create(ctx.request.body);
  }
}
export default AuthController;
