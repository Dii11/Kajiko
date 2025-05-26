import pool from '../db.js';

export const createCategory = async (nom, type) => {
  const [result] = await pool.query(
    'INSERT INTO categories (nom, type) VALUES (?, ?)',
    [nom, type]
  );
  const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [result.insertId]);
  return rows[0];
};

export const getAllCategories = async () => {
  const [rows] = await pool.query('SELECT * FROM categories');
  return rows;
};

export const getCategoryById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0];
};

export const updateCategory = async (id, nom, type) => {
  await pool.query(
    'UPDATE categories SET nom = ?, type = ? WHERE id = ?',
    [nom, type, id]
  );
  const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0];
};

export const deleteCategory = async (id) => {
  await pool.query('DELETE FROM categories WHERE id = ?', [id]);
};