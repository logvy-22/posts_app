import Users from '../models/users';

class UsersController {
  static async create(ctx) {
    ctx.status = 201;
    ctx.body = await Users.create(ctx.request.body);
  }

  static async delete(ctx) {
    await Users.delete(ctx.params.id);
  }
}

export default UsersController;
