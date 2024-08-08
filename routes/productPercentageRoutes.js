import express from 'express';
import { createProductPercentage, getProductPercentages, getProductPercentageById, updateProductPercentage, deleteProductPercentage } from '../controller/productPercentageController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createProductPercentage);
router.get('/', authMiddleware, getProductPercentages);
router.get('/:id', authMiddleware, getProductPercentageById);
router.put('/:id', authMiddleware, updateProductPercentage);
router.delete('/:id', authMiddleware, deleteProductPercentage);

export default router;
