
import { Router } from 'express';
import { createCategory, updateCategory, deleteCategory,getAllCategories } from '../controller/categoryController.js';

const router = Router();

router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);



export default router;
