import express from 'express';
import * as transactionController from '../controllers/transactionController.js';
const router = express.Router();

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getAllTransactions);

export default router;