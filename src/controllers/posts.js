import Posts from '../models/posts';

class PostsController {
  static async getAll(ctx) {
    ctx.body = await Posts.getAll();
  }

  static async getById(ctx) {
    const result = await Posts.getById(ctx.params.id);
    if (result) {
      ctx.body = result;
    } else {
      ctx.status = 204;
    }
  }

  static async create(ctx) {
    ctx.status = 201;
    ctx.body = await Posts.create(ctx.request.body);
  }

  static async update(ctx) {
    ctx.status = 204;
    ctx.body = await Posts.update(ctx.params.id, ctx.request.body);
  }

  static async delete(ctx) {
    const result = await Posts.delete(ctx.params.id);
    if (result) {
      ctx.status = 204;
      ctx.body = { success: true };
    } else {
      throw Error("Can't delete post");
    }
  }
}

export default PostsController;
