import pool from '../db.js';

export const getAllUsers = async () => {
  const { rows } = await pool.query('SELECT id, email FROM users');
  return rows;
};

export const getUserById = async (id) => {
  const { rows } = await pool.query('SELECT id, email FROM users WHERE id = $1', [id]);
  return rows[0];
};

export const createUser = async (email, password) => {
  const { rows } = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
    [email, password]
  );
  return rows[0];
};

export const updateUser = async (id, nom, prenom, email, telephone) => {
  await pool.query(
    'UPDATE users SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id = ?',
    [nom, prenom, email, telephone, id]
  );
  const [rows] = await pool.query('SELECT id, nom, prenom, email, telephone FROM users WHERE id = ?', [id]);
  return rows[0];
};

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT id, email, nom, prenom, telephone FROM users WHERE email = ?', [email]);
  return rows[0];
};