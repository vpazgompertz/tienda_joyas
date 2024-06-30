import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  allowExitOnIdle: true,
});

pool.query('SELECT NOW()', (err,res)=>{
  res ? console.log('conectada DB', res.rows[0].now) : console.log({ err });
});

export { pool };