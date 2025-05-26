import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'your_default_secret_here';

// Inscription
router.post('/register', async (req, res) => {
  const { email, password, nom, prenom, telephone } = req.body;
  if (!email || !password || !nom || !prenom || !telephone) {
    return res.status(400).json({ error: 'Champs requis' });
  }

  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) return res.status(409).json({ error: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (email, password, nom, prenom, telephone) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, nom, prenom, telephone]
    );
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Champs requis' });

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'Identifiants invalides' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Identifiants invalides' });

    // Création du token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

    res.json({ message: 'Connexion réussie', token });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;