import express from 'express';
import * as budgetController from '../controllers/budgetController.js';
const router = express.Router();

router.post('/', budgetController.createBudget);
router.get('/', budgetController.getAllBudgets);

export default router;