import * as transactionService from '../services/transactionService.js';

// Créer une transaction
export const createTransaction = async (req, res) => {
  try {
    const { description, montant, type, date, categorie } = req.body;
    if (!montant || !type || !date) {
      return res.status(400).json({ error: "Champs requis" });
    }
    const transaction = await transactionService.createTransaction(
      description, montant, type, date, categorie
    );
    res.status(201).json(transaction);
  } catch (err) {
    console.error("Erreur lors de la création de la transaction :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer toutes les transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
  } catch (err) {
    console.error("Erreur lors de la récupération des transactions :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};