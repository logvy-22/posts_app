import Db from '../db';

const { FILES_TABLE } = process.env;

class Files {
  static async getAll() {
    const [files] = await Db.query(`SELECT * FROM ${FILES_TABLE}`);
    return files;
  }

  static async getPostFiles(id) {
    const [files] = await Db.query(`SELECT * FROM ${FILES_TABLE} WHERE postId=?`, [Number(id)]);
    return files;
  }

  static async getUserFiles(id) {
    const [files] = await Db.query(`SELECT * FROM ${FILES_TABLE} WHERE userId=?`, [Number(id)]);
    return files;
  }

  static async add(file) {
    await Db.query(`INSERT INTO ${FILES_TABLE} SET ?`, [file]);
  }

  static async delete(id) {
    await Db.query(`DELETE FROM ${FILES_TABLE} WHERE id=?`, [Number(id)]);
  }
}

export default Files;
