import multer from '@koa/multer';
import path from 'path';
import appRoot from 'app-root-path';
import Files from '../models/files';

// Upload File Storage Path and File Naming
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(appRoot.path, '/public'));
  },
  filename(req, file, cb) {
    const type = file.originalname.split('.')[1];
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
  },
});

// File upload restrictions
const limits = {
  fileSize: 500 * 1024, // File Size Unit b
  files: 1, // Number of documents
};

const upload = multer({ storage, limits });

class FilesController {
  static async upload(ctx, next) {
    try {
      await upload.single('streamfile')(ctx, next);
    } catch (err) {
      ctx.throw(400, err.message);
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
      const posts = await Files.getAllPostFiles(ctx.params.id);
      ctx.body = posts;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static async getUserFiles(ctx) {
    try {
      const posts = await Files.getAllUserFiles(ctx.params.id);
      ctx.body = posts;
    } catch (err) {
      ctx.throw(err);
    }
  }

  static async attach(ctx) {
    const { body, file } = ctx.request;

    try {
      Files.add({ path: file.path, ...body });
      ctx.status = 200;
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
}

export default FilesController;
