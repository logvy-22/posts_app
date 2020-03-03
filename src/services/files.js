import multer from '@koa/multer';
import fs from 'fs';
import { usersStorage, postsStorage } from '../storage';
import fileFilter from '../helpers/fileFilter';

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

class FilesService {
  static uploadPostFile(ctx, next) {
    return uploadPostFile.single('file')(ctx, next);
  }

  static uploadUserFile(ctx, next) {
    return uploadUserImage.single('file')(ctx, next);
  }

  static deleteFile(path) {
    return fs.unlinkSync(path);
  }
}

export default FilesService;
