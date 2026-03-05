import axios from 'axios';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Predict crop prices based on historical data and trends
// @route   GET /api/predictions/:crop
// @access  Public
export const getPricePrediction = async (req, res, next) => {
  try {
    const { crop } = req.params;
    const { location } = req.query;

    // Mock prediction data (in production, this would use real ML models)
    const predictions = {
      tomato: {
        currentPrice: 45,
        predictedPrice: 52,
        trend: 'up',
        confidence: 85,
        timeframe: '7 days',
        factors: ['High demand', 'Seasonal shortage', 'Weather conditions'],
        recommendation: 'Hold for 5-7 days for better prices'
      },
      potato: {
        currentPrice: 28,
        predictedPrice: 32,
        trend: 'up',
        confidence: 72,
        timeframe: '14 days',
        factors: ['Festival season demand', 'Storage costs'],
        recommendation: 'Sell now or store for festival season'
      },
      onion: {
        currentPrice: 35,
        predictedPrice: 33,
        trend: 'down',
        confidence: 68,
        timeframe: '10 days',
        factors: ['Good harvest', 'Increased supply'],
        recommendation: 'Sell quickly before price drops further'
      }
    };

    const prediction = predictions[crop.toLowerCase()];
    
    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: 'No prediction data available for this crop'
      });
    }

    // Get real market data if available
    const recentProducts = await Product.find({
      name: { $regex: crop, $options: 'i' },
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).sort({ createdAt: -1 });

    const avgPrice = recentProducts.length > 0 
      ? recentProducts.reduce((sum, p) => sum + p.price, 0) / recentProducts.length 
      : prediction.currentPrice;

    // Update prediction with real data
    prediction.currentPrice = Math.round(avgPrice);
    prediction.marketData = {
      totalListings: recentProducts.length,
      avgPrice: Math.round(avgPrice),
      priceRange: {
        min: Math.min(...recentProducts.map(p => p.price)),
        max: Math.max(...recentProducts.map(p => p.price))
      }
    };

    res.status(200).json({
      success: true,
      data: prediction
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get demand heatmap data
// @route   GET /api/demand-heatmap
// @access  Public
export const getDemandHeatmap = async (req, res, next) => {
  try {
    // Mock demand data by location (in production, use real analytics)
    const demandData = [
      {
        location: { lat: 28.6139, lng: 77.2090, city: 'Delhi' },
        demand: {
          tomato: 'very-high',
          potato: 'high',
          onion: 'medium',
          spinach: 'high'
        },
        totalDemand: 85
      },
      {
        location: { lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
        demand: {
          tomato: 'high',
          potato: 'very-high',
          onion: 'very-high',
          spinach: 'medium'
        },
        totalDemand: 92
      },
      {
        location: { lat: 12.9716, lng: 77.5946, city: 'Bangalore' },
        demand: {
          tomato: 'medium',
          potato: 'medium',
          onion: 'high',
          spinach: 'very-high'
        },
        totalDemand: 78
      },
      {
        location: { lat: 22.5726, lng: 88.3639, city: 'Kolkata' },
        demand: {
          tomato: 'high',
          potato: 'high',
          onion: 'medium',
          spinach: 'high'
        },
        totalDemand: 82
      }
    ];

    // Get real order data to enhance predictions
    const recentOrders = await Order.find({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    }).populate('items.product');

    // Analyze real demand from orders
    const cropDemand = {};
    recentOrders.forEach(order => {
      order.items.forEach(item => {
        const cropName = item.name.toLowerCase();
        cropDemand[cropName] = (cropDemand[cropName] || 0) + item.quantity;
      });
    });

    res.status(200).json({
      success: true,
      data: {
        heatmap: demandData,
        realTimeDemand: cropDemand,
        totalOrders: recentOrders.length,
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get smart buyer matching
// @route   GET /api/matching/buyers
// @access  Private (Farmer only)
export const getBuyerMatches = async (req, res, next) => {
  try {
    const { productId, lat, lng, maxDistance = 50 } = req.query;

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Find buyers who have ordered similar products
    const similarOrders = await Order.find({
      'items.product': { $in: await Product.find({ category: product.category }).distinct('_id') },
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).populate('buyer deliveryAddress');

    // Analyze buyer patterns
    const buyerMatches = [];
    const buyerStats = {};

    similarOrders.forEach(order => {
      const buyerId = order.buyer._id.toString();
      
      if (!buyerStats[buyerId]) {
        buyerStats[buyerId] = {
          buyer: order.buyer,
          totalOrders: 0,
          totalSpent: 0,
          preferredCrops: [],
          location: order.deliveryAddress,
          lastOrderDate: order.createdAt
        };
      }

      buyerStats[buyerId].totalOrders += 1;
      buyerStats[buyerId].totalSpent += order.totalAmount;
      
      order.items.forEach(item => {
        if (!buyerStats[buyerId].preferredCrops.includes(item.name)) {
          buyerStats[buyerId].preferredCrops.push(item.name);
        }
      });
    });

    // Convert to array and calculate match score
    Object.values(buyerStats).forEach(buyer => {
      let score = 0;
      
      // Score based on order frequency
      score += Math.min(buyer.totalOrders * 10, 50);
      
      // Score based on spending
      score += Math.min(buyer.totalSpent / 100, 30);
      
      // Score based on crop preference match
      if (buyer.preferredCrops.includes(product.name)) {
        score += 20;
      }
      
      // Score based on recency
      const daysSinceLastOrder = (Date.now() - buyer.lastOrderDate) / (1000 * 60 * 60 * 24);
      if (daysSinceLastOrder < 7) score += 10;
      else if (daysSinceLastOrder < 14) score += 5;

      buyerMatches.push({
        ...buyer,
        matchScore: Math.min(score, 100),
        matchReason: getMatchReason(score, buyer, product)
      });
    });

    // Sort by match score and limit to top 10
    buyerMatches.sort((a, b) => b.matchScore - a.matchScore);
    const topMatches = buyerMatches.slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        product: product.name,
        totalMatches: buyerMatches.length,
        matches: topMatches,
        insights: {
          avgMatchScore: topMatches.reduce((sum, m) => sum + m.matchScore, 0) / topMatches.length,
          highValueBuyers: topMatches.filter(m => m.totalSpent > 1000).length,
          repeatCustomers: topMatches.filter(m => m.totalOrders > 3).length
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

function getMatchReason(score, buyer, product) {
  if (score > 80) return 'Excellent match - frequent buyer with high interest';
  if (score > 60) return 'Good match - interested in similar products';
  if (score > 40) return 'Potential match - occasional buyer';
  return 'Low match - new customer opportunity';
}
