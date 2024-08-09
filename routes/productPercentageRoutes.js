import express from 'express';
import { createProductPercentage } from '../controller/productPercentageController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createProductPercentage);

export default router;
