import express from 'express'

import {createOrder, 
        getOrder, 
        updateOrder, 
        deleteOrder,
        productInOrder} from '../controllers/order.js';
 
const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.post("/:orderId/product/:productId", productInOrder);

export default router;