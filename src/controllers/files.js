import multer from '@koa/multer';
import datalize from 'datalize';
import { usersStorage, postsStorage } from '../storage';
import Files from '../models/files';
import fileFilter from '../helpers/fileFilter';

const { field } = datalize;

// File upload restrictions
const limits = {
  fileSize: 500 * 1024,
  files: 1,
};

const filesWithImages = /jpg|png|jpeg|doc|docx|pdf/;
const images = /jpg|png|jpeg/;

const uploadPostFile = multer({
  storage: postsStorage,
  limits,
  fileFilter: (...arg) => fileFilter(...arg, filesWithImages),
});
const uploadUserImage = multer({
  storage: usersStorage,
  limits,
  fileFilter: (...arg) => fileFilter(...arg, images),
});

class FilesController {
  static async uploadPostFile(ctx, next) {
    try {
      await uploadPostFile.single('file')(ctx, next);
    } catch (err) {
      ctx.throw(400, err.message);
    }
  }

  static async uploadUserFile(ctx, next) {
    try {
      await uploadUserImage.single('file')(ctx, next);
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

  static async delete(ctx) {
    try {
      const posts = await Files.delete(ctx.params.id);
      ctx.body = posts;
    } catch (err) {
      ctx.throw(err);
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
