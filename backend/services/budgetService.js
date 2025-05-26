import pool from '../db.js';

export const createBudget = async (categorie, montant, periode) => {
  const [result] = await pool.query(
    'INSERT INTO budgets (categorie, montant, periode) VALUES (?, ?, ?)',
    [categorie, montant, periode]
  );
  const [rows] = await pool.query('SELECT * FROM budgets WHERE id = ?', [result.insertId]);
  return rows[0];
};

export const getAllBudgets = async () => {
  const [rows] = await pool.query(`
    SELECT 
      budgets.id, 
      budgets.categorie AS categorie_id, 
      categories.nom AS categorie_nom, 
      categories.type AS categorie_type,
      budgets.montant, 
      budgets.periode
    FROM budgets
    JOIN categories ON budgets.categorie = categories.id
  `);
  return rows;
};