import path from 'path';

const fileFilter = (req, file, cb, filetypes) => {
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb(new Error(`File upload only supports the following filetypes - ${filetypes}`));
};

export default fileFilter;
