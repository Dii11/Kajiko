import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
<<<<<<< HEAD
import bcrypt from 'bcryptjs';
import cors from 'cors';
import bodyParser from 'body-parser';
import pool from './db.js';
import jwt from 'jsonwebtoken';
=======
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
>>>>>>> depense-budget

const app = express();
app.use(cors());
app.use(bodyParser.json());
<<<<<<< HEAD

// Ensure process.env is defined (for environments where 'process' is not available)
const SECRET = (typeof process !== 'undefined' && process.env && process.env.JWT_SECRET) ? process.env.JWT_SECRET : 'your_default_secret_here';

// Inscription
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Champs requis' });

  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) return res.status(409).json({ error: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Connexion
app.post('/api/login', async (req, res) => {
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

=======
app.use(express.json()); // Ajouté pour parser le corps des requêtes en JSON

// Routes d'authentification
app.use('/api', authRoutes);

// Routes utilisateurs (CRUD)
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
// Routes catégories (CRUD)
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);
>>>>>>> depense-budget
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Serveur backend sur http://localhost:${PORT}`);
});