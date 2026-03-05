import express from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getOrders)
  .post(protect, authorize('buyer'), createOrder);

router.route('/:id')
  .get(protect, getOrder);

router.put('/:id/status', protect, authorize('farmer', 'admin'), updateOrderStatus);
router.put('/:id/cancel', protect, authorize('buyer'), cancelOrder);

export default router;
