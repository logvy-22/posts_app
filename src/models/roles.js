import Db from '../db';

const { ROLES_TABLE } = process.env;

class Roles {
  static async getAll() {
    const [roles] = await Db.query(`SELECT * FROM ${ROLES_TABLE}`);
    return roles;
  }

  static async getById(id) {
    const [role] = await Db.query(`SELECT * FROM ${ROLES_TABLE} WHERE id=?`, [Number(id)]);
    return role[0];
  }
}

export default Roles;
