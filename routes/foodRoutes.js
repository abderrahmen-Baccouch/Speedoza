// routes/foodRoutes.js

import express from 'express';
import { createFood, getAllFoods } from '../controller/foodController.js';
import multer from 'multer';

import authMiddleware from '../middleware/authMiddleware.js';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

const router = express.Router();

router.post('/createFood', upload.array('photos', 2), createFood);
router.get('/getAllFoods', getAllFoods);

export default router;
