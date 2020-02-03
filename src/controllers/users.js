import jwt from 'jsonwebtoken';
import datalize from 'datalize';
import Users from '../models/users';
import Roles from '../models/roles';

const { field } = datalize;

class UsersController {
  static async getAll(ctx) {
    const { id } = jwt.verify(ctx.request.token, process.env.JWT_SECRET);
    const user = await Users.getById(id);
    const role = await Roles.getById(user.roleId);

    if (role.name !== 'admin') {
      ctx.throw(403, "You don't have permission to access");
    }

    try {
      const users = await Users.getAll();
      ctx.body = users;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static async getById(ctx) {
    const user = await Users.getById(ctx.params.id);
    if (user) {
      ctx.body = user;
      return;
    }
    ctx.status = 204;
  }

  static async delete(ctx) {
    const { id } = jwt.verify(ctx.request.token, process.env.JWT_SECRET);

    const isOwner = id === ctx.params.id;
    if (!isOwner) {
      const user = await Users.getById(id);
      const role = await Roles.getById(user.roleId);
      if (role.name !== 'admin') {
        ctx.throw(403, "You don't have permission to access");
      }
    }

    try {
      await Users.delete(ctx.params.id);
      ctx.status = 204;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static validate(method) {
    switch (method) {
      case 'getById':
      case 'delete':
        return datalize.params([
          field('id')
            .required()
            .int(),
        ]);
      default:
    }

    return null;
  }
}

export default UsersController;
