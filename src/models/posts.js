import Db from '../db';

const { POSTS_TABLE } = process.env;

class Posts {
  static async getAll() {
    const [result] = await Db.query(`SELECT * FROM ${POSTS_TABLE}`);
    return result;
  }

  static async getById(id) {
    const [posts] = await Db.query(`SELECT * FROM ${POSTS_TABLE} WHERE id=?`, [Number(id)]);
    return posts[0];
  }

  static async create(post) {
    await Db.query(`INSERT INTO ${POSTS_TABLE} SET ?`, [post]);
    return post;
  }

  static async update(id, post) {
    await Db.query(`UPDATE ${POSTS_TABLE} SET ? WHERE id=?`, [post, Number(id)]);
    return post;
  }

  static async delete(id) {
    await Db.query(`DELETE FROM ${POSTS_TABLE} WHERE id=?`, [Number(id)]);
  }
}

export default Posts;
