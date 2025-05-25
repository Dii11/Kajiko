import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes d'authentification
app.use('/api', authRoutes);

// Routes utilisateurs (CRUD)
app.use('/api/users', userRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Serveur backend sur http://localhost:${PORT}`);
});