
import { Router } from 'express';
import { createCategory, updateCategory, deleteCategory } from '../controller/categoryController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/categories', authMiddleware, createCategory);
router.put('/categories/:id', authMiddleware, updateCategory);
router.delete('/categories/:id',authMiddleware, deleteCategory);


export default router;
