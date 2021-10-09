import express from 'express';

import { 
    createUser,
    getUser, 
    updateUser, 
    deleteUser, 
    getAllUsers,
    getUserOrders,
    addUserOrder,
    getUserClients,
    addUserClient,
    transferOrder,
    deleteUserOrder,
    deleteUserClient,
    promoteUser,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();
// CRUD
router.get('/', auth, getAllUsers);
router.post('/', auth, createUser);
router.get('/:id', auth, getUser);
router.patch('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

// Adding an order to a user
router.get('/:id/orders', auth, getUserOrders);
router.post('/:id/orders', auth, addUserOrder);
router.delete('/:id/orders', auth, deleteUserOrder);

// Adding a client to a user
router.get('/:id/clients', auth, getUserClients);
router.post('/:id/clients', auth, addUserClient);
router.delete('/:id/clients', auth, deleteUserClient);

// Transferring an order
router.patch('/:id/transfer', auth, transferOrder);
router.patch('/:id/promote', auth, promoteUser);

export default router;

