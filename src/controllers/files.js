import datalize from 'datalize';
import Files from '../models/files';
import FilesService from '../services/files';

const { field } = datalize;

class FilesController {
  static async uploadPostFile(ctx, next) {
    try {
      await FilesService.uploadPostFile(ctx, next);
    } catch (err) {
      ctx.throw(400, err.message);
    }
  }

  static async uploadUserFile(ctx, next) {
    try {
      await FilesService.uploadUserImage(ctx, next);
    } catch (err) {
      ctx.throw(400, err.message);
    }
  }

  static async attachToPost(ctx) {
    const { path } = ctx.request.file;

    try {
      Files.add({ path, postId: ctx.params.id });
      ctx.status = 200;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static async attachToUser(ctx) {
    const { path } = ctx.request.file;

    try {
      Files.add({ path, userId: ctx.params.id });
      ctx.status = 200;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static async getAll(ctx) {
    try {
      const posts = await Files.getAll();
      ctx.body = posts;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static async getPostFiles(ctx) {
    try {
      const posts = await Files.getPostFiles(ctx.params.id);
      ctx.body = posts;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static async getUserFiles(ctx) {
    try {
      const posts = await Files.getUserFiles(ctx.params.id);
      ctx.body = posts;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static async deleteFile(ctx) {
    try {
      FilesService.deleteFile(ctx.filePath);
      ctx.status = 204;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static async deleteFromDB(ctx, next) {
    try {
      const file = await Files.getById(ctx.params.id);
      if (!file) {
        throw new Error('File not found');
      }

      await Files.delete(ctx.params.id);

      ctx.filePath = file.path;
      next();
    } catch (err) {
      ctx.throw(400, err);
    }
  }

  static validate(method) {
    switch (method) {
      case 'idInParams':
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

export default FilesController;
