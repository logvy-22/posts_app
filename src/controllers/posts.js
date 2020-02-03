import datalize from 'datalize';
import Posts from '../models/posts';

const { field } = datalize;

class PostsController {
  static async getAll(ctx) {
    try {
      const posts = await Posts.getAll();
      ctx.body = posts;
    } catch (err) {
      ctx.throw(err);
    }
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
    try {
      const post = await Posts.create(ctx.form);
      ctx.status = 201;
      ctx.body = post;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static async update(ctx) {
    try {
      const post = await Posts.update(ctx.params.id, ctx.form);
      ctx.status = 204;
      ctx.body = post;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static async delete(ctx) {
    try {
      await Posts.delete(ctx.params.id);
      ctx.status = 204;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static validate(method) {
    switch (method) {
      case 'delete':
      case 'getById':
      case 'idInParams':
        return datalize.params([
          field('id')
            .required()
            .int(),
        ]);
      case 'update':
        return datalize([
          field('title')
            .trim()
            .required()
            .minLength(5),
          field('text')
            .trim()
            .required()
            .minLength(10),
        ]);
      case 'create':
        return datalize([
          field('title')
            .trim()
            .required()
            .minLength(5),
          field('text')
            .trim()
            .required()
            .minLength(10),
          field('authorId')
            .required()
            .int(),
        ]);
      default:
    }

    return null;
  }
}

export default PostsController;
