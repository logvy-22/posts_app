import multer from '@koa/multer';
import path from 'path';
import appRoot from 'app-root-path';

const getStorageConfig = folderName =>
  multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(appRoot.path, `/public/${folderName}`));
    },
    filename(req, file, cb) {
      const type = file.originalname.split('.')[1];
      cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
    },
  });

export const usersStorage = getStorageConfig('users');
export const postsStorage = getStorageConfig('posts');
