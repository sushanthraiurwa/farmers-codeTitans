import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  upload
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, authorize('farmer'), createProduct);

router.route('/:id')
  .get(getProduct)
  .put(protect, authorize('farmer', 'admin'), updateProduct)
  .delete(protect, authorize('farmer', 'admin'), deleteProduct);

router.post('/:id/upload', 
  protect, 
  authorize('farmer', 'admin'), 
  upload.array('images', 5), 
  uploadProductImages
);

export default router;
