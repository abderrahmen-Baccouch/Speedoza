import { Router } from 'express';
import { createClient, updateClient, deleteClient, getAllClients } from '../controller/clientController.js';
import authMiddleware from '../middleware/authMiddleware.js'; 

const router = Router();

router.post('/createClient', authMiddleware, createClient);
router.put('/updateClient/:id', authMiddleware, updateClient); 
router.delete('/deleteClient/:identifiant', authMiddleware, deleteClient); 
router.get('/getAllClients', authMiddleware, getAllClients);


export default router;
