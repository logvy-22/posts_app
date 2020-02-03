import bcrypt from 'bcrypt';
import Db from '../db';

const { USERS_TABLE } = process.env;

class Users {
  static async getAll() {
    const [users] = await Db.query(`SELECT * FROM ${USERS_TABLE}`);
    return users;
  }

  static async getById(id) {
    const [user] = await Db.query(`SELECT * FROM ${USERS_TABLE} WHERE id=?`, [Number(id)]);
    return user[0];
  }

  static async getByEmail(email) {
    const [user] = await Db.query(`SELECT * FROM ${USERS_TABLE} WHERE email=?`, [email]);
    return user[0];
  }

  static async create(userData) {
    const hash = bcrypt.hashSync(userData.password, 10);
    const user = { ...userData, enabled: true, password: hash, roleId: 2 };
    await Db.query(`INSERT INTO ${USERS_TABLE} SET ?`, [user]);
    return user;
  }

  static async delete(id) {
    await Db.query(`DELETE FROM ${USERS_TABLE} WHERE id= ?`, [Number(id)]);
  }

  static async authenticate({ email, password }) {
    const userByEmail = await Users.getByEmail(email);

    if (!userByEmail || !bcrypt.compareSync(password, userByEmail.password)) {
      return false;
    }

    return userByEmail;
  }
}

export default Users;
