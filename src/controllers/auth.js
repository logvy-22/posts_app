import jwt from 'jsonwebtoken';
import Users from '../models/users';

class AuthController {
  static async authenticate(ctx) {
    const user = await Users.authenticate(ctx.request.body);
    if (!user) {
      const error = new Error('Email or password is not correct');
      error.status = 403;
      throw error;
    }
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET),
    };
  }

  static async create(ctx) {
    ctx.status = 201;
    ctx.body = await Users.create(ctx.request.body);
  }
}
export default AuthController;
