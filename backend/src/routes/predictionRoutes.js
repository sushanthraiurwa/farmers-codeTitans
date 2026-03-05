import express from 'express';
import { getPricePrediction, getDemandHeatmap, getBuyerMatches } from '../services/predictionService.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/predictions/:crop', getPricePrediction);
router.get('/demand-heatmap', getDemandHeatmap);
router.get('/matching/buyers', protect, authorize('farmer'), getBuyerMatches);

export default router;
