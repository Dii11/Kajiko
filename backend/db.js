import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',        // à adapter
  password: '',        // à adapter
  database: 'kajiko',
});

export default pool;