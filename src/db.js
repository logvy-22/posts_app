import mysql from 'promise-mysql';

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 100,
};

const pool = mysql.createPool(config);

export default pool;
