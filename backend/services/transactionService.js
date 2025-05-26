import pool from '../db.js';

// On retire le champ budget (plus utilisé)
export const createTransaction = async (description, montant, type, date, categorie) => {
  const [result] = await pool.query(
    'INSERT INTO transactions (description, montant, type, date, categorie) VALUES (?, ?, ?, ?, ?)',
    [description, montant, type, date, categorie]
  );
  const [rows] = await pool.query('SELECT * FROM transactions WHERE id = ?', [result.insertId]);
  return rows[0];
};

// Récupère la transaction avec le nom de la catégorie associée et le montant du budget lié à la catégorie (si existe)
export const getAllTransactions = async () => {
  const [rows] = await pool.query(`
    SELECT 
      t.id, 
      t.description, 
      t.montant, 
      t.type, 
      t.date, 
      c.id AS categorie_id, 
      c.nom AS categorie_nom, 
      c.type AS categorie_type,
      b.id AS budget_id, 
      b.montant AS budget_montant, 
      b.periode AS budget_periode
    FROM transactions t
    LEFT JOIN categories c ON t.categorie = c.id
    LEFT JOIN budgets b ON b.categorie = c.id
    ORDER BY t.date DESC
  `);
  return rows;
};