import * as categoryService from '../services/categoryService.js';

export const createCategory = async (req, res) => {
  const { nom, type } = req.body;
  if (!nom || !type) return res.status(400).json({ error: "Champs requis" });
  const category = await categoryService.createCategory(nom, type);
  res.status(201).json(category);
};

// Ajoute cette fonction pour GET toutes les catégories
export const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};