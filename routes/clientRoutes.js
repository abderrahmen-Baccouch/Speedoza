import { Router } from 'express';
import { createClient, updateClient, deleteClient, getAllClients } from '../controller/clientController.js';

const router = Router();

router.post('/createClient', createClient);
router.put('/updateClient/:id', updateClient);
router.delete('/deleteClient/:id', deleteClient);
router.get('/getAllClients', getAllClients);


export default router;
