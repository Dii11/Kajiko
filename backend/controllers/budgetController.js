import * as budgetService from '../services/budgetService.js';

export const createBudget = async (req, res) => {
  const { categorie, montant, periode } = req.body;
  if (!categorie || !montant || !periode) {
    return res.status(400).json({ error: "Champs requis" });
  }
  const budget = await budgetService.createBudget(categorie, montant, periode);
  res.status(201).json(budget);
};

export const getAllBudgets = async (req, res) => {
  const budgets = await budgetService.getAllBudgets();
  res.json(budgets);
};