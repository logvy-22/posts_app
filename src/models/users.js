import bcrypt from 'bcrypt';
import Db from '../db';

const { USERS_TABLE } = process.env;

class Users {
  static async create(userData) {
    const hash = bcrypt.hashSync(userData.password, 10);
    const user = { ...userData, enabled: true, password: hash, roleId: 2 };
    await Db.query(`INSERT INTO ${USERS_TABLE} SET ?`, [user]);
    return user;
  }

  static async delete(id) {
    await Db.query(`DELETE FROM ${USERS_TABLE} SET ?`, [Number(id)]);
  }

  static async authenticate({ email, password }) {
    const [userByEmail] = await Db.query(`SELECT password FROM ${USERS_TABLE} WHERE email=?`, [
      email,
    ]);

    if (!userByEmail[0] || !bcrypt.compareSync(password, userByEmail[0].password)) {
      throw new Error('Incorrect email or password');
    }

    return { status: 'success' };
  }
}

export default Users;
