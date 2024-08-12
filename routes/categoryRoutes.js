
import { Router } from 'express';
import { createCategory, updateCategory, deleteCategory } from '../controller/categoryController.js';

const router = Router();

router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);


export default router;
