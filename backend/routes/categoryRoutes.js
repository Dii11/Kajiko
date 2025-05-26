import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
const router = express.Router();

router.post('/', categoryController.createCategory);

// Ajoute la route GET pour récupérer toutes les catégories
router.get('/', categoryController.getAllCategories);

export default router;