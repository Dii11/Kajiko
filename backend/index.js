import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json()); // Ajouté pour parser le corps des requêtes en JSON

// Routes d'authentification
app.use('/api', authRoutes);

// Routes utilisateurs (CRUD)
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
// Routes catégories (CRUD)
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Serveur backend sur http://localhost:${PORT}`);
});